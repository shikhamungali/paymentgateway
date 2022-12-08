// const config =  require('./config.js');

const route = require("./routes/route")
const mongoose = require("mongoose")
const dotenv = require('dotenv');
const express =  require('express');
const app =  express();
const path = require('path'); 
const stripe = require("./paymentGateway/stripe")
app.use(express.json())

//connection to database
mongoose.connect("mongodb://127.0.0.1/userdata",{
     useNewUrlParser: true 
    })
    .then(()=>console.log("MONGO-DB is connected on port 27017"))
    .catch((error)=>console.log(error))




dotenv.config({
    path: path.resolve(`${process.env.NODE_ENV}.env`)
});

  let  NODE_ENV = process.env.NODE_ENV || 'development'
  let  HOST = process.env.HOST || 'localhost'
  let  PORT = process.env.PORT || 3000

console.log(`NODE_ENV=${NODE_ENV}`);

// app.get('/', (req, res) => {
//     res.send('Hello World !!');
// });


app.use("/",route)
app.use("/api/stripe", stripe);

app.listen(PORT, HOST, () => {
    console.log(`APP LISTENING ON http://${HOST}:${PORT}`);
})