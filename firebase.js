import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCYvycNP_N_YuMlaHTvDiWdMqBMU7C-P8I",
  authDomain: "spendwisely-prod.firebaseapp.com",
  projectId: "spendwisely-prod",
  storageBucket: "spendwisely-prod.appspot.com",
  messagingSenderId: "492077134311",
  appId: "1:492077134311:web:ed6355f3a9a68f18714d42",
  measurementId: "G-4JYY17JWSK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
