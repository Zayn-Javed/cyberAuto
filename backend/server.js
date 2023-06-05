
const express= require("express")
require("dotenv").config()
const app = express()
const mongoose= require("mongoose")
const userRoute = require('./routes/userRoute.js');
const orderRoutes = require('./routes/orderRoute.js')
const carRoutes = require('./routes/carRoute.js')
const partRoutes = require('./routes/partRoute.js')

app.listen(process.env.PORT || 3001, () => {
    console.log(`app listenting on port ${process.env.PORT}`);
})

mongoose.connect(process.env.MONGo_URL).then(() => {
    console.log("connected");
}).catch(err => {
    console.log(err);
})

app.use(express.json())
app.get('/',(request,response)=>{
    response.send("base route")
})
app.use('/user', userRoute)
app.use('/car', carRoutes)
app.use('/car-parts', partRoutes)
app.use('/orders', orderRoutes)