const { MongoClient } = require('mongodb');

const uri = "your_mongodb_atlas_connection_string"; // Replace with your actual connection string
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connectDB = async () => {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');
    // You can perform initial setup or checks here
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit in case of connection failure
  }
};

module.exports = { client, connectDB };
