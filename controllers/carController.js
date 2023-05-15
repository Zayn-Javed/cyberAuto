const jwt = require("jsonwebtoken")
const carModel = require('../models/carModel');
const multer = require ('multer')
const { param } = require("../routes/userRoute");


let addCar = (req,res)=>{

    let {make, model, year, price, carType, engine, engineType, fuelAvg, description} = req.body
    let car=new carModel({
        make, 
        model, 
        year, 
        price,
        carType, 
        engine, 
        engineType, 
        fuelAvg,
        Images: req.files.map(file => file.path),
        description,
    })
    car.save().then( (car)=>{
        if(!car){
            res.status(400).json( { "message":"car cannot be added"})
        }else{
            res.status(200).json({"message":"success", "car": car})
        }
    }).catch(err=>{
        console.log(err)
        res.status(400).json( { "message":"car cannot be added"})
    })
}



const storage = multer.diskStorage({
    destination:(req , file , cb)=>{
        cb(null , 'uploads')
    },
    filename:(req , file , cb)=>{
        cb(null ,Date.now()+file.originalname)
    }
})


const filter = (req , file , cb)=>{
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null , true)
    }else{
        cb(new Error("UnSupported file") , false)
    }
}


const upload = multer({
   storage:storage,
   fileFilter:filter,
    limits:1024*1024*10
})


let viewCar = async (req,res)=>{
    try {
        const cars = await carModel.find();
        res.json(cars);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve cars' });
    }
}



let deleteCar = async (req,res)=>{
    try {
        await carModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete the car' });
    }
}



let findCar = async (req,res)=>{
    try {
        const { id } = req.params;
        // Find the part by ID
        const part = await carModel.findById(id);
        if (!part) {
          return res.status(404).json({ error: 'Car not found' });
        }
        res.status(200).json(part);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search for car' });
    }
}





module.exports = {
    addCar,
    viewCar,
    upload,
    deleteCar,
    findCar
}

