// SIMPLE clean axios wrapper for backend calls
import axios from "axios";

const API_URL = "http://localhost:3001/api";

// ==============================
// AUTH — LOGIN
// ==============================
export const loginRecruiter = async (data) => {
  const res = await axios.post(`${API_URL}/auth/login`, data);

  const user = res.data.user; // backend returns user object

  localStorage.setItem("hr_token", res.data.token);
  localStorage.setItem("hr_user", JSON.stringify(user));

  return res.data;
};


// ==============================
// AUTH — REGISTER
// ==============================
export const registerRecruiter = async (data) => {
  const res = await axios.post(`${API_URL}/auth/register`, data);

  const user = res.data.user;

  localStorage.setItem("hr_token", res.data.token);
  localStorage.setItem("hr_user", JSON.stringify(user));

  return res.data;
};


// ==============================
// Dashboard Summary
// ==============================
export const getDashboardSummary = async () => {
  const token = localStorage.getItem("hr_token");

  const res = await axios.get(`${API_URL}/employer/dashboard/summary`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};

// ==============================
// My Jobs
// ==============================
export const getMyJobs = async () => {
  const token = localStorage.getItem("hr_token");

  const res = await axios.get(`${API_URL}/employer/jobs`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};

// ==============================
// Create Job
// ==============================
export const createJobPosting = async (data) => {
  const token = localStorage.getItem("hr_token");

  const res = await axios.post(`${API_URL}/employer/jobs/create`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};

// ==============================
// Get Job by ID
// ==============================
export const getJobById = async (id) => {
  const token = localStorage.getItem("hr_token");

  const res = await axios.get(`${API_URL}/employer/jobs/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};

// ==============================
// Update Job
// ==============================
export const updateJob = async (id, data) => {
  const token = localStorage.getItem("hr_token");

  const res = await axios.put(`${API_URL}/employer/jobs/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};

// ==============================
// Update Job Status
// ==============================
export const updateJobStatus = async (id, status) => {
  const token = localStorage.getItem("hr_token");

  const res = await axios.put(
    `${API_URL}/employer/jobs/status/${id}`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return res.data;
};

// ==============================
// Delete Job
// ==============================
export const deleteJob = async (id) => {
  const token = localStorage.getItem("hr_token");

  const res = await axios.delete(`${API_URL}/employer/jobs/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};

// ==============================
// SETTINGS — Initial Load
// ==============================
export const getInitialSettings = async () => {
  const token = localStorage.getItem("hr_token");

  const res = await axios.get(`${API_URL}/employer/settings/initial`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};

// ==============================
// UPDATE PROFILE (with password)
// ==============================
export const updateProfile = async (data) => {
  const token = localStorage.getItem("hr_token");

  const res = await axios.post(`${API_URL}/employer/settings/profile`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};

// ==============================
// UPDATE COMPANY
// ==============================
export const updateCompany = async (data) => {
  const token = localStorage.getItem("hr_token");

  const res = await axios.post(`${API_URL}/employer/settings/company`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};

// ==============================
// Applicants
// ==============================
export const getApplicants = async () => {
  const token = localStorage.getItem("hr_token");

  const res = await axios.get(`${API_URL}/applicants`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};
