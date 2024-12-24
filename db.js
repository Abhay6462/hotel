const mongoose = require('mongoose');
require('dotenv').config();
// define the mongodb connection url
// const mongodbURL="mongodb://localhost:27017/hotel"
 const mongodbURL =process.env.MONOGODB_URL_LOCAL;

// const mongodbURL="mongodb+srv://abhaychoubey91:c8pTttk66yxIz9EH@cluster0.0dzox.mongodb.net/"
// const mongodbURL = process.env.MONOGODB_URL;


// set up mongodb mongoose.connection
mongoose.connect(mongodbURL, { useNewUrlParser: true, useUnifiedTopology: true })

// get the default connection
// mongoose maintains a deafult connection object represting the mongodb connection.
const db = mongoose.connection;

// define event listeners for database connection

db.on('connected',()=>{
    console.log('Mongodb connected');
});
db.on('error',(err)=>{
    console.log('Mongodb connection error:',err);
});
db.on('disconnected',()=>{
    console.log('Mongodb disconnected');
})
// export the database connection
module.exports=db;