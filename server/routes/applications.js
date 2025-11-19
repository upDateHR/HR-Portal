const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const Application = require('../models/Application');
const authModule = require('./auth');
const authMiddleware = authModule.authMiddleware;

// Candidate applies to a job
router.post('/applications', authMiddleware, async (req, res) => {
    try {
        // only candidates may apply
        if (!req.user || req.user.role !== 'candidate') return res.status(403).json({ message: 'Forbidden' });

        const { jobId, message } = req.body;
        if (!jobId) return res.status(400).json({ message: 'Missing jobId' });

        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        const app = new Application({
            job: job._id,
            candidate: req.user._id,
            candidateName: req.user.name,
            candidateEmail: req.user.email,
            message: message || ''
        });

        await app.save();

        // simple response — front end can show confirmation
        res.json({ applicationId: app._id, success: true });
    } catch (err) {
        console.error('Failed to create application', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET applications for the currently authenticated candidate
router.get('/applications', authMiddleware, async (req, res) => {
    try {
        if (!req.user || req.user.role !== 'candidate') return res.status(403).json({ message: 'Forbidden' });

        // find applications submitted by this candidate
        const apps = await Application.find({ candidate: req.user._id })
            .sort({ createdAt: -1 })
            .populate('job', 'title companyName location type');

        const out = apps.map(a => ({
            _id: a._id,
            job: a.job ? { _id: a.job._id, title: a.job.title, companyName: a.job.companyName, location: a.job.location, type: a.job.type } : null,
            status: a.status,
            message: a.message,
            createdAt: a.createdAt,
        }));

        res.json(out);
    } catch (err) {
        console.error('Failed to fetch applications for candidate', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

// GET applicants for employer's jobs
router.get('/applicants', authMiddleware, async (req, res) => {
    try {
        if (!req.user || req.user.role !== 'employer') return res.status(403).json({ message: 'Forbidden' });

        // find jobs posted by this employer
        const jobs = await Job.find({ postedBy: req.user._id }).select('_id title');
        const jobIds = jobs.map(j => j._id);

        // find applications for those jobs, populate job title and candidate info
        const apps = await Application.find({ job: { $in: jobIds } })
            .sort({ createdAt: -1 })
            .populate('job', 'title')
            .populate('candidate', 'name email');

        // normalize response shape to array
        const out = apps.map(a => ({
            _id: a._id,
            name: a.candidateName || a.candidate?.name,
            email: a.candidateEmail || a.candidate?.email,
            phone: a.phone || null,
            status: a.status,
            createdAt: a.createdAt,
            jobId: a.job ? { _id: a.job._id, title: a.job.title } : null,
        }));

        res.json(out);
    } catch (err) {
        console.error('Failed to fetch applicants for employer', err);
        res.status(500).json({ message: 'Server error' });
    }
});
