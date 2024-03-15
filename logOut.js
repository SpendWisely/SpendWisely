import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
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

const LogOut = document.getElementById("logout");


LogOut.addEventListener("click", (e) => {
  e.preventDefault();
  const logOutUser = logout();
  console.log(logOutUser);
});

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

function displayUser() {
  const currUser = auth.currentUser;
  const currentUser = document.getElementById("currentuser");
  currentUser.textContent = currUser.email;
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
