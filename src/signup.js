import { app, db } from "../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import {signInWithEmailAndPassword} from "firebase/auth"

import {
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth(app);
console.log(auth);

//attach demoLogin eventlistener
const demoLogIn = document.getElementById("demo-acc");
demoLogIn.addEventListener("click", async (e) => {
  e.preventDefault();
  const user = demoAccLogin();
});

const SignUp = document.getElementById("signup");
let signupSubmit = document.getElementById("signupSubmit");

SignUp.addEventListener("submit", async (e) => {
  e.preventDefault();
  signupSubmit.textContent = "Creating Account..."
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmpassword").value;
  if (password === confirmPassword) {
    const user = register(email, password);
    console.log(user);
    console.log("email", email);
    console.log("password", password);
  } else {
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
      localStorage.setItem("currentUser", JSON.stringify(userCredential));
    
      await setDoc(doc(db, "Users", userCredential.user.uid), {
      username: email,
      budget: null,
      balance: 0,
    })

    signupSubmit.textContent = "Signup"
    SignUp.reset();
    window.location.href = "/src/after_signup.html";
    
  } catch (error) {
    console.error("Error creating account: ", error.message);
    throw error;
  }
}

//Handle demo login
async function demoAccLogin(){
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      "demoaccount@demo.com",
      "demodemo"
    );
    console.log("User logged in: ", userCredential.user);
    localStorage.setItem("currentUser", JSON.stringify(userCredential));

    window.location.href = "/src/after_signup.html";

  } catch (error) {
    console.error("Error logging in: ", error.message);
    throw error;
  }
}