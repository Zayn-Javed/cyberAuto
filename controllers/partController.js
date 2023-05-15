const jwt = require("jsonwebtoken")
const carPartsModel = require('../models/carPartsModel');
const multer = require ('multer')
const { param } = require("../routes/userRoute");

let addPart = (req,res)=>{

    let {make, partType, price, description} = req.body
    let part=new carPartsModel({
        make, 
        partType,  
        price,
        Images: req.files.map(file => file.path),
        description,
    })
    part.save().then( (part)=>{
        if(!part){
            res.status(400).json( { "message":"Part cannot be added"})
        }else{
            res.status(200).json({"message":"success", "part": part})
        }
    }).catch(err=>{
        console.log(err)
        res.status(400).json( { "message":"Part cannot be added"})
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


let viewPart = async (req,res)=>{
    try {
        const parts = await carPartsModel.find();
        res.json(parts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve parts' });
    }
}



let deletePart = async (req,res)=>{
    try {
        await carPartsModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'part deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete the car' });
    }
}



let findPart = async (req,res)=>{
    try {
        const { id } = req.params;
        // Find the part by ID
        const part = await carPartsModel.findById(id);
        if (!part) {
          return res.status(404).json({ error: 'Part not found' });
        }
        res.status(200).json(part);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search for part' });
    }
}



let searchPart = async (req,res)=>{
    try {
      const { make, partType, description, price } = req.query;
  
      // Construct a search query based on the provided parameters
      const searchQuery = {};
      if (make) {
        searchQuery.make = { $regex: make, $options: 'i' };
      }
      if (partType) {
        searchQuery.partType = { $regex: partType, $options: 'i' };
      }
      if (description) {
        searchQuery.$text = { $search: description };
      }
      if (price) {
        searchQuery.price = { $gte: parseFloat(price) };
      }
      // Perform the search using the constructed query
      const parts = await carPartsModel.find(searchQuery);
      res.status(200).json(parts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to search for parts' });
    }
}
  


module.exports = {
    addPart,
    searchPart,
    viewPart,
    upload,
    deletePart,
    findPart
}

