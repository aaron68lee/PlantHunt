// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbAmGQZlJkWJmAb3ij2XquZ17ahejhyzw",
  authDomain: "planthunt-8b25d.firebaseapp.com",
  projectId: "planthunt-8b25d",
  storageBucket: "planthunt-8b25d.appspot.com",
  messagingSenderId: "981462532163",
  appId: "1:981462532163:web:5c04875a61e7edfd3a54f6",
  measurementId: "G-VTBDVK2V8J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export { app, firebaseConfig};