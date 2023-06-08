const jwt = require("jsonwebtoken")
const orderModel = require('../models/orderModel');
const multer = require ('multer')
const { param } = require("../routes/userRoute");

let confirmOrder = async (req,res)=>{    
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      // Find the car order by ID
      const carOrder = await orderModel.findById(id);
  
      if (!carOrder) {
        return res.status(404).json({ error: 'Car order not found' });
      }
  
      // Update the order status
      carOrder.approved = status;
  
      // Save the updated car order
      await carOrder.save();
  
      res.status(200).json({ message: 'Order status updated successfully', carOrder });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update order status' });
    }
}


let viewOrder = async (req, res) => {
  orderModel.find({ approved: undefined })
    .then((orders) => {
      console.log(orders);
      res.status(200).json(orders);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to retrieve car orders' });
    });
};
  

module.exports = {
    confirmOrder,
    viewOrder
}

