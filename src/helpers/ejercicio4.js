// 1. Importar alojamientos desde data.js
import { alojamientos } from '../db/db.js';

import { fetching } from '../utils/fetching.js';

export function createEjercicio4() {

    //non-fechted version
    const nofetch= () => alojamientos;


    //renderTable
    //esta funcion se encarga de renderizar (renderizar= mostrar) 
    // la tabla de alojamientos es decir donde se muestran los alojamientos
    function renderTable(alojamientosArray) {
        //creamos el contenedor que mostrara el contenido
        const container = document.createElement("div");
        //le asignamos la clase o estilos asociados del css
        container.classList.add("alojamientos-container");
        //creamos la tabla
        const table = document.createElement("table");
        //le asignamos la clase o estilos asociados del css
        table.classList.add("alojamientos-table");

        //thead supondra el encabezado de la tabla
        //creamos la tabla
        const thead = document.createElement("thead");
        //creamos un encabezado de la tabla que contendra los nombres de las columnas
        const trHead = document.createElement("tr");
        //el .forEach para crear los th de la tabla; cada th sera una columna de la tabla
        ['Nombre', 'Ubicación', 'Precio', 'Rating'].forEach(headerText => {
            //creamos el th
            const th = document.createElement("th");
            //xxxxxxxx
            th.textContent = headerText;
            trHead.appendChild(th);
        });
        //añadimos el encabezado a la tabla
        thead.appendChild(trHead);
        //añadimos la tabla al contenedor
        table.appendChild(thead);

        //tbody
        const tbody = document.createElement("tbody");
        //.forEach para crear las filas de la tabla; cada fila sera un alojamiento
        alojamientosArray.forEach(alojamiento => {
            //creamos la fila
            const tr = document.createElement("tr"); //tr es la fila de la tabla  
            //nombre
            const tdName = document.createElement("td");
            tdName.textContent = alojamiento.nombre;
            tr.appendChild(tdName);
            //ubicacion
            const tdLocation = document.createElement("td");
            tdLocation.textContent = alojamiento.ubicacion;
            tr.appendChild(tdLocation);
            //precio
            const tdPrice = document.createElement("td");
            tdPrice.textContent = `${alojamiento.precio}`;
            tr.appendChild(tdPrice);
            //rating
            const tdRating = document.createElement("td");
            tdRating.classList.add("rating");
            tdRating.textContent = '★'.repeat( Math.floor(alojamiento.rating));
            tr.appendChild(tdRating);
            tbody.appendChild(tr);
        });

        table.appendChild(tbody);
        container.appendChild(table);
        return container;
    }

    //render Function
    //este render se encarga de renderizar (mostrar) los alojamientos
    //a diferencia del rendreTable esta funcion renderiza los alojamientos
    function render() {
        const mainContainer = document.createElement("div");

        //v1Wrapper (Síncrono)
        const v1Wrapper = document.createElement("div");
        v1Wrapper.innerHTML = `<h3>Version Sincrona</h3>`;
        const alojamientosData = nofetch();
        const alojamientosTable = renderTable(alojamientosData);
        v1Wrapper.appendChild(alojamientosTable);
        mainContainer.appendChild(v1Wrapper);
        
        //v2Wrapper (Asíncrono)
        const v2Wrapper = document.createElement("div");
        v2Wrapper.innerHTML = `<h3>Version Asincrona</h3>`;
        fetching("alojamientos")
        .then((data) => {
            const alojamientosGrid = renderTable(data);
            v2Wrapper.appendChild(alojamientosGrid);
        })
        .catch((err) => {
            v2Wrapper.textContent = `Error: ${err.message}`;
        });
        
        mainContainer.appendChild(v2Wrapper);
        
        return mainContainer;
        }

    return { render }
}