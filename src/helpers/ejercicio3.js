import { peliculas } from "../db/db"; 

//importar variables vite
const PORT = import.meta.env.VITE_PORT;  
const URL = import.meta.env.VITE_URL;  
const URL_PORT = `${URL}:${PORT}`;  

export function CreateEjercicio3() {  
    function nofetch() {  
        const data = peliculas;  
        return data;      
}  

    function fetching() {  
        return fetch(`${URL_PORT}/peliculas`)  
            .then(response => response.json())  
            .then(data => {return data})  
            .catch(error => { throw new Error("No se ha podido cargar el json")});  
    }  

    function render() {  
        const container = document.createElement("div");  
        container.className = "movies-container";  
        // Opción 1: Usar datos locales (síncrono)  
        const data = nofetch(); 
        //PARA CADA PELICULA DE DATA(=PELICULAS) se declara esto en el nofetch
        for (const pelicula of data) {  
            // ... crear tarjetas  
            const card = document.createElement("div");
            card.className = "movie-card";
            const title = document.createElement("h3");
            title.textContent = pelicula.titulo;
            const year = document.createElement("p");
            year.textContent = `Año: ${pelicula.anio}`;
            card.appendChild(title);
            card.appendChild(year);
            container.appendChild(card);
        }  
        // Opción 2: Usar API (asíncrono) - requiere async/await  
        // const data = await fetching();  
        return container;  
    }  
    return { render };  
}