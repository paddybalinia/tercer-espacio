(function () {
  "use strict";

  // Constructor
  function Constructor() {
    const LinkToggle = document.querySelectorAll(".accordion__item");

    for (let e = 0; e < LinkToggle.length; e++) {
      LinkToggle[e].addEventListener("click", ToggleEvent, false);
    }
  }

  function ToggleEvent() {
    // Obtén todos los elementos con la clase "active"
    const activeElements = document.querySelectorAll(".accordion__item.active");

    // Elimina la clase "active" de los elementos que la tienen
    activeElements.forEach(function (element) {
      element.classList.remove("active");
    });

    // Agrega la clase "active" al elemento actual (el que se hizo clic)
    this.classList.add("active");
  }

  // Export
  window.About = Constructor();
})();
