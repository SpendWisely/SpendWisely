import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
  
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDZyOnA8LezOJ9_eVUthKsjWSR9-YHUEBQ",
  authDomain: "spendwisely-dev.firebaseapp.com",
  projectId: "spendwisely-dev",
  storageBucket: "spendwisely-dev.appspot.com",
  messagingSenderId: "300716824308",
  appId: "1:300716824308:web:90eea52e3949ab070670a1",
  measurementId: "G-TQXCNT7R4C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
console.log(auth);

const SignUp = document.getElementById("signup");


SignUp.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmpassword").value;
  if(password === confirmPassword){
    const user = register(email, password);
    console.log(user);
    console.log("email", email);
    console.log("password", password);
  }
  else{
    console.error("Passwords do not match");
  }

});

async function register(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User created: ", userCredential.user);
  } catch (error) {
    console.error("Error creating account: ", error.message);
    throw error;
  }
}


function displayUser(){
  const currUser = auth.currentUser
  const currentUser = document.getElementById("currentuser");
  currentUser.textContent = currUser.email
}

// onAuthStateChanged(auth, (user) => {
//   if(user != null) {
//     displayUser()
//   }
//   else{
//     // console.log(user)
//     const currentUser = document.getElementById("currentuser");
//     currentUser.textContent = "Not signed in"
//   }
// })