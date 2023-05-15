const mongoose = require('mongoose');

const carOrderSchema = new mongoose.Schema({
  approved: {
    type: Boolean,
    default: false
  }
});

const CarOrder = mongoose.model('CarOrder', carOrderSchema);

module.exports = CarOrder;