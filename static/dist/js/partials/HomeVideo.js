(function (window, document) {
  "use strict";

  var video = document.getElementById("myVideo");
  var texto = document.getElementById("miTexto");
  var iframe = document.getElementById("iframe");

  // Obtén el ancho inicial del video en píxeles
  var startWidth = video.clientWidth;

  // Obtén el ancho del viewport en píxeles
  var viewportWidth = window.innerWidth;
  if (viewportWidth < 768) {
    return;
  }

  // Valores de inicio y final para el ancho del video en píxeles
  var endWidth = viewportWidth; // Ancho máximo igual al ancho del viewport (ajusta según tus necesidades)

  // Restricción para el ancho mínimo
  var minWidth = startWidth; // Ancho mínimo en píxeles

  // Valores de inicio y final para la posición vertical (top)
  var startTop = -180; // Valor inicial de la posición vertical en píxeles
  var endTop = 0; // Valor final de la posición vertical en píxeles

  // Altura desde la parte superior del documento donde comienza el cambio de tamaño
  var startScroll = 0; // Ajusta según tus necesidades

  // Altura desde la parte superior del documento donde el cambio de tamaño está completo
  var endScroll = 700; // Ajusta según tus necesidades

  // Altura desde la parte superior del documento donde la opacidad comienza a cambiar
  var fadeOutScrollStart = 0; // Ajusta según tus necesidades

  // Altura desde la parte superior del documento donde la opacidad se establece en 0
  var fadeOutScrollEnd = 200; // Ajusta según tus necesidades

  window.addEventListener("scroll", function () {
    var scrollPosition = window.scrollY || window.pageYOffset;

    // Calcula el porcentaje de desplazamiento en función de startScroll y endScroll
    var scrollPercentage =
      (scrollPosition - startScroll) / (endScroll - startScroll);

    // Limita el porcentaje a los valores entre 0 y 1
    scrollPercentage = Math.min(1, Math.max(0, scrollPercentage));

    // Calcula el ancho del video en función del porcentaje y redondea
    var newWidth = Math.round(
      minWidth + (endWidth - minWidth) * scrollPercentage
    );

    // Calcula la posición vertical (top) en función del porcentaje y redondea
    var newTop = Math.round(startTop + scrollPercentage * (endTop - startTop));

    // Calcula la opacidad en función del desplazamiento vertical
    var newOpacity =
      1 -
      (scrollPosition - fadeOutScrollStart) /
        (fadeOutScrollEnd - fadeOutScrollStart);

    // Asegúrate de que la opacidad esté en el rango 0-1
    newOpacity = Math.min(1, Math.max(0, newOpacity));

    // Aplica los nuevos estilos al video
    video.style.width = newWidth + "px";

    // Aplica la transformación en lugar de la posición "top" al elemento "iframe"
    iframe.style.transform = "translateY(" + newTop + "px)";

    // Aplica la nueva opacidad al elemento de texto
    texto.style.opacity = newOpacity;
  });

  // window.Video = new Constructor();
})(window, document);
