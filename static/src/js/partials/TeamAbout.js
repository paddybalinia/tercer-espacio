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
    const isActive = this.classList.contains("active");

    // Obtén todos los elementos con la clase "active"
    const activeElements = document.querySelectorAll(".accordion__item.active");

    // Elimina la clase "active" de los elementos que la tienen
    activeElements.forEach(function (element) {
      element.classList.remove("active");
    });

    // Si el elemento actual no tenía la clase "active", agrégasela
    if (!isActive) {
      this.classList.add("active");
    }
  }

  // Export
  window.About = Constructor();
})();
