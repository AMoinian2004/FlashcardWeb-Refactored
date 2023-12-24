const mongoose = require('mongoose');

const flashcardConfigSchema = new mongoose.Schema({
    username: String,
    configName: String,
    flashcards: Array,
    connections: Array,
  });

module.exports = mongoose.model('FlashcardConfig', flashcardConfigSchema);