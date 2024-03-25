import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDZyOnA8LezOJ9_eVUthKsjWSR9-YHUEBQ",
  authDomain: "spendwisely-dev.firebaseapp.com",
  projectId: "spendwisely-dev",
  storageBucket: "spendwisely-dev.appspot.com",
  messagingSenderId: "300716824308",
  appId: "1:300716824308:web:90eea52e3949ab070670a1",
  measurementId: "G-TQXCNT7R4C",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
