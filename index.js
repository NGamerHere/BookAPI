const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(error => console.error("MongoDB connection error:", error));

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

// Define User schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

// Define User model
const User = mongoose.model('User', userSchema);

// Login endpoint
app.get('/login', async (req, res) => {
    const email = req.query.email;
    const password = req.query.password;
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            if (user.password === password) {
                res.status(200).json(user);
            } else {
                res.status(400).json({ message: 'Invalid password' });
            }
        } else {
            res.status(400).json({ message: 'Account not found' });
        }
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Signup endpoint
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = new User({ name, email, password });
        await user.save();
        console.log("User saved:", user);
        res.status(200).json({ message: 'Account created' });
    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get user by ID endpoint
app.get('/users', async (req, res) => {
    const id = req.query.id;
    try {
        const user = await User.findById(id);
        if (user) {
            res.json(user);
        } else {
            res.status(400).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error("Error in fetching user:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
