//buscador sin enter y sin boton , que con cada pulsacion del teclado realice la busqueda tras 5segundos de inactividad
//utilizar fetch para traer los datos 
//implementar una cache para que atraves de un map guarde las busquedas anteriores.
//Si busco 2 veces la misma palabra , no lo buscara en la api , sino que no que lo traera del map
//https://rickandmortyapi.com/api/character/?name=(nombre de la busqueda)

/**
 * Crea un buscador de personajes de Rick y Morty
 * que funciona sin necesidad de un botón de buscar ni
 * un enter. Con cada pulsación del teclado, se
 * realiza la búsqueda tras 5 segundos de inactividad.
 * Utiliza fetch para traer los datos y
 * implementa una cache para que a través de un map
 * guarde las búsquedas anteriores.
 * Si se busca 2 veces la misma palabra, no se
 * buscará en la API, sino que se traiga del map.
 * https://rickandmortyapi.com/api/character/?name=(nombre de la busqueda)
 * 
 * @returns {{Object}} un objeto con una función render que
 * devuelve un elemento HTML que contiene el buscador y
 * el contenedor de resultados.
 */
    export function ejercicio11() {
    let input;
    let resultsContainer;
    const stage = {
        cache: new Map(),
        isLoading: false,
    }


/**
 * Devuelve una función que se ejecuta despues de un
 * tiempo de inactividad. La función se ejecuta
 * con los argumentos pasados a la función original.
 * Se utiliza para evitar que se realizen
 * multiples llamadas a una función en un corto
 * período de tiempo.
 * @param {Function} func - la función a ejecutar
 * @param {number} delay - el tiempo de inactividad en milisegundos
 * @returns {Function} la función debounceada
 */
    const debounce = (func, delay) => {
        let timeout;
        return function(...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    };


/**
 * Busca personajes de Rick y Morty en la API
 * y muestra los resultados en pantalla.
 * Si ya se ha buscado antes, se trae de la cache
 * en lugar de hacer una nueva petición a la API.
 * Si no se encuentra nada, se muestra un mensaje
 * de "No se encontraron resultados".
 * @param {string} query - el término de búsqueda
 * @returns {void}
 */
    const search = async(query)=> {
        const term= query.trim().toLowerCase();
        if(!term){
            displayEmpty();
            return;
        }

        if(stage.cache.has(term)){
            displayCharacters(stage.cache.get(term));
            return;
        }

        displayLoading();
        stage.isLoading = true;
        const characters = await fetchCharacters(term);
        stage.isLoading = false;

        if (characters && characters.length > 0) {
            stage.cache.set(term, characters);
            displayCharacters(characters);
        } else {
            displayEmpty();
        }
    }


/**
 * Fetches characters from the Rick and Morty API based on the given query.
 * @param {string} query - the search query
 * @returns {Promise<Array<Character>>} a promise that resolves to an array of characters
 * @throws {Error} an error if the API request fails
 */
    const fetchCharacters = async (query) => {
        const URL = `https://rickandmortyapi.com/api/character/?name=${query}`;
        try {
            const response = await fetch(URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error("Error fetching characters:", error);
            return null;
        }
    };

/**
 * Muestra los personajes encontrados en pantalla.
 * Si no se han encontrado personajes, se muestra un mensaje
 * de "No se han encontrado resultados".
 * @param {Array<Character>} characters - un array de personajes
 */
    const displayCharacters = (characters) => {
        if (!characters || characters.length === 0) {
            displayEmpty();
            return;
        }
        resultsContainer.innerHTML = "";
        resultsContainer.appendChild(renderGrid(characters));
    }

/**
 * Muestra un mensaje de carga en pantalla.
 * Se utiliza para mostrar un estado de carga mientras se realizan
 * peticiones a la API.
 */
    const displayLoading = () => {
        resultsContainer.innerHTML = "<h3 class=\"loading\">Cargando...</h3>";
    }

/**
 * Muestra un mensaje de error en pantalla.
 * Se utiliza para mostrar un mensaje de error en pantalla
 * cuando se produce un error al realizar una petición a la API.
 * @param {string} message - el mensaje de error a mostrar
 */
    const distplayError = (message) => {
        resultsContainer.innerHTML = `<h3 class=\"error\">Error: ${message}</h3>`;
    }

/**
 * Muestra un mensaje de "No se han encontrado resultados" en pantalla.
 * Se utiliza cuando no se han encontrado personajes que coincidan con la búsqueda.
 */
    const displayEmpty = () => {
        resultsContainer.innerHTML = "<h3 class=\"error\">No se han encontrado resultados</h3>";
    }

/**
 * Renders a grid of character cards based on the given array of characters.
 * @param {Array<Character>} characters - an array of characters to render
 * @returns {HTMLElement} the rendered grid element
 */
    const renderGrid = (characters) => {
        const grid = document.createElement("div");
        grid.style.display = "grid";
        grid.style.gridTemplateColumns = "repeat(auto-fill, minmax(150px, 1fr))";
        grid.style.gap = "20px";

        characters.forEach(character => {
            const characterCard = document.createElement("div");
            characterCard.style.border = "1px solid #ccc";
            characterCard.style.borderRadius = "8px";
            characterCard.style.padding = "10px";
            characterCard.style.textAlign = "center";

            const img = document.createElement("img");
            img.src = character.image;
            img.alt = character.name;
            img.style.width = "100px";
            img.style.height = "100px";
            img.style.borderRadius = "50%";
            img.style.objectFit = "cover";
            img.style.marginBottom = "10px";

            const name = document.createElement("h4");
            name.textContent = character.name;
            name.style.margin = "0";

            characterCard.appendChild(img);
            characterCard.appendChild(name);
            grid.appendChild(characterCard);
        });
        return grid;
    };

    function render() {
        const mainContainer = document.createElement("div");

        // Wrapper de búsqueda
        const searchWrapper = document.createElement("div");
        searchWrapper.style.marginBottom = "20px";

        input = document.createElement("input");
        input.placeholder = "Buscar personaje...";
        input.style.marginRight = "10px";

        resultsContainer = document.createElement("div");

        searchWrapper.appendChild(input);
        mainContainer.appendChild(searchWrapper);
        mainContainer.appendChild(resultsContainer);

        // Eventos
        const debouncedSearch = debounce((query) => search(query), 500);
        input.addEventListener("input", (e) => {
            debouncedSearch(e.target.value);
        });

        return mainContainer;
    }



    return { render };
}