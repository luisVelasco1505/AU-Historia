// Referencias principales de la UI
const musica = document.getElementById("musicaFondo");
const botonMusica = document.getElementById("toggleMusica");
const botonEscena = document.getElementById("cambiarEscena");
const botonMostrarMas = document.getElementById("mostrarMas");
const contenidoOculto = document.getElementById("contenidoOculto");

let musicaActiva = false;

/**
 * Reproduce la musica de fondo y sincroniza estado + texto del boton.
 * Se centraliza para que cualquier cambio futuro afecte a una sola funcion.
 */
function iniciarMusica() {
  return musica
    .play()
    .then(() => {
      musicaActiva = true;
      botonMusica.textContent = "Pausar musica";
    })
    .catch(() => {
      console.log("El navegador bloqueo la reproduccion automatica.");
    });
}

/**
 * Pausa la musica y restablece el estado visual del boton.
 */
function pausarMusica() {
  musica.pause();
  musicaActiva = false;
  botonMusica.textContent = "Activar musica";
}

/**
 * Alterna reproduccion/pausa desde el boton principal de audio.
 */
function alternarMusica() {
  if (musicaActiva) {
    pausarMusica();
    return;
  }

  iniciarMusica();
}

/**
 * Alterna el tema visual de la pagina agregando o quitando la clase
 * de modo alternativo en el <body>.
 */
function alternarEscena() {
  document.body.classList.toggle("tema-alterno");
}

/**
 * Muestra u oculta el bloque narrativo clasificado y actualiza el
 * texto del boton para que el estado sea explicito.
 */
function alternarContenidoClasificado() {
  const estaOculto = contenidoOculto.classList.contains("oculto");

  if (estaOculto) {
    contenidoOculto.classList.remove("oculto");
    botonMostrarMas.textContent = "Ocultar archivo clasificado";
    return;
  }

  contenidoOculto.classList.add("oculto");
  botonMostrarMas.textContent = "Revelar archivo clasificado";
}

/**
 * Configura todos los listeners y estados iniciales.
 * Punto unico de inicializacion para futuras extensiones.
 */
function inicializarSitio() {
  // Volumen base bajo para no interrumpir al entrar.
  musica.volume = 0.1;

  botonMusica.addEventListener("click", alternarMusica);
  botonEscena.addEventListener("click", alternarEscena);
  botonMostrarMas.addEventListener("click", alternarContenidoClasificado);

  // Intenta iniciar musica en la primera interaccion del usuario.
  document.addEventListener(
    "click",
    () => {
      if (!musicaActiva) {
        iniciarMusica();
      }
    },
    { once: true }
  );
}

inicializarSitio();
