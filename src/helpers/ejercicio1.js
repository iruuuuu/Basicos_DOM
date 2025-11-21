//import { bienvenida } from "../db/db.js";

//importar variables vite
const PORT =  import.meta.env.VITE_PORT;
const URL= import.meta.env.VITE_URL;
const URL_PORT = `${URL}:${PORT}`

import { bienvenida  } from "../db/db.js";
export function Createejercicio1() {
    function noFetching() {
    const data = bienvenida.texto;
    return data;
    }


    function fetching(){
       return fetch(`${URL_PORT}/bienvenida`)
        .then(response => response.json())
        .then(data => {return data.texto })
        .catch(error=>{ throw new Error("No se ha podido cargar el json")});
    }

    //aqui decido donde pintar el objeto en el DOM
    function render(){
        const container = document.createElement("div");
        const parrafo = document.createElement("p");

        parrafo.classList.add("welcome-message");
        
        fetching().then(data => {parrafo.textContent= data})
        //parrafo.textContent = noFetching();

        container.appendChild(parrafo);
        return container;
    }

   


    //retorno el objeto
    return {
        render
    };
}
