// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCz_nxUu7waU_z8nF2obXtgOoh2-HGp0jw",
  authDomain: "hr-auth-da1f2.firebaseapp.com",
  projectId: "hr-auth-da1f2",
  storageBucket: "hr-auth-da1f2.firebasestorage.app",
  messagingSenderId: "450215396107",
  appId: "1:450215396107:web:d1f80f42c9674bba67180e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
