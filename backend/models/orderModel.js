const mongoose = require('mongoose');

const carOrderSchema = new mongoose.Schema({
  color: {
    type: String,
    required: true
  },
  dateOrdered: {
    type: Date,
    default: Date.now
  }, 
  price: {
    type: Number,
    required: true
  },
  approved: {
    type: Boolean,
    default: undefined
  }
});

const CarOrder = mongoose.model('CarOrder', carOrderSchema);
module.exports = CarOrder;