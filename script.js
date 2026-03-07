const musica = document.getElementById("musicaFondo");
const botonMusica = document.getElementById("toggleMusica");

let musicaActiva = false;

/* volumen inicial */
musica.volume = 0.1;

/* botón para activar o pausar música */
botonMusica.addEventListener("click", () => {

  if (musicaActiva) {
    musica.pause();
    botonMusica.textContent = "Activar música";
    musicaActiva = false;

  } else {
    musica.play()
      .then(() => {
        botonMusica.textContent = "Pausar música";
        musicaActiva = true;
      })
      .catch(() => {
        console.log("El navegador bloqueó el autoplay");
      });
  }

});

/* iniciar música al primer clic en la página */
document.addEventListener("click", () => {

  if (!musicaActiva) {

    musica.play()
      .then(() => {
        botonMusica.textContent = "Pausar música";
        musicaActiva = true;
      })
      .catch(() => {});

  }

}, { once: true });