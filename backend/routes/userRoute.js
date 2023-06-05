const {signup,signin, updat} = require('../controllers/userController')
const userRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const {isUser,isEmployeer,isStudent,isOfficer} = require('../authentication')



userRouter.post('/signup',signup)
userRouter.post('/signin',signin)
userRouter.put('/update', isUser ,updat)

userRouter.get('/', isUser, (req,res,next)=>{
    res.status(200).json({"message":"success"})
})

module.exports = userRouter;