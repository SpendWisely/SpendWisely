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
const LogIn = document.getElementById("login");
const LogOut = document.getElementById("logout");


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

LogIn.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginemail").value;
  const password = document.getElementById("loginpassword").value;

  const user = login(email, password);
  console.log(user);
})

LogOut.addEventListener("click", (e) => {
  e.preventDefault();
  const logOutUser = logout();
  console.log(logOutUser);
})

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

async function login(email, password) {
  try{
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in: ", userCredential.user);
  }
  catch(error){
    console.error("Error logging in: ", error.message);
    throw error; 
  }
}

async function logout(){
  try{
    if(auth.currentUser){
      await signOut(auth)
      console.log("User logged out")
    }
    else{
      console.log("No signed in user")
    }
  }
  catch(error){
    console.error("Error logging out: ", error.message);
    throw error;
  }
}

function displayUser(){
  const currUser = auth.currentUser
  const currentUser = document.getElementById("currentuser");
  currentUser.textContent = currUser.email
}

onAuthStateChanged(auth, (user) => {
  if(user) {
    displayUser()
  }
  else{
    const currentUser = document.getElementById("currentuser");
    currentUser.textContent = "Not signed in"
  }
})