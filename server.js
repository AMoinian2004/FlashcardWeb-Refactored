const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const { connectDB } = require('./db');
const User = require('./userModel');

const app = express();
app.use(express.json());

connectDB(); // Connect to MongoDB Atlas

// Signup route
app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }
    const user = new User({ username, password });
    await user.save();
    res.status(201).send('User created');
  } catch (error) {
    res.status(500).send('Error creating user');
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).send('Invalid credentials');
    }
    res.send('Login successful');
  } catch (error) {
    res.status(500).send('Error during login');
  }
});

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
