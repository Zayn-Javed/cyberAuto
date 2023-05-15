const mongoose = require('mongoose');

const carOrderSchema = new mongoose.Schema({
  color: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  approved: {
    type: Boolean,
    default: false
  }
});

const CarOrder = mongoose.model('CarOrder', carOrderSchema);

module.exports = CarOrder;