// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAY855YSLQe0anNCr8BUHM5UMA_Fbg4nIw",
  authDomain: "lapetitenoirie-7521d.firebaseapp.com",
  projectId: "lapetitenoirie-7521d",
  storageBucket: "lapetitenoirie-7521d.firebasestorage.app",
  messagingSenderId: "596670363789",
  appId: "1:596670363789:web:157367af43a40db6fa4ac4",
  measurementId: "G-GT2ZHLPQBL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app); // Add this line to initialize Firestore

// Export Firestore
export { db };