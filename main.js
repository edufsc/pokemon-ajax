function actualizarPokemon(pokemon) {
  // contenedor nombre
  let contenedorNombre = document.querySelector(".nombre-pokemon");
  console.log({ contenedorNombre });

  // actualizar nombre
  contenedorNombre.textContent = pokemon.name;

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
      actualizarPokemon(pokemon);
    })
  );
}

// retorna un número entre 1 y 1010 (id de pokemon más alto conocido)
function getRandomPokedex() {
  return Math.floor(Math.random() * 1010) + 1;
}

// cargar pokemon por defecto
let idPokemon = 1;

// al hacer click en random-pokemon-btn
// actualizar con un pokemon aleatorio
function initPokemon() {
  getPokemon(idPokemon);

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
}

initPokemon();
