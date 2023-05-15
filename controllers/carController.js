const jwt = require("jsonwebtoken")
const carModel = require('../models/carModel');


let addCar = (req,res)=>{

    let {make, model, year, price, carType, engine, engineType, description} = req.body
    let car=new carModel({
        make, 
        model, 
        year, 
        price,
        carType, 
        engine, 
        engineType, 
        Image: req.files.map(file => file.path),
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
    if(file.mimetype == 'application/pdf'){
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
        await Car.findByIdAndDelete(req.params.id);
        res.json({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete the car' });
    }
}



let searchCar = async (req,res)=>{
    try {
      const { make, year, model, description, price } = req.query;
  
      // Construct a search query based on the provided parameters
      const searchQuery = {};
      if (make) {
        searchQuery.make = { $regex: make, $options: 'i' };
      }
      if (year) {
        searchQuery.year = { $regex: year, $options: 'i' };
      }
      if (model) {
        searchQuery.model = { $regex: model, $options: 'i' };
      }
      if (description) {
        searchQuery.$text = { $search: description };
      }
      if (price) {
        searchQuery.price = { $gte: parseFloat(price) };
      }
      // Perform the search using the constructed query
      const cars = await carModel.find(searchQuery);
      res.status(200).json(cars);
    } catch (error) {
      res.status(500).json({ error: 'Failed to search for cars' });
    }
}
  


module.exports = {
    addCar,
    searchCar,
    viewCar,
    upload,
    deleteCar
}

