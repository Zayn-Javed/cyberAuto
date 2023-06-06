const jwt = require("jsonwebtoken")
const carModel = require('../models/carModel');
const multer = require ('multer')
const { param } = require("../routes/userRoute");
const cloudinary= require('../cloudnary')
const { CloudinaryStorage } = require('multer-storage-cloudinary');




// Configure multer storage for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'cars', // Specify the folder where images will be stored in Cloudinary
      allowed_formats: ['jpg', 'jpeg', 'png']
    }
});

  // Create multer instance with the Cloudinary storage
const upload = multer({ storage: storage });


let addCar = (req,res)=>{
    let {make, model, year, price, carType, engine, engineType, fuelAvg, description} = req.body
    const image = req.file.filename;
    let car=new carModel({
        make, 
        model, 
        year, 
        price,
        carType, 
        engine, 
        engineType, 
        fuelAvg,
        images: [image],
        description,
    })
    car.save().then( (car)=>{
        if(!car){
            res.status(400).json( { "message":"car cannot be added"})
        }else{
            console.log(car);
            res.status(200).json({"message":"success", "car": car})
        }
    }).catch(err=>{
        console.log(err)
        res.status(400).json( { "message":"car cannot be added"})
    })
}




let viewCar = async (req,res)=>{
    try {
        const cars = await carModel.find();
        const carsWithImages = await Promise.all(cars.map(async (car) => {
          const images = await Promise.all(car.images.map(async (image) => {
            const imageURL = await cloudinary.url(image);
            return imageURL;
          }));
          return {
            ...car._doc,
            images: images
          };
        }));
        console.log(carsWithImages);
        res.status(200).json({
          message: 'Success',
          cars: carsWithImages
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          message: 'Server Error'
        });
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

