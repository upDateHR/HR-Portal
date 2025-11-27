// SIMPLE clean axios wrapper for backend calls
import API from '../../api'

// ==============================
// AUTH — LOGIN
// ==============================
export const loginRecruiter = async (data) => {
  const res = await API.post('/auth/login', data);
  const user = res.data.user;
  localStorage.setItem('hr_token', res.data.token);
  localStorage.setItem('hr_user', JSON.stringify(user));
  return res.data;
};


// ==============================
// AUTH — REGISTER
// ==============================
export const registerRecruiter = async (data) => {
  const res = await API.post('/auth/register', data);
  const user = res.data.user;
  localStorage.setItem('hr_token', res.data.token);
  localStorage.setItem('hr_user', JSON.stringify(user));
  return res.data;
};


// ==============================
// Dashboard Summary
// ==============================
export const getDashboardSummary = async () => {
  const res = await API.get('/employer/dashboard/summary');
  return res.data;
};

// ==============================
// My Jobs
// ==============================
export const getMyJobs = async () => {
  const res = await API.get('/employer/jobs');
  // server responds with { jobs: [...] }
  return res.data && res.data.jobs ? res.data.jobs : [];
};

// ==============================
// Create Job
// ==============================
export const createJobPosting = async (data) => {
  const res = await API.post('/employer/jobs/create', data);
  // server responds with { job }
  return res.data && res.data.job ? res.data.job : res.data;
};

// ==============================
// Get Job by ID
// ==============================
export const getJobById = async (id) => {
  const res = await API.get(`/employer/jobs/${id}`);
  // server responds with { job }
  return res.data && res.data.job ? res.data.job : res.data;
};

// ==============================
// Update Job
// ==============================
export const updateJob = async (id, data) => {
  const res = await API.put(`/employer/jobs/${id}`, data);
  // expect { job } or updated object
  return res.data && res.data.job ? res.data.job : res.data;
};

// ==============================
// Update Job Status
// ==============================
export const updateJobStatus = async (id, status) => {
  const res = await API.put(`/employer/jobs/status/${id}`, { status });
  // expect { job } or { success }
  return res.data && res.data.job ? res.data.job : res.data;
};

// ==============================
// Delete Job
// ==============================
export const deleteJob = async (id) => {
  const res = await API.delete(`/employer/jobs/${id}`);
  // expect { success: true } or similar
  return res.data;
};

// ==============================
// SETTINGS — Initial Load
// ==============================
export const getInitialSettings = async () => {
  const res = await API.get('/employer/settings/initial');
  return res.data;
};

// ==============================
// UPDATE PROFILE (with password)
// ==============================
export const updateProfile = async (data) => {
  const res = await API.post('/employer/settings/profile', data);
  return res.data;
};

// ==============================
// UPDATE COMPANY
// ==============================
export const updateCompany = async (data) => {
  const res = await API.post('/employer/settings/company', data);
  return res.data;
};

export const sendMessageToAssistant = async (message) => {
  const res = await API.post('/assistant/chat', { message });
  return res.data.reply;
};

/// Basic applicants
export const getApplicants = async () => {
  const res = await API.get('/applicants');
  return res.data;
};

export const updateApplicantStatus = async (id, status) => {
  const res = await API.put(`/applicants/status/${id}`, { status });
  return res.data;
};

// Hiring pipeline
export const getHiringPipeline = async () => {
  const res = await API.get('/hiring-pipeline');
  return res.data;
};

export const updateHiringStage = async (id, status) => {
  const res = await API.put(`/hiring-stage/${id}`, { status });
  return res.data;
};

export const getApplicationsPerMonth = async () => {
  const res = await API.get('/applications-per-month');
  return res.data;
};


export const checkIfApplied = async (jobId) => {
  const res = await API.get(`/applications/check/${jobId}`);
  return res.data.applied;  // true/false
};


