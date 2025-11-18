const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth");

const {
  getInitialSettings,
  updateProfile,
  updateCompany,
} = require("../controllers/settingsController");

// Load all settings
router.get("/initial", protect, getInitialSettings);

// Update profile data (name, phone, role, password)
router.post("/profile", protect, updateProfile);

// Update company info
router.post("/company", protect, updateCompany);

module.exports = router;
