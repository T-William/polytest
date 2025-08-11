const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true
  },
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  deliveryMethod: {
    type: String,
    required: true,
    enum: ['pickup', 'dropoff']
  },
  deliveryFee: {
    type: Number,
    required: true
  },
  estimatedDeliveryTime: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'confirmed', 'in_transit', 'delivered', 'cancelled'],
    default: 'pending'
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Delivery', deliverySchema);
