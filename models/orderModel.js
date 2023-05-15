const mongoose = require('mongoose');

const carOrderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true
  },
  color: {
    type: String,
    required: true
  },
  options: [{
    type: String
  }],
  customOptions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CustomOption'
  }],
  dateOrdered: {
    type: Date,
    default: Date.now
  },
  price: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending'
  },
  paymentDetails: {
    type: {
      method: {
        type: String,
        enum: ['credit card', 'debit card', 'paypal', 'other'],
        required: true
      },
      transactionId: {
        type: String,
        required: true
      },
      amount: {
        type: Number,
        required: true
      }
    },
    required: function() {
      return this.paymentStatus === 'paid';
    }
  },
  approved: {
    type: Boolean,
    default: false
  }
});

const CarOrder = mongoose.model('CarOrder', carOrderSchema);

module.exports = CarOrder;