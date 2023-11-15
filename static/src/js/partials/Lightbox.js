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
    var labImg =
      labData.parentNode.querySelector(".lab__img").dataset.lazyload ||
      labData.parentNode.querySelector(".lab__img").src;
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
    lightbox__img.src = "";
    lightbox__img.src = src;
    lightbox__img.alt = title;
    lightbox__img.title = title;
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
