// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-82_DlOyuLJ2vhRw6ZiN-cHCYgw68KvY",
  authDomain: "nusconnect-ea8e3.firebaseapp.com",
  projectId: "nusconnect-ea8e3",
  storageBucket: "nusconnect-ea8e3.appspot.com",
  messagingSenderId: "656107589640",
  appId: "1:656107589640:web:3e33c55c1b1fdc875601bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { auth, app }