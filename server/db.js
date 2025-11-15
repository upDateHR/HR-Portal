const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://ppagar602_db_user:Pranat20@hr-portaldata.bfhuunz.mongodb.net/hrportal?retryWrites=true&w=majority&appName=HR-PortalData';

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
