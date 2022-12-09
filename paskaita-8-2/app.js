const cors = require('cors');
const { default: mongoose } = require('mongoose');
const { BroadcastChannel } = require('worker_threads');

const carModel = require('./models/car');
const userModel = require('./models/user');

const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());

const mongoDB = 'mongodb+srv://Birute:Bartaseviciute1969@cluster0.3qen2p5.mongodb.net/cars-portal?retryWrites=true&w=majority'
mongoose.connect(mongoDB);

const db = mongoose.connection;

db.on('error', (error)=> console.error(error));
db.once('open', () => console.log('Connected to MongoDB!'));

const PORT = 3000;

app.get('/cars', async(req, res) => {
    const cars = await carModel.find().sort({year: 1});
    console.log(cars);
    res.send(cars);
});

//norint filtruoti pagal "brand", rašome dinaminį route:
app.get('/cars/:brand', async(req, res) => {
    const brand = req.params.brand;
    console.log(brand);
    const cars = await carModel.find(
        { brand: { 
            $regex: new RegExp(brand, 'i')
        }
    });
    console.log(cars);
    res.send(cars);
});

app.post('/cars', async (req, res) => {
    const {brand, model, year, price} = req.body;
    await carModel.create({brand, model, year, price})
    const cars = await carModel.find()
    console.log(cars);
    res.send(cars);
})

app.get('/users', async(req, res) => {
    const { sort} = req.query;
    
    let users = await userModel.find();
    if (sort === 'asc') {
        users = await userModel.find(). sort({ surname: 1});
    } else if (sort === 'desc') {
        users = await userModel.find(). sort({ surname: -1});
    }
    console.log(users);
    res.send(users);
});

app.get('/users/:name', async(req, res) => {
    const name = req.params.name;
    console.log(name);
    const users = await userModel.find(
        { name: { 
            $regex: new RegExp(name, 'i')
        }
    });
    console.log(users);
    res.send(users);
});

app.post('/users', async (req, res) => {
    const { name, surname, role} = req.body;
    await userModel.create({name, surname, role})
    const users = await userModel.find()
    console.log(users);
    res.send(users);
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));