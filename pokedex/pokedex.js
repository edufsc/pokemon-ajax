let paginaActual = null;

function imprimirPagina(pagina) {
  const resultados = pagina.results;
  console.log(resultados);
  let contenedorPokemons = document.querySelector("#contenedor-pokemons");
  contenedorPokemons.innerHTML = "";
  for (let i = 0; i < resultados.length; i++) {
    const pokemon = resultados[i];
    console.log(pokemon);
    const idPokemon = getIdFromURL(pokemon.url)
    contenedorPokemons.innerHTML += `<li><a href="/?id=${idPokemon}">${pokemon.name}</a></li>`;
  }
}

function getPage(url) {
  // Realiza la petición GET utilizando la función fetch()
  fetch(url).then((response) =>
    response.json().then((page) => {
      console.log(page);
      paginaActual = page;
      imprimirPagina(page);
    })
  );
}

// obtener el id de una URL como "https://pokeapi.co/api/v2/pokemon/20/"
function getIdFromURL(url) {
  if (url) {
    // obtener un array con las partes de la URL
    let partesURL = url.split("/");
    // devolver el id como número entero
    // (en este caso siempre está en la posición 6)
    return parseInt(partesURL[6]);
  } else {
    // si no hay URL válida retornamos -1
    return -1;
  }
}

let idFromURL = getIdFromURL("https://pokeapi.co/api/v2/pokemon/20/");
console.log({ idFromURL });

// función para iniciar la página (botones y página por defecto)
function init() {
  // escuchar evento click en los botones
  let prevBtn = document.querySelector("#prev-page-btn");
  let nextBtn = document.querySelector("#next-page-btn");

  prevBtn.addEventListener("click", () => {
    if (paginaActual.previous) {
      getPage(paginaActual.previous);
    }
  });

  nextBtn.addEventListener("click", () => {
    if (paginaActual.next) {
      getPage(paginaActual.next);
    }
  });

  // obtener e imprimir primera página
  getPage("https://pokeapi.co/api/v2/pokemon/");
}

// ejecutamos la función init al cargar el script
init();
