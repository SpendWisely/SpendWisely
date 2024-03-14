const navLinks = document.querySelectorAll('nav a');
const mainContent = document.getElementById('mainContent');

navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();

    const route = link.dataset.route;
    console.log("routes:", route)
    fetch(`/src/${route}.html`)
      .then(res => res.text())
      .then(data => {
        mainContent.innerHTML = data; 
      })
      .catch(error => {
        console.error('Error loading content:', error);
      });
  });
});
