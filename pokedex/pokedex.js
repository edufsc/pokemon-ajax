let paginaActual = null;

function imprimirPagina(pagina) {
  const resultados = pagina.results;
  console.log(resultados);
  let contenedorPokemons = document.querySelector("#contenedor-pokemons");
  contenedorPokemons.innerHTML = "";
  for (let i = 0; i < resultados.length; i++) {
    const pokemon = resultados[i];
    console.log(pokemon);
    contenedorPokemons.innerHTML += `<li>${pokemon.name}</li>`;
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
