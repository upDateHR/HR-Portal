const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    status: {
      type: String,
      enum: ["Active", "Paused", "Closed"],
      default: "Active"
    },

    // -----------------------
    // BASIC JOB INFO
    // -----------------------
    title: {
      type: String,
      required: true,
      trim: true
    },

    companyName: {
      type: String,
      required: true,
      trim: true
    },

    department: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    location: {
      type: String,
      required: true,
      trim: true
    },

    // -----------------------
    // TYPE INFO
    // -----------------------
    type: {
      type: String,
      required: true,
      enum: ["Full-time", "Part-time", "Contract", "Internship"]
    },

    workplace: {
      type: String,
      required: true,
      enum: ["Remote", "On-site", "Hybrid"]
    },

    jobLevel: {
      type: String,
      required: true,
      enum: ["Beginner", "Intermediate", "Advanced", "Executive"]
    },

    // -----------------------
    // SALARY
    // -----------------------
    minSalary: {
      type: Number,
      default: null
    },

    maxSalary: {
      type: Number,
      default: null
    },

    // -----------------------
    // RESPONSE TIME
    // -----------------------
    maxResponseTime: {
      type: String,
      default: "24 Hours" // safer fallback
    }
  },
  { timestamps: true }
);

// ---------------------------
// SALARY VALIDATION
// ---------------------------
jobSchema.pre("save", function (next) {
  if (this.minSalary && this.maxSalary && this.minSalary > this.maxSalary) {
    return next(new Error("Minimum salary cannot exceed maximum salary"));
  }
  next();
});

module.exports = mongoose.model("Job", jobSchema);
