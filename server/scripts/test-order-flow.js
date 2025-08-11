require('dotenv').config();
const mongoose = require('mongoose');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

// Test data
const TEST_EMAIL = 'test@example.com';
const TEST_PRODUCT = {
  name: 'Premium Organic Compost',
  description: 'High-quality organic compost for your garden',
  price: 29.99,
  category: 'Organic',
  stock: 100
};

async function setupTestData() {
  // Connect to MongoDB
  await mongoose.connect(process.env.MONGODB_URI);
  
  // Create test user if not exists
  let user = await User.findOne({ email: TEST_EMAIL });
  if (!user) {
    user = new User({
      name: 'Test User',
      email: TEST_EMAIL,
      password: 'test1234', // In a real app, hash this password
      role: 'customer'
    });
    await user.save();
  }

  // Create test product if not exists
  let product = await Product.findOne({ name: TEST_PRODUCT.name });
  if (!product) {
    product = new Product(TEST_PRODUCT);
    await product.save();
  }

  return { user, product };
}

async function testOrderFlow() {
  try {
    console.log('🚀 Starting order flow test...');
    
    // 1. Setup test data
    console.log('🔧 Setting up test data...');
    const { user, product } = await setupTestData();
    
    // 2. Create a test order
    console.log('🛒 Creating test order...');
    const order = new Order({
      user: user._id,
      items: [{
        product: product._id,
        name: product.name,
        quantity: 2,
        price: product.price
      }],
      subtotal: product.price * 2,
      tax: 0,
      deliveryFee: 10,
      total: (product.price * 2) + 10,
      deliveryMethod: 'delivery',
      shippingAddress: {
        street: '123 Test St',
        city: 'Cape Town',
        state: 'Western Cape',
        postalCode: '8001',
        country: 'South Africa'
      },
      status: 'pending',
      paymentStatus: 'pending'
    });
    
    await order.save();
    console.log(`✅ Order created: ${order._id}`);

    // 3. Create payment intent
    console.log('💳 Creating payment intent...');
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.total * 100), // in cents
      currency: 'zar',
      metadata: { orderId: order._id.toString() },
      description: `Order #${order._id}`,
      shipping: {
        name: user.name,
        address: {
          line1: order.shippingAddress.street,
          city: order.shippingAddress.city,
          state: order.shippingAddress.state,
          postal_code: order.shippingAddress.postalCode,
          country: 'ZA'
        }
      }
    });

    order.paymentIntentId = paymentIntent.id;
    await order.save();
    
    console.log('✅ Payment intent created');
    console.log('🔗 Test payment URL:', `https://dashboard.stripe.com/test/payments/${paymentIntent.id}`);
    
    // 4. Simulate successful payment (in a real scenario, this would come from Stripe webhook)
    console.log('🔄 Simulating successful payment...');
    await stripe.paymentIntents.confirm(paymentIntent.id, { payment_method: 'pm_card_visa' });
    
    // 5. Verify order was updated
    const updatedOrder = await Order.findById(order._id);
    console.log('📦 Order status after payment:', updatedOrder.status);
    console.log('💳 Payment status:', updatedOrder.paymentStatus);
    
    if (updatedOrder.paymentStatus === 'succeeded') {
      console.log('🎉 Test completed successfully!');
    } else {
      console.warn('⚠️  Test completed with potential issues. Check the order status.');
    }
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

testOrderFlow();
