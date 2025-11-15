const mongoose = require('mongoose');

const MONGO_URI = 'put_your_mongo_url';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully!');
    } catch (error) {
        console.error('MongoDB connection FAILED:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
