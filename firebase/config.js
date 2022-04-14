// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiXWccSAH5jDJigq1Js0g4RrbWUn_g_94",
  authDomain: "instagram-dev-bd251.firebaseapp.com",
  projectId: "instagram-dev-bd251",
  storageBucket: "instagram-dev-bd251.appspot.com",
  messagingSenderId: "674676004810",
  appId: "1:674676004810:web:7dfa59828bb977a9bce133",
  measurementId: "G-BGGQQL1S88",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export default firebase;
