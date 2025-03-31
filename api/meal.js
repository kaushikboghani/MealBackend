const express = require('express');
const meal = require('../model/meal'); // Adjust the path if necessary
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors({
    origin: '*', // Allow all domains or restrict to your frontend's domain
    methods: ['GET', 'POST','PUT','DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type'], // Allowed headers
}));
app.options('*', cors()); // This handles preflight requests

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Create a new meal entry
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB Connected...'))
.catch((err) => console.log('MongoDB connection error: ' + err));

app.post('/api/meal', async (req, res) => {
    try {
        const meal = new meal(req.body);
        const savedmeal = await meal.save();
        res.status(201).json(savedmeal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Read all meal entries
app.get('/api/meal', async (req, res) => {
    try {
        const meals = await meal.find();
        res.status(200).json(meals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read a single meal entry by ID
app.get('/:id', async (req, res) => {
    try {
        const meal = await meal.findById(req.params.id);
        if (!meal) return res.status(404).json({ message: 'meal not found' });
        res.status(200).json(meal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a meal entry by ID
app.put('/:id', async (req, res) => {
    try {
        const updatedmeal = await meal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedmeal) return res.status(404).json({ message: 'meal not found' });
        res.status(200).json(updatedmeal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a meal entry by ID
app.delete('/api/meal', async (req, res) => {
    try {
        await meal.deleteMany({});
        const deletedmeal = await meal.findByIdAndDelete(req.params.id);
        if (!deletedmeal) return res.status(404).json({ message: 'meal not found' });
        res.status(200).json({ message: 'meal deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', ' GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});