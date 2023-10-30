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

  var lightbox = document.querySelector(".lightbox"),
    index = 0,
    body = document.querySelector("body");

  // Constructor
  function Constructor() {
    const btnClose = document.querySelectorAll("[data-lightbox-close]");
    const Link = document.querySelectorAll("[data-lightbox]");
    const lightboxNext = document.querySelector(".lightbox__next");

    lightboxNext.addEventListener("click", onButtonNext, false);

    for (let e = 0; e < btnClose.length; e++) {
      btnClose[e].addEventListener("click", CloseLightbox, false);
    }
    for (let e = 0; e < Link.length; e++) {
      Link[e].addEventListener("click", onClickLink, false);
    }
  }

  function onClickLink(e) {
    e.preventDefault();

    GetData(e.currentTarget);
    ToggleLightbox();
  }

  function GetData(e) {
    index = e.dataset.index;
    var labData = e.querySelector(".lab__data");
    var labImg = labData.querySelector(".lab__img").dataset.imgsrc;
    var labTitle = labData.querySelector(".lab__title").textContent;
    var labSubtitle = labData.querySelector(".lab__subtitle").textContent;
    var labYear = labData.querySelector(".lab__year").textContent;
    var labText = labData.querySelector(".lab__text").textContent;

    //alert(e.dataset.vertical);

    var isVetical = e.dataset.vertical ? true : false;

    updateData({
      src: labImg,
      title: labTitle,
      subtitle: labSubtitle,
      year: labYear,
      text: labText,
      verical: isVetical,
    });
  }

  function updateData({
    src = "src",
    title = "titulo",
    subtitle = "subtitulo",
    year = "year",
    text = "text",
    verical = false,
  }) {
    var lightbox__img = document.querySelector(".lightbox__img"),
      lightbox__title = document.querySelector(".lightbox__title"),
      lightbox__subtitle = document.querySelector(".lightbox__subtitle"),
      lightbox__snood = document.querySelector(".lightbox__snood"),
      lightbox__figure = document.querySelector(".lightbox__figure"),
      lightbox__text = document.querySelector(".lightbox__text");

    verical
      ? lightbox__figure.classList.add("lightbox__figure--vertical")
      : lightbox__figure.classList.remove("lightbox__figure--vertical");

    lightbox__img.src = src;
    lightbox__title.textContent = title;
    lightbox__subtitle.textContent = subtitle;
    lightbox__snood.textContent = year;
    lightbox__text.textContent = text;
  }

  function ToggleLightbox() {
    lightbox.classList.toggle("active");
    body.classList.toggle("lightbox-active");
  }

  function CloseLightbox() {
    lightbox.classList.toggle("active");
    body.classList.toggle("lightbox-active");
  }
  function onButtonNext() {
    index++;
    var nextElement = document.querySelector('[data-index="' + index + '"]');

    if (!nextElement) {
      return;
    }

    GetData(nextElement);
  }
  // Export
  window.Lightbox = Constructor();
})();
