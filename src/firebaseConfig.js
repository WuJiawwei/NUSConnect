// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_5eDOHgD_1ynCo78kwyVvYRFxNSi85c",
  authDomain: "databasetest-7900a.firebaseapp.com",
  projectId: "databasetest-7900a",
  storageBucket: "databasetest-7900a.appspot.com",
  messagingSenderId: "784939490292",
  appId: "1:784939490292:web:97c8a52645e87d21a077a1",
  measurementId: "G-JNCVJ99NBF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const firestore = getFirestore(app)
export { app, firestore, auth }