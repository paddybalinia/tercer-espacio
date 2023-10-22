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
