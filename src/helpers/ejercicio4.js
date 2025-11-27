// 1. Importar alojamientos desde data.js
import { alojamientos } from '../db/db.js';

import { fetching } from '../utils/fetching.js';

export function createEjercicio4() {

    //non-fechted version
    const nofetch= () => alojamientos;


    //renderTable
    function renderTable(alojamientosArray) {
        const container = document.createElement("div");
        container.classList.add("alojamientos-container");
        const table = document.createElement("table");
        table.classList.add("alojamientos-table");

        //thead
        const thead = document.createElement("thead");
        const trHead = document.createElement("tr");
        ['Nombre', 'Ubicación', 'Precio', 'Rating'].forEach(headerText => {
            const th = document.createElement("th");
            th.textContent = headerText;
            trHead.appendChild(th);
        });
        thead.appendChild(trHead);
        table.appendChild(thead);

        //tbody
        const tbody = document.createElement("tbody");
        alojamientosArray.forEach(alojamiento => {
            const tr = document.createElement("tr");
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