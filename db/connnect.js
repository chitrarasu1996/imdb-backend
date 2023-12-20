const mongoose = require('mongoose');
const mongoUrl=process.env.MONGO_URL



const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    throw error;
  }
};

module.exports = connectToDatabase

