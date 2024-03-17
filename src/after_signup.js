window.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    const content = document.getElementById("content");
    content.innerHTML = `Welcome, ${currentUser.user.email}`;
    console.log("Current user: ", currentUser);
  } else {
    const content = document.getElementById("content");
    content.innerHTML = "Welcome, Guest";
    console.log("No current user");
  }
});
