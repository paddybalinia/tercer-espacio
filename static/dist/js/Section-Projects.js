(function () {
  "use strict";

  var Header = document.querySelector(".header"),
    Navigation = document.querySelector(".navigation"),
    lastScrollY =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop,
    startSticky = 10,
    ticking = false;
  // Constructor
  function Constructor() {
    const LinkToggle = document.querySelectorAll("[data-togglenav]");

    NavigationHover();

    for (let e = 0; e < LinkToggle.length; e++) {
      LinkToggle[e].addEventListener("click", NavToggle, false);
    }
    window.addEventListener("scroll", onScroll);
  }

  function NavToggle() {
    const Nav = document.querySelector(".navigation");
    Nav.classList.toggle("active");
  }
  function NavigationHover() {
    const enlaces = document.querySelectorAll(".navigation__nav-1__a");
    var dataSection = "";
    enlaces.forEach((enlace) => {
      enlace.addEventListener("mouseover", function () {
        dataSection = this.dataset.section;

        const element = Navigation.querySelector(
          "[data-nav=" + dataSection + "]"
        );
        element.classList.add("active");
      });

      enlace.addEventListener("mouseout", function () {
        const element = Navigation.querySelector(
          "[data-nav=" + dataSection + "]"
        );
        element.classList.remove("active");
      });
    });
  }

  /**
   * Evento onScroll
   * @return void
   */
  function onScroll() {
    lastScrollY =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop;

    requestTick();
  }
  /**
   * Validamos que se haya ejecutado correctamente el onScroll() antes de pintar
   * un nuevo frame.
   * @return void
   */
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }
  /**
   *
   *
   * @return void
   */
  function update() {
    const menuLinks = document.querySelectorAll(".header__ul a");

    Header.classList[lastScrollY >= startSticky ? "add" : "remove"](
      "header--sticky"
    );

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
    ticking = false;
  }
  // Export
  window.Header = Constructor();
})();

(function () {
  "use strict";

  let Images = [],
    Options = {
      rootMargin: "50px 0px",
      threshold: 0.01,
    },
    Observer = null,
    ImagePath = null;

  function Constrcutor() {
    Images = document.querySelectorAll("[data-lazyload]:not(.generated)");

    if (Images.length == 0) {
      return;
    }

    if ("IntersectionObserver" in window) {
      Observer = new IntersectionObserver(onIntersection, Options);
      for (let i = 0, k = Images.length; i < k; i++) {
        Observer.observe(Images[i]);
      }
    } else {
      loadImages();
    }
  }

  function onIntersection(entryList) {
    for (let i = 0, k = entryList.length, image; i < k; i++) {
      image = entryList[i];

      if (image.intersectionRatio > 0) {
        Observer.unobserve(image.target);
        setImage.apply(image.target);
      }
    }
  }
  function setImage() {
    ImagePath = this.getAttribute("data-lazyload");
    if (this.classList.contains("generated") || !ImagePath) {
      return;
    }
    this[this.tagName !== "LINK" ? "src" : "href"] = ImagePath;
    this.removeAttribute("data-lazyload");
    this.classList.add("generated");
  }
  function loadImages() {
    for (let i = 0, k = Images.length; i < k; i++) {
      setImage.apply(Images[i]);
    }
  }

  Constrcutor.prototype = {
    reinit: Constrcutor,
  };

  window.LazyLoad = new Constrcutor();
})(window);

(function () {
  "use strict";

  // Constructor
  function Constructor() {
    const LinkAnchor = document.querySelectorAll("[data-anchor]");

    for (let e = 0; e < LinkAnchor.length; e++) {
      LinkAnchor[e].addEventListener("click", ViewportObserver, false);
    }
  }

  function ViewportObserver(event) {
    event.preventDefault();

    const anchor = this.dataset.anchor;
    const element = document.querySelector("[data-section=" + anchor + "]");
    if (!element) {
      return;
    }
    element.scrollIntoView();
  }

  // Export
  window.ScrollIntoView = Constructor();
})();

(function () {
  "use strict";

  // Constructor
  function Constructor() {
    new ViewportObserver(".viewport-observer", "visible");
  }
  function ViewportObserver(targetSelector, visibleClass) {
    const elements = document.querySelectorAll(targetSelector);

    if (!elements.length) {
      return; // No se encontraron elementos con el selector dado
    }

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(visibleClass);
          observer.unobserve(entry.target);
        }
      });
    });

    elements.forEach((element) => {
      observer.observe(element);
    });
  }

  // Export
  window.ViewportObserver = Constructor();
})();

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
