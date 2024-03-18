import {app} from "../firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const auth = getAuth(app);
console.log(auth);

const LogIn = document.getElementById("login");
LogIn.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginemail").value;
  const password = document.getElementById("loginpassword").value;

  const user = login(email, password);
  console.log(user);
});

async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User logged in: ", userCredential.user);
    localStorage.setItem("currentUser", JSON.stringify(userCredential));

    window.location.href = "/src/after_signup.html";
    
  } catch (error) {
    console.error("Error logging in: ", error.message);
    throw error;
  }
}


