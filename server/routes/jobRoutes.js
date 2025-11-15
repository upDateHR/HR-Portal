const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const Job = require("../models/Job");

// ----------------------------------------
// CREATE JOB
// ----------------------------------------
router.post("/create", protect, async (req, res) => {
  try {
    const recruiterId = req.user._id;
    const companyName = req.user.companyName;

    // Required fields check
    const required = ["title", "description", "location", "type", "workplace"];
    for (let field of required) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `Missing field: ${field}` });
      }
    }

    const job = await Job.create({
      ...req.body,
      recruiter: recruiterId,  // Assign recruiter to job
      status: "Active"
    });

    res.status(201).json({
      message: "Job created successfully",
      job
    });
  } catch (err) {
    console.error("POST JOB ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// ----------------------------------------
// GET MY JOBS
// ----------------------------------------
router.get("/", protect, async (req, res) => {
  try {
    const jobs = await Job.find({ recruiter: req.user._id }).sort({
      createdAt: -1
    });

    const formatted = jobs.map((job) => ({
      _id: job._id,
      title: job.title,
      company: job.companyName,
      posted: new Date(job.createdAt || job._id.getTimestamp()).toDateString(),
      applicants: 0,
      newCount: 0,
      views: 0,
      matches: "–",
      response: job.maxResponseTime || "24 Hours",
      status: job.status
    }));

  

    res.json(formatted);
  } catch (err) {
    console.error("FETCH JOB ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// ----------------------------------------
// GET JOB BY ID (for Edit Page)
// ----------------------------------------
router.get("/:id", protect, async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      recruiter: req.user._id
    });

    if (!job) return res.status(404).json({ message: "Job not found" });

    res.json(job);
  } catch (err) {
    console.error("GET JOB ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// ----------------------------------------
// UPDATE JOB
// ----------------------------------------
router.put("/:id", protect, async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, recruiter: req.user._id },
      req.body,
      { new: true }
    );

    if (!job) return res.status(404).json({ message: "Job not found" });

    res.json({ message: "Job updated", job });
  } catch (err) {
    console.error("UPDATE JOB ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// ----------------------------------------
// DELETE JOB
// ----------------------------------------
router.delete("/:id", protect, async (req, res) => {
  try {
    await Job.deleteOne({ _id: req.params.id, recruiter: req.user._id });
    res.json({ message: "Job deleted" });
  } catch (err) {
    console.error("DELETE JOB ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// ----------------------------------------
// UPDATE JOB STATUS
// ----------------------------------------
router.put("/status/:id", protect, async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Active", "Paused", "Closed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, recruiter: req.user._id },
      { status },
      { new: true }
    );

    if (!job) return res.status(404).json({ message: "Job not found" });

    res.json({ message: "Status updated", job });
  } catch (err) {
    console.error("Status update error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
