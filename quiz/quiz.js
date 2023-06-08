let nombrePokemon = "";
let intentos = 5;
// puntuación usuario
let score = 0;

function actualizarPokemon(pokemon) {
  // contenedor feedback
  let contenedorNombre = document.querySelector("#feedback");
  // actualizar nombre
  contenedorNombre.textContent = "";

  // imagen
  let imagenPokemon = document.querySelector(".imagen-pokemon");
  console.log({ imagenPokemon });

  // actualizar src de la imagen con el sprite
  imagenPokemon.setAttribute("src", pokemon.sprites.front_default);
}

function getPokemon(id) {
  // Realiza la petición GET utilizando la función fetch()
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) =>
    response.json().then((pokemon) => {
      console.log(pokemon);
      nombrePokemon = pokemon.name;
      intentos = 5;
      actualizarPokemon(pokemon);
    })
  );
}

// retorna un número entre 1 y 1010 (id de pokemon más alto conocido)
function getRandomPokedex() {
  return Math.floor(Math.random() * 1010) + 1;
}

// al hacer click en random-pokemon-btn
// actualizar con un pokemon aleatorio
function initPokemon() {
  let busqueda = window.location.search;
  let parametros = new URLSearchParams(busqueda);
  // cargar pokemon por defecto
  let idPokemon = parametros.get("id");
  // comprobar si había id en la URL
  if (idPokemon) {
    getPokemon(idPokemon);
  } else {
    // si no hay id en la URL ponemos un id fijo
    idPokemon = getRandomPokedex();
    getPokemon(idPokemon);
  }

  // if (!idPokemon) {
  //   idPokemon = 1;
  // }
  // getPokemon(idPokemon);

  let btnRandom = document.querySelector("#random-pokemon-btn");
  btnRandom.addEventListener("click", () => {
    idPokemon = getRandomPokedex();
    getPokemon(idPokemon);
  });

  // botones "Anterior" y "Siguiente" para recorrer los Pokemon
  let btnAnterior = document.querySelector("#prev-pokemon-btn");
  btnAnterior.addEventListener("click", () => {
    if (idPokemon > 1) {
      idPokemon--;
    } else {
      idPokemon = 1010;
    }
    getPokemon(idPokemon);
  });

  let btnSiguiente = document.querySelector("#next-pokemon-btn");
  btnSiguiente.addEventListener("click", () => {
    if (idPokemon < 1010) {
      idPokemon++;
    } else {
      idPokemon = 1;
    }
    getPokemon(idPokemon);
  });

  let btnValidar = document.querySelector("#btn-validate-pokemon");
  btnValidar.addEventListener("click", () => validarRespuesta());
}

function validarRespuesta() {
  // seleccionar input de nombre
  let inputNombre = document.querySelector("#input-name");
  // seleccionar contenedor para el feedback
  let contenedorFeedback = document.querySelector("#feedback");
  if (inputNombre.value.toLowerCase() === nombrePokemon) {
    // si el nombre es correcto
    console.log("Correcto!");
    contenedorFeedback.textContent = "Correcto!";
    score++;
    console.log({ score });
  } else {
    // si no...
    console.log("Inténtalo otra vez!");
    intentos--;
    let mensaje = `Inténtalo otra vez, te quedan ${intentos} oportunidades!`;
    if (intentos == 0) {
      mensaje = "Game Over!";
    }
    contenedorFeedback.textContent = mensaje;
    console.log({ intentos });
  }
}

initPokemon();