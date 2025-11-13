const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// --- Import Route Handlers and Middleware ---
const employerRoutes = require('./routes/employerRoutes');
const { protect } = require('./middleware/auth'); // <-- NEW IMPORT
const PORT = 3001; 
const app = express();

// --- Middleware Setup ---
app.use(cors()); 
app.use(bodyParser.json()); 

// --- 1. ROUTE MAPPING (GET Requests) ---
// All GET requests starting with /api/ are currently public (unprotected)
app.use('/api', employerRoutes);


// --- 2. DATA SUBMISSION ENDPOINTS (Protected POST/PUT Routes) ---
// We add 'protect' middleware to ensure a user is logged in before allowing submission.

// POST /api/employer/jobs/create (PROTECTED ROUTE)
// This endpoint supports PostJobForm.jsx
app.post('/api/employer/jobs/create', protect, (req, res) => { // <-- PROTECTED
    const jobData = req.body;
    console.log('PROTECTED POST received for NEW Job Posting:', jobData.title || 'Untitled Job');
    
    // In production, jobData would be VALIDATED and saved to the database.
    res.status(201).send({ 
        message: 'Job posted successfully!', 
        jobId: Date.now(),
        received: jobData 
    });
});

// POST /api/employer/settings/profile (PROTECTED ROUTE)
// This handles saving changes from the Settings form.
app.post('/api/employer/settings/profile', protect, (req, res) => { // <-- PROTECTED
    const profileData = req.body;
    console.log('PROTECTED POST request received for Profile Update for:', profileData.name);
    // In production, this data would be saved to the database.
    res.status(200).send({ message: 'Profile updated successfully.', received: profileData });
});


// --- Final Error Handling Middleware ---
// This ensures the server sends a clean error response if anything crashes.
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
        status: 'error',
        message: 'Internal Server Error. Please try again.',
        details: err.message
    });
});


// --- Start the Server ---
app.listen(PORT, () => {
    console.log(`Express Server running on port ${PORT}`);
    console.log('Server initialized with protected API routes.');
});