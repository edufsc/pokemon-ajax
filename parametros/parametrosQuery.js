// objeto con la consulta de la URL
let busqueda = window.location.search;

// objeto con funciones para buscar parámetros en la consulta
let parametros = new URLSearchParams(busqueda);

// obtener el parámetro de URL con name "url" http://..?url=https://google.es
let url = parametros.get("url");
console.log({ url });

// si url no es null, vacío, undefined...
if (url) {
  // navegar a la URL
  window.location.href = url;
}
