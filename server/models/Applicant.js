const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema(
  {
    // Recruiter who owns the job
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Job applied for
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },

    // Applicant details
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    resume: String, // resume link/file path (expand later)

    // Application status
    status: {
      type: String,
      enum: ["Applied", "Shortlisted", "Rejected"],
      default: "Applied"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Applicant", applicantSchema);
