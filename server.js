const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const { connectDB } = require('./db');
const User = require('./models/userModel');

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

const FlashcardConfig = require('./models/flashcardModel');

// Save flashcard configuration
app.post('/saveFlashcards', async (req, res) => {
    const { username, configName, flashcards, connections } = req.body;
    try {
      let config = await FlashcardConfig.findOne({ username, configName });
      if (config) {
        config.flashcards = flashcards;
        config.connections = connections;
      } else {
        config = new FlashcardConfig({ username, configName, flashcards, connections });
      }
      await config.save();
      res.status(200).send(`Configuration "${configName}" saved`);
    } catch (error) {
      res.status(500).send('Error saving configuration');
    }
  });
  

// Get flashcard configuration
app.get('/getFlashcards/:username', async (req, res) => {
    try {
      const configs = await FlashcardConfig.find({ username: req.params.username });
      if (configs) {
        res.json(configs);
      } else {
        res.status(404).send('Configurations not found');
      }
    } catch (error) {
      res.status(500).send('Error retrieving configurations');
    }
  });
  
