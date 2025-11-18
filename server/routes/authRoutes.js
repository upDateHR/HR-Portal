const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Helper → return user object in correct format
const buildUserResponse = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  companyName: user.companyName,
});

/// ---------------- REGISTER ----------------
router.post("/register", async (req, res) => {
  console.log("REGISTER HIT:", req.body);

  try {
    const { name, email, password, companyName } = req.body;

    if (!name || !email || !password || !companyName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    // Create user
    const user = await User.create({
      name,
      email,
      password, // mongoose will hash automatically
      companyName,
      phone: "",
      role: "HR Manager",
      website: "",
      companyDescription: "",
    });

    // JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "30d" }
    );

    // ⭐ SEND EXACT FORMAT FRONTEND EXPECTS
    res.json({
      token,
      id: user._id,
      name: user.name,
      email: user.email,
      companyName: user.companyName,
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: "Registration failed" });
  }
});


// ---------------- LOGIN ----------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "30d" }
    );

    // ⭐ FRONTEND EXPECTS THESE FIELDS DIRECTLY
    res.json({
      token,
      id: user._id,
      name: user.name,
      email: user.email,
      companyName: user.companyName || "",
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;
