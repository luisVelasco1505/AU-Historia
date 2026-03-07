const botonMostrar = document.getElementById("mostrarMas");
const contenidoOculto = document.getElementById("contenidoOculto");
const botonEscena = document.getElementById("cambiarEscena");

botonMostrar.addEventListener("click", () => {
    if (contenidoOculto.style.display === "block") {
        contenidoOculto.style.display = "none";
        botonMostrar.textContent = "Mostrar más";
    } else {
        contenidoOculto.style.display = "block";
        botonMostrar.textContent = "Mostrar menos";
    }
});

botonEscena.addEventListener("click", () => {
    document.body.classList.toggle("tema-alterno");
});