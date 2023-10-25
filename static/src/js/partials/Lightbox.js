(function () {
  "use strict";

  var lightbox = document.querySelector(".lightbox"),
    body = document.querySelector("body");

  // Constructor
  function Constructor() {
    const btnClose = document.querySelectorAll("[data-lightbox-close]");
    const Link = document.querySelectorAll("[data-lightbox]");

    for (let e = 0; e < btnClose.length; e++) {
      btnClose[e].addEventListener("click", CloseLightbox, false);
    }
    for (let e = 0; e < Link.length; e++) {
      Link[e].addEventListener("click", onClickLink, false);
    }
  }

  function onClickLink(event) {
    event.preventDefault();

    ToggleLightbox();
  }

  function ToggleLightbox() {
    lightbox.classList.toggle("active");
    body.classList.toggle("lightbox-active");
  }

  function CloseLightbox() {
    // alert(æz);
    lightbox.classList.toggle("active");
    body.classList.toggle("lightbox-active");
  }

  // Export
  window.Lightbox = Constructor();
})();
