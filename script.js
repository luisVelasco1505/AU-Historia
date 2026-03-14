// referencias de elementos del DOM usados por las interacciones principales
const musica = document.getElementById("musicaFondo");
const botonMusica = document.getElementById("toggleMusica");
const botonEscena = document.getElementById("cambiarEscena");
const botonMostrarMas = document.getElementById("mostrarMas");
const contenidoOculto = document.getElementById("contenidoOculto");

// estado interno para saber si el audio de ambiente esta activo
let musicaActiva = false;

/**
 * Actualiza el texto del boton de musica segun el estado actual.
 * Centralizar este cambio evita repetir strings en varias funciones.
 */
function actualizarTextoBotonMusica() {
  if (!botonMusica) {
    return;
  }

  botonMusica.textContent = musicaActiva ? "Pausar musica" : "Activar musica";
}

/**
 * Intenta reproducir el audio de ambiente.
 * Si el navegador bloquea la reproduccion, deja un mensaje visible en el boton.
 */
function iniciarMusica() {
  if (!musica || !botonMusica) {
    return Promise.resolve();
  }

  return musica
    .play()
    .then(() => {
      musicaActiva = true;
      actualizarTextoBotonMusica();
    })
    .catch(() => {
      botonMusica.textContent = "No se pudo reproducir";
      console.log("No se pudo iniciar el audio de ambiente.");
    });
}

/**
 * Pausa la pista de ambiente y restaura el estado del boton.
 */
function pausarMusica() {
  if (!musica || !botonMusica) {
    return;
  }

  musica.pause();
  musicaActiva = false;
  actualizarTextoBotonMusica();
}

/**
 * Interaccion del boton de musica: alterna entre play y pause.
 */
function alternarMusica() {
  if (!musica || !botonMusica) {
    return;
  }

  if (musicaActiva) {
    pausarMusica();
    return;
  }

  iniciarMusica();
}

/**
 * Cambia entre el tema normal y el tema alterno.
 * Esto activa el efecto visual de escena definido en CSS.
 */
function alternarEscena() {
  document.body.classList.toggle("tema-alterno");
}

/**
 * Muestra/oculta el bloque extra del desarrollo
 * y sincroniza el texto del boton para indicar accion inversa.
 */
function alternarContenidoClasificado() {
  if (!contenidoOculto || !botonMostrarMas) {
    return;
  }

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
 * Registra eventos del bloque de audio y define su estado inicial.
 */
function configurarAudio() {
  if (!musica || !botonMusica) {
    console.log("No se encontro el audio o su boton de control.");
    return;
  }

  // volumen suave para que el ambiente no invada el resto del contenido
  musica.volume = 0.2;
  actualizarTextoBotonMusica();
  botonMusica.addEventListener("click", alternarMusica);
}

/**
 * Registra eventos de interaccion visual de la pagina.
 */
function configurarInteraccionesVisuales() {
  if (botonEscena) {
    botonEscena.addEventListener("click", alternarEscena);
  }

  if (botonMostrarMas && contenidoOculto) {
    botonMostrarMas.addEventListener("click", alternarContenidoClasificado);
  }
}

/**
 * Punto unico de inicializacion del sitio.
 * Se separa por modulos para que sea facil extender o depurar.
 */
function inicializarSitio() {
  configurarAudio();
  configurarInteraccionesVisuales();
}

inicializarSitio();
