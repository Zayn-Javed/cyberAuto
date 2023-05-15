const jwt = require('jsonwebtoken')
require('dotenv').config()

let isAdmin=(req,res,next)=>{
    if( req.decoded.role=='admin'){
        next();
    }else{
        res.status(401).send({"message":"You are not an employeer"})
    }
}


let isUser=(req,res,next)=>{
    let token = req.headers['token'];
    jwt.verify(token, process.env.secret_key , (err, decoded) =>{
        if(!err){
            req.decoded = decoded;
            next();
        }else{
            res.status(401).send({"message":"Not authorized"})
        }
    })
}

module.exports = {
    isUser,isEmployeer,isStudent,isOfficer
}
 