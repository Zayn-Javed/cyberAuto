const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
    make:{
        type:String,
        required:true,
    },
    partType:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    images:{
        type:[String]
    },
    description:{
        type:String,
        required:true,
    },

},{
    timestamps:true
})

consPart = mongoose.model('Part', partSchema);

module.exports = Part;
