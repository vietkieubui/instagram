// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdt7bVP6kTGYHyugLKiSdv23fxe8lFhBE",
  authDomain: "intagram-dev-e7bc3.firebaseapp.com",
  projectId: "intagram-dev-e7bc3",
  storageBucket: "intagram-dev-e7bc3.appspot.com",
  messagingSenderId: "352231170495",
  appId: "1:352231170495:web:bf357d99243f3aa05d810a",
  measurementId: "G-MNJBCYGX10",
};
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

// Initialize Firebase
export { auth, db };
export default firebase;
