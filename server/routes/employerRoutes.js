const express = require('express');
const router = express.Router();
const { protect } = require("../middleware/auth");

// ---------------- MOCK DATA (SAFE FOR UI) ----------------
const mockDashboardData = {
    metrics: [
        {
            title: 'Active Jobs',
            value: 12,
            change: '+2 this week',
            changeColor: 'text-green-500',
            icon: 'Briefcase',
            iconBg: 'bg-purple-100',
            iconColor: 'text-purple-600'
        },
        {
            title: 'Total Applicants',
            value: 248,
            change: '+45 this week',
            icon: 'UserRoundSearch',
            iconBg: 'bg-teal-100',
            iconColor: 'text-teal-600'
        }
    ],
    postings: [],
    applicants: []
};

const mockSettingsData = {
    profile: {
        name: 'Jane Doe',
        email: 'jane@demo.com',
        phone: '9876543210',
        role: 'HR Manager'
    },
    company: {
        companyName: 'Acme Corp',
        website: 'https://acme.com',
        companyDescription: 'We build awesome products.'
    }
};

// --------------------- UI-ONLY ROUTES ---------------------

// Dashboard Summary (UI mock only)
router.get('/dashboard/summary', (req, res) => {
    res.status(200).json(mockDashboardData);
});


// --------------------- REMOVE THESE FROM HERE ---------------------
// ❌ NO job list
// ❌ NO job create
// ❌ NO applicants
// These are handled in:
//   ✔ jobRoutes.js
//   ✔ applicantRoutes.js
// -----------------------------------------------------------------

module.exports = router;
