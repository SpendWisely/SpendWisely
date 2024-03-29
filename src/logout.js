import {
  getAuth,
  signOut,
} from "firebase/auth";
import {app} from "../firebase";

// Initialize Firebase
const auth = getAuth(app);
console.log(auth);
console.log("currUser",auth.currentUser);


const LogOut = document.getElementById("logout");

LogOut.addEventListener("click", (e) => {
  e.preventDefault();
  const logOutUser = logout();
  console.log("logout: ", logOutUser)
});

async function logout() {
  try {
    if (auth.currentUser) {
      await signOut(auth);
      console.log("User logged out");
      localStorage.removeItem("currentUser");
      window.location.href = "/index.html";
    } else {
      console.log("No signed in user");
    }
  } catch (error) {
    console.error("Error logging out: ", error.message);
    throw error;
  }
}

