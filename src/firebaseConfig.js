// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Impor getFirestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmf7ouPZPaISxDm3GI3S-P6TUV5XDh0OI",
  authDomain: "e-commerce-capstone-ece01.firebaseapp.com",
  projectId: "e-commerce-capstone-ece01",
  storageBucket: "e-commerce-capstone-ece01.firebasestorage.app",
  messagingSenderId: "706138392853",
  appId: "1:706138392853:web:0b099af94008f47ad1411c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig); 

// Inisialisasi Firestore dan ekspor db
export const db = getFirestore(app);