// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCz_nxUu7waU_z8nF2obXtgOoh2-HGp0jw",
  authDomain: "hr-auth-da1f2.firebaseapp.com",
  projectId: "hr-auth-da1f2",
  storageBucket: "hr-auth-da1f2.firebasestorage.app",
  messagingSenderId: "450215396107",
  appId: "1:450215396107:web:d1f80f42c9674bba67180e",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
