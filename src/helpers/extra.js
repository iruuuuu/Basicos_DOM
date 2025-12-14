/**
 * crear una aplicacion de consulta del clima utilizando la API de OpenWeatherMap constituida por 6 elementos subdivididos en:
 * - un header ( TITULO )
 * - un footer (NUESTROS DATOS)
 * - y un main subdividido en :
 *  - search card ( se encarga de buscar dentro de la API el clima de la ciudad introducida.Ejemplificar una cache y un almacenamiento con map en localStorage)
 * - weather card (dispondremos de un array de 15 imagenes almacenadas en la carpeta public con los diferentes estados del clima posibles)
 * -favourites card ( la tarjeta de favoritos almacenara las tarjetas favoritas.Para hacer favorita una ciudad basta con dar 2 click del raton y automaticamente se guarde en la card favorita.Para sacar una targeta de las favoritas boton dereche sobre la tarjeta. )
 *  
 * el header y el footer se contruiran con colo elementos vistos en el DOM
 */




/**
 * crear un sistema booking de gestion de reservas de hotel que permita ejemplificar la reserva en un hotel. El sistema tendra 
 * la siguiente interfaz:
 * -main con:
 * -un desplegable !!!!!!!!
 * -dos imput date , check in y check out donde el check out no puede ser anterior que el check in!!!
 * - numero de huespedes ; me mostrara utilizando un componente card hotel todos aquellos hoteles
 *  que tenga disponibilidad para las fechas seleccionadas, sacadas de la data. Cuando le de un click 
 * a la card automaticamente se añadira en un componenete carrito reserva la informacion del hotel
 * numero de personas , nº estrellas y precio a pagar; el total a pagar sera igual al precio por noche * numero de huespedes
 * se reseteara todo al realizar una reserva
 * hay persistencia de datos en el carrito reserva utilizando localstorage
 * */



import { alojamientos } from "../db/data";
import fetching from "../utils/fetching";

export default function createEjercicio4() {
  // cloussure SCOPE

  //notfetching
  const notFetching = () => alojamientos

  //renderTable
  const renderTable = (alojamientosArray) => {
    const tableContainer = document.createElement("div");
    tableContainer.classList.add("table-container");

    const table = document.createElement("table");
    table.classList.add("table");

    const thead = document.createElement("thead");
    thead.innerHTML = "<tr><th>Nombre</th><th>Ubicación</th><th>Precio</th><th>Rating</th></tr>";

    const tbody = document.createElement("tbody");
    alojamientosArray.forEach(alojamiento => {
      const tr = document.createElement("tr");

      const td1 = document.createElement("td");
      td1.textContent = alojamiento.nombre;

      const td2 = document.createElement("td");
      td2.textContent = alojamiento.ubicacion;

      const td3 = document.createElement("td");
      td3.classList.add("price");
      td3.textContent = alojamiento.precio;

      const td4 = document.createElement("td");
      td4.classList.add("rating");
      td4.textContent = "⭐".repeat(Math.floor(alojamiento.rating));

      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);

      tbody.appendChild(tr);
    });
    table.appendChild(thead);
    table.appendChild(tbody);

    tableContainer.appendChild(table);

    return tableContainer;
  }
  // render FUNCTION
  const render = () => {
    const mainContainer = document.createElement("div");
    mainContainer.innerHTML = "<h2>Ejercicio 4</h2>";

    const v1Wrapper = document.createElement("div");
    v1Wrapper.innerHTML = "<h3>Versión síncrona</h3>";
    v1Wrapper.appendChild(renderTable(notFetching()));
    mainContainer.appendChild(v1Wrapper);

    const v2Wrapper = document.createElement("div");
    v2Wrapper.innerHTML = "<h3>Versión asíncrona</h3>";
    fetching("alojamientos")
      .then((data) => {
        v2Wrapper.appendChild(renderTable(data));
      })
      .catch(err => {
        throw err;
      });
    
    mainContainer.appendChild(v2Wrapper);

    return mainContainer;
  }
  return {
    render
  };
}