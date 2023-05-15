const mongoose = require('mongoose');
const Part = require('./carPartsModel')
const Schema = mongoose.Schema;

const carSchema = new mongoose.Schema({
    make:{
        type:String,
        required:true,
    },
    model:{
        type:String,
        required:true,
    },
    year:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    carType:{
        type:String,
        required:true,
    },
    engine:{
        type:String,
        required:true,
    },
    engineType:{
        type:String,
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

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
