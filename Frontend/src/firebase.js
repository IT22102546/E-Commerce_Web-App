// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "e-commerce-webapp-94311.firebaseapp.com",
  projectId: "e-commerce-webapp-94311",
  storageBucket: "e-commerce-webapp-94311.appspot.com",
  messagingSenderId: "807147952738",
  appId: "1:807147952738:web:78822270c709d4b406cf3b",
  measurementId: "G-VFXGTBSCG4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider };
