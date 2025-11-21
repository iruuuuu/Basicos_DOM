//imports

import { tareas } from "../db/db";

//importar variables vite
const PORT =  import.meta.env.VITE_PORT;
const URL= import.meta.env.VITE_URL;
const URL_PORT = `${URL}:${PORT}`

export function CreateEjercicio2(){
    function nofetch(){
        const data = tareas;
        return data;    
    }

    function fetching(){
        return fetch(`${URL_PORT}/tareas`)
        .then(response=> response.json())
        .then(data =>{return data})
        .catch(error=>{ throw new Error("No se ha podido cargar el json")});

    }

    function render(){
        //aqui decido donde pintar el objeto en el DOM
        const container = document.createElement("div");
        const lista= document.createElement("ul")

        const sinfetch = nofetch();
        let arrayfetch = []
        const fetch =fetching().then(response => { arrayfetch.push(...response)});
        console.log(arrayfetch)

        for (const tarea of arrayfetch) {
            console.log(tarea)
            const li = document.createElement("li");
            li.classList.add("task-item")

            if(tarea.completada) li.classList.add("completed");

            li.textContent = tarea.texto;
            lista.appendChild(li);
        }
        container.appendChild(lista);
        return container;

    }

   


    //retorno el objeto
    return {
        render
    };

}