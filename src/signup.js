import { app, db } from "../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

import {
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth(app);
console.log(auth);

const SignUp = document.getElementById("signup");

SignUp.addEventListener("submit", async (e) => {
  e.preventDefault();
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
    window.location.href = "/src/after_signup.html";

    await setDoc(doc(db, "Users", userCredential.user.uid), {
      username: email,
      budget: null,
      balance: null,
    })

    const collRef = collection(db, "Users", userCredential.user.uid, "Transaction");

    await addDoc(collRef, {
      date: null,
      debit: null,
      credit: null,
      category: null,
    })

  } catch (error) {
    console.error("Error creating account: ", error.message);
    throw error;
  }
}
