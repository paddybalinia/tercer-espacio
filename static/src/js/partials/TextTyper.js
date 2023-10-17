(function () {
  "use strict";
  const textos = document.querySelectorAll(".texto-animado");

  const velocidadEscritura = 50; // Velocidad en milisegundos por caracter
  const caracteresPorIteracion = 1; // Cantidad de caracteres a agregar en cada iteración

  // Constructor
  function Constructor() {}

  function escribirTexto(textoElemento, texto) {
    let i = 0;
    textoElemento.textContent = "";
    function escribirCaracter() {
      if (i < texto.length) {
        const caracteres = texto.substring(i, i + caracteresPorIteracion);
        textoElemento.textContent += caracteres;
        i += caracteresPorIteracion;
        setTimeout(escribirCaracter, velocidadEscritura);
      }
    }
    escribirCaracter();
  }

  // Observador de intersección para cada elemento
  const observadores = [];

  textos.forEach((textoElemento) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          escribirTexto(textoElemento, textoElemento.textContent);
          observer.disconnect(); // Detener la observación después de la animación
        }
      });
    });

    observadores.push(observer);

    // Observar el elemento
    observer.observe(textoElemento);
  });
  // Export
  window.ScrollIntoView = Constructor();
})();
