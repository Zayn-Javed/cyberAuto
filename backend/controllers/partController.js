const jwt = require("jsonwebtoken")
const carPartsModel = require('../models/carPartsModel');
const multer = require ('multer')
const { param } = require("../routes/userRoute");
const cloudinary= require('../cloudnary')
const { CloudinaryStorage } = require('multer-storage-cloudinary');


// Configure multer storage for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'car-parts', // Specify the folder where images will be stored in Cloudinary
      allowed_formats: ['jpg', 'jpeg', 'png']
    }
  });

  // Create multer instance with the Cloudinary storage
const upload = multer({ storage: storage });


let addPart = (req,res)=>{
    let {make, partType, price, description} = req.body
    const image = req.file.filename;
    let part=new carPartsModel({
        make,
        price,
        partType,
        description,
        images: [image],
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


let viewPart = async (req,res)=>{
    try {
        const parts = await carPartsModel.find();
    
        const partsWithImages = await Promise.all(parts.map(async (part) => {
          const images = await Promise.all(part.images.map(async (image) => {
            const imageURL = await cloudinary.url(image);
            return imageURL;
          }));
    
          return {
            ...part._doc,
            images: images
          };
        }));
        res.status(200).json({
          message: 'Success',
          parts: partsWithImages
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          message: 'Server Error'
        });
      }



}



let deletePart = async (req,res)=>{
    try {
        await carPartsModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Part deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete the part' });
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
      const { make, partType, description, price } = req.body;
  
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

