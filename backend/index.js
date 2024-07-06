require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors");
const PORT = process.env.PORT;

const userRoute = require('./routes/user');

const app = express();


// building connection to DB
mongoose.connect(process.env.MONOGO_URL)
.then(() => console.log("connected to mongoDB"))
.catch(err => console.log(err))

//middleware.....

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


//routes...
app.use("/api" ,userRoute);



app.listen(PORT , ()=>{
    console.log(`server started at port no ${PORT}`);
})


