import { initializeApp } from "firebase/app";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZyOnA8LezOJ9_eVUthKsjWSR9-YHUEBQ",
  authDomain: "spendwisely-dev.firebaseapp.com",
  projectId: "spendwisely-dev",
  storageBucket: "spendwisely-dev.appspot.com",
  messagingSenderId: "300716824308",
  appId: "1:300716824308:web:90eea52e3949ab070670a1",
  measurementId: "G-TQXCNT7R4C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

console.log(auth);

const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

