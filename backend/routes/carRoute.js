
const {addCar, viewCar, upload, deleteCar,findCar} = require('../controllers/carController')
const jwt = require('jsonwebtoken');
const decode = require("jsonwebtoken/decode");
const carRouter = require("express").Router();
const {isUser,isAdmin} = require('../authentication')

carRouter.post("/create",isUser, isAdmin, upload.single("image"), addCar)
carRouter.delete("/delete-car/:id",isUser, isAdmin, deleteCar)
carRouter.get("/view-cars",isUser, viewCar)
carRouter.get("/find-car/:id",isUser, findCar)
 

module.exports = carRouter