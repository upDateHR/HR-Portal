const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ===============================
// GET INITIAL SETTINGS
// ===============================
exports.getInitialSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      profile: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      company: {
        companyName: user.companyName,
        website: user.website,
        companyDescription: user.companyDescription,
      },
    });
  } catch (err) {
    console.error("INITIAL SETTINGS ERROR:", err);
    res.status(500).json({ message: "Unable to load settings" });
  }
};

// ===============================
// UPDATE PROFILE
// ===============================
exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, role, currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (role) user.role = role;

    // -------- PASSWORD CHANGE --------
    if (newPassword) {
      if (!currentPassword) {
        return res
          .status(400)
          .json({ message: "Current password required" });
      }

      const valid = await bcrypt.compare(currentPassword, user.password);
      if (!valid) {
        return res.status(400).json({ message: "Current password incorrect" });
      }

      // Set new hashed password
      user.password = newPassword; // <-- Mongoose pre-save hook will hash it!
    }

    await user.save();

    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("PROFILE UPDATE ERROR:", err);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

// ===============================
// UPDATE COMPANY
// ===============================
exports.updateCompany = async (req, res) => {
  try {
    const { companyName, website, companyDescription } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (companyName) user.companyName = companyName;
    if (website) user.website = website;
    if (companyDescription) user.companyDescription = companyDescription;

    await user.save();

    res.json({ message: "Company details updated successfully" });
  } catch (err) {
    console.error("COMPANY UPDATE ERROR:", err);
    res.status(500).json({ message: "Failed to update company details" });
  }
};
