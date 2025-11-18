// src/helpers/api.js
// This file replaces all axios + backend calls
// Everything will now happen using Firebase Auth + Firestore

import { auth, db } from "../firebase";

// Firebase Firestore methods
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
  query,
  where,
} from "firebase/firestore";

// ===========================
// USER HELPERS (firestore)
// ===========================

// Save user in Firestore
export const saveUserToFirestore = async (uid, data) => {
  await setDoc(doc(db, "users", uid), data, { merge: true });
};

// Get user from Firestore
export const getUserFromFirestore = async (uid) => {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
};

// ===========================
// JOB HELPERS (to be added later)
// We will create full functions after migrating user auth
// ===========================

// Example placeholder:
// export const createJobPosting = async (data) => {
//   return await addDoc(collection(db, "jobs"), data);
// };

