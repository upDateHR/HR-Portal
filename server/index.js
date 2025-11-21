const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');

app.use('/api/auth', authRoutes);
const employerRoutes = require('./routes/employer');
app.use('/api/employer', employerRoutes);
const publicRoutes = require('./routes/public');
app.use('/api', publicRoutes);
const applicationsRoutes = require('./routes/applications');
app.use('/api', applicationsRoutes);

const PORT = process.env.PORT || 5000;

async function start() {
    try {
        const mongo = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hr-portal';
        await mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected Successfuly');
        app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
    } catch (err) {
        console.error('Failed to start server', err);
        process.exit(1);
    }
}

start();
