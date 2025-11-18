const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const Job = require("../models/Job");

// ===============================
// DASHBOARD SUMMARY
// ===============================
router.get("/summary", protect, async (req, res) => {
  try {
    // Fetch all jobs created by this recruiter
    const jobs = await Job.find({ recruiter: req.user._id }).sort({
      createdAt: -1,
    });

    // ------------------------------
    // METRICS (DASHBOARD CARDS)
    // ------------------------------
    const metrics = [
      {
        title: "Total Jobs",
        value: jobs.length,
        icon: "Briefcase",
      },
      {
        title: "Active Jobs",
        value: jobs.filter((j) => j.status === "Active").length,
        icon: "CheckCircle",
      },
      {
        title: "Applicants",
        value: 0, // You don't have applicants model yet
        icon: "Users",
      },
      {
        title: "Profile Views",
        value: 0,
        icon: "Eye",
      },
    ];

    // ------------------------------
    // RECENT JOB POSTS (TOP 5)
    // ------------------------------
    const postings = jobs.slice(0, 5).map((job) => ({
      _id: job._id,
      title: job.title,
      companyName: job.companyName,
      location: job.location,
      minSalary: job.minSalary || 0,
      maxSalary: job.maxSalary || 0,
    }));

    // ------------------------------
    // RECENT APPLICANTS (PLACEHOLDER)
    // ------------------------------
    const applicants = []; // To be added when your friend builds student portal

    return res.json({ metrics, postings, applicants });
  } catch (err) {
    console.error("DASHBOARD SUMMARY ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
