//imports

import { peliculas } from "../db/db";

//importar variables vite
const PORT =  import.meta.env.VITE_PORT;
const URL= import.meta.env.VITE_URL;
const URL_PORT = `${URL}:${PORT}`


export default function CreateEjercicio3(){

    //Este bloque de código define una función llamada nofetch que simplemente devuelve una variable llamada peliculas.
    // La variable peliculas se asume que ya está definida en otro lugar del código. 
    // En resumen, esta función no realiza ninguna solicitud de red, simplemente devuelve los datos almacenados en la variable peliculas.
    function nofetch(){
        const data = peliculas;
        return data
    }

    const getStars = (rating) => {
        const numStars = Math.floor(rating/2);
        return "★".repeat(numStars);
    };


    // Este código es una función llamada fetching que ayuda a obtener datos de una página web. 
    // Primero, se envía una solicitud a una dirección web específica llamada ${URL_PORT}/peliculas. Luego, se espera a que la respuesta llegue y se analiza para convertirla en datos que podemos entender. Si todo sale bien, los datos se devuelven. 
    // Si hay algún problema, se muestra un mensaje de error. 
    //function fetching(){
        //return fetch(`${URL_PORT}/peliculas`)
        //.then(response=> response.json())
        //.then(data =>{return data})
        //.catch(error=>{ throw new Error("No se ha podido cargar el json")});
    //}

    /*
    fetching():
        Esta función va a la página web ${URL_PORT}/peliculas para pedirle los datos de las películas.
        Espera un poco para que la página web le envíe los datos.
        Si la página web le envía los datos correctamente, la función devuelve esos datos.
        Si la página web no le envía los datos o hay algún problema, la función muestra un mensaje de error.

    nofetch():
        Esta función no va a ninguna página web. Simplemente devuelve los datos que ya tiene en su posesión.
        No espera a que los datos lleguen ni maneja errores.
        Es como si alguien más te diera los datos y ahora los estás devolviendo a esa persona.
        En resumen, fetching() va a buscar los datos de la página web, mientras que nofetch() simplemente devuelve los datos que ya tiene.
    */

    function renderMoviesGrid(moviesArray){
        const container =document.createElement("div"); 
        //se le está asignado el nombre de la clase CSS "movies-container"
        //al elemento representado por la variable container.
        container.classList.add("movies-container");

        //Traemos la data peliculas creada en la funcion nofecht de forma local/privada
        moviesArray.forEach((movie) => {
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");
            //imagenes
            const img = document.createElement("img");
            img.src = movie.poster;
            img.alt = `${movie.title} Poster`;
            movieCard.appendChild(img);
            //titulo
            const title = document.createElement("h3");
            title.textContent = movie.title;
            movieCard.appendChild(title);
            //año
            const year = document.createElement("p");
            year.textContent = `Año: ${movie.year}`;
            movieCard.appendChild(year);
            // rating
            const rating = document.createElement("p");
            rating.textContent = `Rating: ${getStars(movie.rating)} (${movie.rating}/10)`;
            movieCard.appendChild(rating);

            container.appendChild(movieCard);
        });


        const render = () => {
            const mainContainer = document.createElement("div");
            //version sincrona
            const v1Wrapper = document.createElement("div");
            v1Wrapper.innerHTML = `<h3>Version Sincrona</h3>`;
            v1Wrapper.textContent = ``;
        return container
    }

    //version asincrona
    /*
    const v2Wrapper = document.createElement("div");
    v2Wrapper.innerHTML = `<h3>Version Asincrona</h3>`;
    fetching()
    .then((data)=>{
        const moviesGrid = renderMoviesGrid(data);
        v2Wrapper.appendChild(moviesGrid);
    })
    .catch((err)=>{
        v2Wrapper.textContent = `Error: ${err.message}`;
    }
    mainContainer.appendChild(v1Wrapper);
    mainContainer.appendChild(v2Wrapper);
    return mainContainer;
    }
    */

    return { render }

    }
}
