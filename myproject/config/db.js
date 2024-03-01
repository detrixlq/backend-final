const mongoose = require('mongoose');
const password = encodeURIComponent("d3tr1xlq!");
const atlas = `mongodb+srv://detrix:${password}@cluster0.vmozkgg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const local = 'mongodb://localhost/backend-final';

const connectDB = async () => {
  try {
    await mongoose.connect(atlas);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
