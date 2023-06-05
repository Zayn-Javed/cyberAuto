const { request, response } = require("express");
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

let signup=(request,response)=>{
    let {name, username, email, password, role, contact} = request.body;
    let user=new userModel({
        name,
        email,
        username,
        password,
        role,
        contact
    });
    user.save().then((user)=>{
        response.status(200).json({"message":"user successfully created", user:user})
    }).catch(err=>{
        response.status(400).json({err:err, "message":"user cannot be created"})
    })
}

let signin = (req,res)=>{
    let {email,password} = req.body;
    userModel.findOne({ email:email}).then(user=>{
        if(!user){
            res.status(404).send({"Message":"User not exists"})
        }else{
            if(password==user.password){
                let token = jwt.sign({
                    id:user._id,
                    role: user.role,
                },process.env.secret_key , {
                    expiresIn:'24h'
                })
                res.status(200).send({"user":user, "token":token,  "success": true})
            }else{
                res.status(404).send({"Message":"Invalid Passowrd"})
            }        
        }
    }).catch((err)=>{
        res.status(500).send({"error: ":err})
    })
}

let updat =  (req, res)=>{
    const updatedUser =  userModel.findByIdAndUpdate(req.decoded.id, req.body, { new: true }).then((obj)=>{
        res.json(updatedUser)
    }).catch((err)=>{
        res.status(500).json({ message: err.message })
    });
}

module.exports = {
    signup,signin, updat
}