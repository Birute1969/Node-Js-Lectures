const cors = require('cors');
const { default: mongoose } = require('mongoose');
const { BroadcastChannel } = require('worker_threads');

//const carModel = require('./models/car');iškėlėme į router.js
//const userModel = require('./models/user'); iškėlėme į router.js

const express = require('express');
const app = express();
const router = require('./router');

app.use(cors());
app.use(express.json());
app.use(router);

const mongoDB = 'mongodb+srv://Birute:Bartaseviciute1969@cluster0.3qen2p5.mongodb.net/cars-portal?retryWrites=true&w=majority'
mongoose.connect(mongoDB);

const db = mongoose.connection;

db.on('error', (error)=> console.error(error));
db.once('open', () => console.log('Connected to MongoDB!'));

const PORT = 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));