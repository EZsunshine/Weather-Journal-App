// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Dependecies */
const bodyParser = require('body-parser');


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 2000;
// Setup Server
const server = app.listen(port, listening);
// Callback to debug
function listening() {
    console.log('server running');
    console.log(`running on localhost: ${port}`);
};

// GET Route
app.get('/all', sendData)
// Callback function to complete GET '/all'
function sendData(req, res) {
    res.send(projectData)
}

// POST Route
// Callback function to complete POST '/add'
const data = [];
app.post('/add', addInfo);

function addInfo(req, res) {
    projectData['date'] = req.body.date;
    projectData['temp'] = req.body.temp;
    projectData['content'] = req.body.content;
    res.send(projectData);
    console.log(projectData)
  }


