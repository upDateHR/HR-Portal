import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRecruiter } from "../employer/helpers/employerService";
import { toast } from "react-toastify";

const Login = ({ setCurrentView }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginRecruiter(form);
      // Save token & full user object already done in service
      // alert("Login successful!");
      toast.success("Login successful! ✅");
      // determine user role and navigate to appropriate portal
      const user =
        res && res.user
          ? res.user
          : JSON.parse(localStorage.getItem("hr_user") || "{}");
      const role = user && user.role ? user.role : null;

      const target =
        typeof setCurrentView === "function"
          ? "dashboard"
          : role === "candidate"
          ? "/candidate"
          : "/company";

      // if (typeof setCurrentView === "function") {
      //   setCurrentView(target);
      //   window.location.reload();
      // } else {
      //   navigate(target, { replace: true });
      //   window.location.reload();
      // }

      

      setTimeout(() => {
        if (typeof setCurrentView === "function") {
          setCurrentView(target);
          window.location.reload();
        } else {
          navigate(target, { replace: true });
          window.location.reload();
        }
      }, 2000);
    } catch (err) {
      console.error("LOGIN FAILED:", err);
      alert(err?.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Login
          </h1>

          <p className="text-center text-gray-500 mb-6">
            Sign in to continue to I am HR Portal
          </p>

          <form className="space-y-6" onSubmit={handleLogin}>
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
              className="w-full py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-500">
            Don’t have an account?{" "}
            <span
              onClick={() => {
                if (typeof setCurrentView === "function")
                  setCurrentView("register");
                else navigate("/signup");
              }}
              className="text-purple-600 font-semibold cursor-pointer"
            >
              Register
            </span>
          </p>
        </div>
      </div> */}

      <br />

      <div className="signup-container ">
        <div className="login-card">
          {/* Left section */}
          <div className="signup-left">
            <div className="left-gradient"></div>
            <div className="left-circle left-circle1"></div>
            <div className="left-circle left-circle2"></div>
            {/* <h1 className="logo">IamHR</h1> */}
            <img className="h-6 lg:h-7" src="/abhiintern1.png" alt="" />
            <p className="left-desc">
              Join AbhiIntern and find your dream job or recruit talented candidates.
            </p>
          </div>

          {/* Right section */}
          <div className="signup-right">
            <div className="flex items-center justify-center bg-gray-100 ">
              <div className="bg-white p-2 max-w-md w-full">
                <h1 className="text-3xl font-bold text-gray-900 mb-1 text-center">
                  Login
                </h1>

                <p className="text-center text-gray-500 mb-4">
                  Sign in to continue to AbhiIntern
                </p>

                <form className="space-y-6" onSubmit={handleLogin}>
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
                    className="w-full py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </form>

                <p className="mt-4 text-sm text-center text-gray-500">
                  Don’t have an account?{" "}
                  <span
                    onClick={() => {
                      if (typeof setCurrentView === "function")
                        setCurrentView("register");
                      else navigate("/signup");
                    }}
                    className="text-purple-600 font-semibold cursor-pointer"
                  >
                    Register
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
