const express = require('express')
const app = express();
const db = require('./db');

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


app.listen(3000, () => {
    console.log('listening on port 3000');
})