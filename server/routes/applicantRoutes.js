const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const Applicant = require("../models/Applicant");
const Job = require("../models/Job");

// ========================================================
// APPLY TO JOB  (Used by Student side)
// ========================================================
router.post("/apply", async (req, res) => {
  try {
    const { jobId, name, email, phone, resume } = req.body;

    // Validate job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Create applicant — recruiter = job.recruiter
    const applicant = await Applicant.create({
      jobId,
      recruiter: job.recruiter, 
      name,
      email,
      phone,
      resume,
      status: "Applied",
    });

    res.status(201).json({
      message: "Application submitted successfully",
      applicant,
    });
  } catch (err) {
    console.error("APPLY ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// ========================================================
// GET ALL APPLICANTS FOR LOGGED-IN RECRUITER
// ========================================================
router.get("/", protect, async (req, res) => {
  try {
    const applicants = await Applicant.find({
      recruiter: req.user._id,
    })
      .populate("jobId", "title companyName")
      .sort({ createdAt: -1 });

    res.json(applicants);
  } catch (err) {
    console.error("APPLICANT LIST ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
