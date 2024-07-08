// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeyUDKANpGGfMAcGxLq71i541J04nPMeY",
  authDomain: "testing1234-2d709.firebaseapp.com",
  projectId: "testing1234-2d709",
  storageBucket: "testing1234-2d709.appspot.com",
  messagingSenderId: "484249687285",
  appId: "1:484249687285:web:fd1644916d741fc26ea1bc",
  measurementId: "G-L6ZXB45N18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const firestore = getFirestore(app)
export { auth, app, firestore }