const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create payment intent
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card'],
      metadata: {
        orderId: req.body.orderId
      }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Webhook endpoint for payment status updates
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        const orderId = paymentIntent.metadata.orderId;
        
        // 1. Update order status in database
        const order = await Order.findByIdAndUpdate(
          orderId,
          { status: 'paid', paymentStatus: 'succeeded' },
          { new: true }
        ).populate('user');

        if (!order) {
          throw new Error(`Order ${orderId} not found`);
        }

        // 2. Generate receipt
        const receiptPath = await ReceiptService.generateReceipt({
          orderId: order._id,
          items: order.items,
          deliveryMethod: order.deliveryMethod,
          deliveryFee: order.deliveryFee,
          subtotal: order.subtotal,
          total: order.total,
          customer: {
            name: order.user.name,
            email: order.user.email,
            address: order.shippingAddress
          }
        });

        // 3. Send email with receipt
        await EmailService.sendReceiptEmail(
          order.user.email,
          order._id,
          receiptPath
        );

        console.log(`Payment for order ${orderId} succeeded`);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        const orderId = paymentIntent.metadata.orderId;
        
        // Update order status to payment failed
        await Order.findByIdAndUpdate(
          orderId,
          { 
            status: 'payment_failed',
            paymentStatus: 'failed',
            paymentError: paymentIntent.last_payment_error?.message || 'Payment failed'
          }
        );
        
        console.warn(`Payment failed for order ${orderId}`);
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object;
        const orderId = charge.metadata.orderId;
        
        // Update order status to refunded
        await Order.findByIdAndUpdate(
          orderId,
          { 
            status: 'refunded',
            paymentStatus: 'refunded',
            refundedAt: new Date()
          }
        );
        
        console.log(`Order ${orderId} was refunded`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
