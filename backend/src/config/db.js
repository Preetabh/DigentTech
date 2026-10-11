const mongoose = require('mongoose');

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.warn('⚠️ MONGODB_URI is not defined in environment variables. Running without MongoDB connection.');
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`⚠️ MongoDB Connection Warning: ${error.message}`);
    if (process.env.NODE_ENV === 'production') {
      console.error('Production environment: continuing server execution to allow stateless API and Brevo email processing.');
    } else {
      console.warn('Development environment: Running with mock/optional database persistence. Brevo email service remains operational.');
    }
  }
};

module.exports = connectDB;
