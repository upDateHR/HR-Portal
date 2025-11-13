const express = require('express');
const router = express.Router();

// --- MOCK DATA STUBS (Used until database connection is established) ---
const mockDashboardData = {
    metrics: [
        // These keys match the MetricCard structure
        { title: 'Active Jobs', value: 12, change: '+2 this week', changeColor: 'text-green-500', icon: 'Briefcase', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
        { title: 'Total Applicants', value: 248, change: '+45 this week', icon: 'UserRoundSearch', iconBg: 'bg-teal-100', iconColor: 'text-teal-600' }
    ],
    postings: [
        // Sending a partial job list for the Dashboard view
        { id: 'd1', title: 'Senior Frontend Developer', company: 'Acme Corp', applicants: 45, newCount: 12, response: '24 Hours' },
        { id: 'd2', title: 'Product Manager', company: 'Innovate Solutions', applicants: 40, newCount: 8, response: '3 Days' },
    ],
    applicants: [
        // Sending a partial applicant list for the Dashboard view
        { name: 'Rahul Sharma', match: '95%', role: 'Senior Frontend Developer', exp: '5 years experience', time: '2 hours ago', initials: 'RS', skills: ['React', 'TS'] },
    ]
};

const mockSettingsData = {
    profile: { name: 'Jane Doe', email: 'jane.d@acme.com', phone: '+91 9876543210', role: 'HR Manager' },
    company: { companyName: 'Acme Corporation Ltd.', website: 'https://www.acmecorp.com', companyDescription: 'Acme Corp is a leader in advanced manufacturing, committed to innovation and sustainability.' }
};

// --- ROUTE DEFINITIONS ---

// 1. DASHBOARD SUMMARY ENDPOINT (Used by DashboardView.jsx)
// GET /api/dashboard/summary
router.get('/dashboard/summary', (req, res) => {
    console.log('[API] Dashboard metrics requested.');
    // In production, this data is pulled from the database.
    res.status(200).json(mockDashboardData);
});

// 2. INITIAL SETTINGS/PROFILE VIEW ENDPOINT (Used by SettingsView.jsx and ProfileDetailsView.jsx)
// GET /api/employer/settings/initial
router.get('/employer/settings/initial', (req, res) => {
    console.log('[API] Initial settings data requested.');
    res.status(200).json(mockSettingsData);
});

// 3. JOB LIST ENDPOINT (Used by MyJobsTable.jsx)
// GET /api/employer/jobs
router.get('/employer/jobs', (req, res) => {
    console.log('[API] Job list requested by MyJobsTable.');
    // Sending full mock data structure (Empty array is correct until database is linked)
    res.status(200).json([]); 
});

// 4. APPLICANTS LIST ENDPOINT (Used by ApplicantsView.jsx)
// GET /api/employer/applicants
router.get('/employer/applicants', (req, res) => {
    console.log('[API] Applicants list requested.');
    res.status(200).json([]); 
});

// 5. ANALYTICS REPORTS ENDPOINT (Used by AnalyticsView.jsx)
// GET /api/analytics/reports
router.get('/analytics/reports', (req, res) => {
    console.log('[API] Analytics reports requested.');
    // Sending a minimal structure for the charts/KPIs to load safely
    res.status(200).json({
        kpis: [
            { title: 'Conversion Rate', value: '15.2%', change: '+2% vs Avg', changeColor: 'text-green-600', icon: 'Target', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
            { title: 'Avg Time-to-Hire', value: '35 Days', change: '-5 Days', icon: 'Hourglass', iconBg: 'bg-orange-100', iconColor: 'text-orange-600' },
        ],
        viewsData: [100, 150, 120, 200, 180, 250, 220],
        funnelData: [
            { stage: 'Applied', count: 100 },
            { stage: 'Screening', count: 75 },
            { stage: 'Interview', count: 50 },
            { stage: 'Offer', count: 10 }
        ],
        jobComparison: []
    }); 
});


module.exports = router;