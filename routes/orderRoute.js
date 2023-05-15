const {confirmOrder, viewOrder} = require('../controllers/orderController')
const jwt = require('jsonwebtoken');
const decode = require("jsonwebtoken/decode");
const orderRouter = require("express").Router();
const {isUser,isAdmin} = require('../authentication')

orderRouter.put("/confirm-order:id",isUser, isAdmin ,confirmOrder)
orderRouter.get("/view-order",isUser, isAdmin ,viewOrder)


module.exports = orderRouter