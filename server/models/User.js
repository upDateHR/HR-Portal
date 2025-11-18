const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    // Required recruiter field
    companyName: { type: String, required: true },

    // Default role
    role: { type: String, default: "HR Manager" },

    // Employer Settings
    phone: { type: String, default: "" },
    website: { type: String, default: "" },
    companyDescription: { type: String, default: "" }
  },
  { timestamps: true }
);

/** 
 * 🛑 IMPORTANT
 * Only re-hash password if changed.
 * This guarantees:
 * - Registration hashes correctly
 * - Login compares correctly
 * - Update profile → password change works
 * - Normal profile updates DO NOT break login
 */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const hashed = await bcrypt.hash(this.password, 10);
  this.password = hashed;
  next();
});

// Compare password (used in LOGIN + password update)
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
