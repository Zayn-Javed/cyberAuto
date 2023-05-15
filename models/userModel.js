const mongoose = require('mongoose')
const usersSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"customer",
    },
    contact:{
        type:String,
        required:true,
    }
},
{
    timestamps:true
})

module.exports= mongoose.model("Users", usersSchema);