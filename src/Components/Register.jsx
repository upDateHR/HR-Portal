import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { registerRecruiter } from "../employer/helpers/employerService";

const Register = ({ setCurrentView }) => {
  const [form, setForm] = useState({
    name: "",
    companyName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Backend expects these exact fields
      const payload = {
        name: form.name,
        companyName: form.companyName,
        email: form.email,
        password: form.password,

        phone: "",
        role: "employer",
        website: "",
        companyDescription: "",
      };

      const res = await registerRecruiter(payload);

      // Save updated structure
      localStorage.setItem("hr_token", res.token);
      localStorage.setItem(
        "hr_user",
        JSON.stringify({
          id: res.id,
          name: res.name,
          email: res.email,
          companyName: res.companyName,
        })
      );

      alert("Account created!");

      if (typeof setCurrentView === 'function') {
        setCurrentView("dashboard");
        window.location.reload();
      } else {
        // top-level route used — redirect into employer area
        navigate('/company', { replace: true });
        window.location.reload();
      }

    } catch (err) {
      console.error("Registration failed:", err);
      alert(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          Create Employer Account
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Start hiring with I am HR Portal
        </p>

        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              required
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              id="companyName"
              type="text"
              required
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => {
              if (typeof setCurrentView === 'function') setCurrentView('login');
              else navigate('/login');
            }}
            className="text-purple-600 font-semibold cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
