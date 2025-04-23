const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const publicRoute = require("./routes/public")
const userRoute = require("./routes/user")
const {connectToMongoDB} = require("./connect")

// setup express
const app = express()
const PORT = 8000

// set view engine
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

// connection with mongodb
connectToMongoDB('mongodb://127.0.0.1:27017/blogify')
.then(()=>console.log('MongoDB is connected'))
.catch(()=>console.log('Something error is coming in connectivity'))

// defined middlewares
app.use(express.urlencoded({extended:false}))

// Home page define here
app.get('/',(req,res)=>{
    return res.render("home")
})

// including route
app.use("/", publicRoute)
app.use("/user", userRoute)

app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`))