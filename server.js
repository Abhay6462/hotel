const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
const PORT = process.env.PORT || 3000;  //help to run port on online in any port xyz 

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body

const person = require('./models/person');

const Menu = require('./models/Menu');

app.get('/', function (req, res) {
    res.send('welcome to my hotel')
})



//import the router files
const personRoutes = require('./routes/personRoutes');
const menuRoutes =require('./routes/menuRoutes');

//use the routers 
app.use('/person', personRoutes); // personRoutes se person ko remove krke humne ek common person app.use mein dediya
app.use ('/menu', menuRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});