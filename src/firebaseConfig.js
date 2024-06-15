// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyd5CzTq4_L4mIRzF42AX4DB5WNLnKyWg",
  authDomain: "hoboguest-7a5c7.firebaseapp.com",
  projectId: "hoboguest-7a5c7",
  storageBucket: "hoboguest-7a5c7.appspot.com",
  messagingSenderId: "1095366516956",
  appId: "1:1095366516956:web:713452b94b668c0d4dd419",
  measurementId: "G-W4VGBJH3VM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const firestore = getFirestore(app)
export { auth, app, firestore }