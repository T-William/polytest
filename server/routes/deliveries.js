const express = require('express');
const router = express.Router();
const Delivery = require('../models/Delivery');
const DeliveryService = require('../services/DeliveryService');

// Get delivery options and fees
router.post('/calculate', async (req, res) => {
  try {
    const { origin, destination } = req.body;
    
    // Calculate delivery fee
    const deliveryInfo = await DeliveryService.calculateDeliveryFee(origin, destination);

    // Generate pickup and dropoff options
    const deliveryOptions = {
      pickup: {
        method: 'pickup',
        fee: 0,
        estimatedTime: '1-2 business days',
        description: 'Customer picks up from our warehouse'
      },
      dropoff: {
        method: 'dropoff',
        fee: deliveryInfo.deliveryFee,
        distance: deliveryInfo.distance,
        estimatedTime: deliveryInfo.estimatedTime,
        description: 'Delivery to your address'
      }
    };

    res.json({
      options: deliveryOptions,
      origin,
      destination
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new delivery
router.post('/', async (req, res) => {
  try {
    const delivery = new Delivery({
      orderId: req.body.orderId,
      deliveryAddress: {
        ...req.body.deliveryAddress,
        coordinates: await DeliveryService.validateDeliveryAddress(
          `${req.body.deliveryAddress.street}, ${req.body.deliveryAddress.city}, ${req.body.deliveryAddress.state} ${req.body.deliveryAddress.postalCode}`
        )
      },
      deliveryMethod: req.body.deliveryMethod,
      deliveryFee: req.body.deliveryFee,
      estimatedDeliveryTime: req.body.estimatedDeliveryTime
    });

    const newDelivery = await delivery.save();
    res.status(201).json(newDelivery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update delivery status
router.patch('/:id/status', async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) {
      return res.status(404).json({ message: 'Delivery not found' });
    }

    delivery.status = req.body.status;
    const updatedDelivery = await delivery.save();
    res.json(updatedDelivery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
