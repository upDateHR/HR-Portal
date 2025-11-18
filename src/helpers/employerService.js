// FIREBASE JOB SERVICE (replaces MongoDB backend)
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
  limit,
  orderBy
} from "firebase/firestore";

import { db, auth } from "../firebase";

// ===============================================
// GET CURRENT LOGGED IN USER
// ===============================================
const getCurrentUID = () => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");
  return user.uid;
};

// ===============================================
// CREATE JOB POST
// ===============================================
export const createJobPosting = async (data) => {
  const recruiterId = getCurrentUID();

  const jobRef = await addDoc(collection(db, "jobs"), {
    ...data,
    recruiterId,
    status: "Active",
    applicants: [],
    createdAt: serverTimestamp(),
  });

  return { id: jobRef.id };
};

// ===============================================
// FETCH JOBS FOR LOGGED-IN RECRUITER
// ===============================================
export const getMyJobs = async () => {
  const recruiterId = getCurrentUID();

  const q = query(
    collection(db, "jobs"),
    where("recruiterId", "==", recruiterId)
  );

  const snap = await getDocs(q);

  return snap.docs.map((d) => ({
    _id: d.id,
    ...d.data(),
  }));
};

// ===============================================
// GET JOB BY ID
// ===============================================
export const getJobById = async (id) => {
  const ref = doc(db, "jobs", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) throw new Error("Job not found");

  return { id: snap.id, ...snap.data() };
};

// ===============================================
// UPDATE JOB
// ===============================================
export const updateJob = async (id, data) => {
  const ref = doc(db, "jobs", id);
  await updateDoc(ref, data);
  return true;
};

// ===============================================
// UPDATE JOB STATUS
// ===============================================
export const updateJobStatus = async (id, newStatus) => {
  const ref = doc(db, "jobs", id);
  await updateDoc(ref, { status: newStatus });
  return true;
};

// ===============================================
// DELETE JOB
// ===============================================
export const deleteJob = async (id) => {
  const ref = doc(db, "jobs", id);
  await deleteDoc(ref);
  return true;
};

// ===============================================
// GET APPLICANTS (CORRECTED → USE "applications")
// ===============================================
export const getApplicants = async () => {
  const recruiterId = getCurrentUID();

  const q = query(
    collection(db, "applications"),
    where("recruiterId", "==", recruiterId)
  );

  const snap = await getDocs(q);

  return snap.docs.map((d) => ({
    _id: d.id,
    ...d.data(),
  }));
};


// ===============================================
// DASHBOARD SUMMARY (NEW)
// ===============================================
export const getDashboardSummary = async () => {
  const recruiterId = getCurrentUID();

  // JOB COUNT
  const jobsSnap = await getDocs(
    query(collection(db, "jobs"), where("recruiterId", "==", recruiterId))
  );
  const jobs = jobsSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

  // APPLICANTS COUNT
  const appsSnap = await getDocs(
    query(collection(db, "applications"), where("recruiterId", "==", recruiterId))
  );
  const applicants = appsSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

  // RECENT JOBS (limit 3)
  const recentJobsSnap = await getDocs(
    query(
      collection(db, "jobs"),
      where("recruiterId", "==", recruiterId),
      orderBy("createdAt", "desc"),
      limit(3)
    )
  );

  const recentJobs = recentJobsSnap.docs.map((d) => ({
    _id: d.id,
    ...d.data(),
  }));

  // RECENT APPLICANTS (limit 3)
  const recentAppsSnap = await getDocs(
    query(
      collection(db, "applications"),
      where("recruiterId", "==", recruiterId),
      orderBy("appliedAt", "desc"),
      limit(3)
    )
  );

  const recentApplicants = recentAppsSnap.docs.map((d) => ({
    name: d.data().candidateName,
    role: d.data().jobTitle,
  }));

  return {
    metrics: [
      { label: "Total Jobs", value: jobs.length },
      { label: "Total Applicants", value: applicants.length },
      { label: "Active Jobs", value: jobs.filter((j) => j.status === "Active").length },
      { label: "Closed Jobs", value: jobs.filter((j) => j.status === "Closed").length },
    ],
    postings: recentJobs,
    applicants: recentApplicants,
  };
};



