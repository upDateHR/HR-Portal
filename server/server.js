const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./db");

// ROUTES
const authRoutes = require("./routes/authRoutes");
const employerRoutes = require("./routes/employerRoutes");   // mock UI routes (should NOT override real)
const jobRoutes = require("./routes/jobRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const applicantRoutes = require("./routes/applicantRoutes");
const employerSettingsRoutes = require("./routes/employerSettingsRoutes");

connectDB();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// ---------------------------
// AUTH ROUTES
// ---------------------------
app.use("/api/auth", authRoutes);

// ---------------------------
// EMPLOYER SETTINGS (CORRECT)
// ---------------------------
app.use("/api/employer/settings", employerSettingsRoutes);

// ---------------------------
// JOB ROUTES
// ---------------------------
app.use("/api/employer/jobs", jobRoutes);

// ---------------------------
// DASHBOARD ROUTES
// ---------------------------
app.use("/api/employer/dashboard", dashboardRoutes);

// ---------------------------
// APPLICANT ROUTES
// ---------------------------
app.use("/api/applicants", applicantRoutes);

// ---------------------------
// MOCK UI ROUTES (KEEP LAST!)
// ---------------------------
// these must be registered LAST so they do not override real API routes
app.use("/api", employerRoutes);

// ---------------------------
// 404 HANDLER
// ---------------------------
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    path: req.originalUrl
  });
});

// ---------------------------
// ERROR HANDLER
// ---------------------------
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
