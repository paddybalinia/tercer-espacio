(function () {
  "use strict";

  const menuLinks = document.querySelectorAll("nav a");
  // Constructor
  function Constructor() {
    // new setActiveLink(".nav a");
  }

  // Función para cambiar el enlace activo
  function setActiveLink() {
    const menuLinks = document.querySelectorAll("nav a");
    menuLinks.forEach((link) => {
      const section = document.querySelector(link.getAttribute("href"));
      const bounding = section.getBoundingClientRect();

      if (
        bounding.top <= window.innerHeight / 2 &&
        bounding.bottom >= window.innerHeight / 2
      ) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  // Escucha el evento de desplazamiento
  window.addEventListener("scroll", setActiveLink);

  // Export
  window.ScrollToSection = Constructor();
})();
