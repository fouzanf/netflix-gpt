// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVpLHCx1yg7VxqbHgVX3ygyac6C6-___E",
  authDomain: "netflixgpt-c26a7.firebaseapp.com",
  projectId: "netflixgpt-c26a7",
  storageBucket: "netflixgpt-c26a7.firebasestorage.app",
  messagingSenderId: "727526520039",
  appId: "1:727526520039:web:095abbd29d5491d0141e42",
  measurementId: "G-HMPR4J4Y55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();