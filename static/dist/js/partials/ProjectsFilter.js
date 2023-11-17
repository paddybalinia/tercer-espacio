(function () {
  "use strict";

  // Constructor
  function Constructor() {
    // Obtén todos los elementos de filtro de botones y proyectos
    const filterButtons = document.querySelectorAll(".filter__btn");
    const projectItems = document.querySelectorAll("[data-filter]");

    // Agrega un evento de clic a cada botón de filtro
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Restablece la clase "active" en todos los botones de filtro
        filterButtons.forEach((btn) => btn.classList.remove("active"));

        // Agrega la clase "active" al botón actual
        button.classList.add("active");

        // Obtén el valor del atributo "aria-label" del botón actual
        const filterValue = button.getAttribute("aria-label");

        // Muestra u oculta los proyectos según el botón de filtro seleccionado
        projectItems.forEach((project) => {
          const dataFilter = project.getAttribute("data-filter");
          if (filterValue === "All" || dataFilter.includes(filterValue)) {
            project.style.display = "inline-block";
          } else {
            project.style.display = "none";
          }
        });
      });
    });
  }

  // Export
  window.ProjectsFilter = Constructor();
})();
