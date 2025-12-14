//ceelor un buscador de rick y morty dinamico (con cada pulsacion del teclado realizo la busqueda)
// para que atraves de un formulario utilizando el boton de buscar o un enter (ambos validos) me realice la busqueda por el nombre de 
// todas las posibles coincidencis omstrando los resultados en un grids
//utilizar fetch para traer los datos 
//implementar una cache para que atraves de un map guarde las busquedas anteriores.
//Si busco 2 veces la misma palabra , no lo buscara en la api , sino que no que lo traera del map
//https://rickandmortyapi.com/api/character/?name=(nombre de la busqueda)

//busca , filtra, tiene eventos , map , crea elementos dinamicamente , maneja promesas , uso de fetch , uso de localstorage o sessionstorage
export function createRickAndMortySearch() {
    const cache = new Map();

    // Render del grid de personajes
    function renderGrid(characters) {
        // Crear el contenedor del grid
        const container = document.createElement("div");
        container.classList.add("characters-grid");
        container.style.display = "grid";
        container.style.gridTemplateColumns = "repeat(auto-fill, minmax(150px, 1fr))";
        container.style.gap = "10px";
        // Rellenar el grid con los personajes
        characters.forEach(char => {
            // Crear la tarjeta del personaje
            const charDiv = document.createElement("div");
            charDiv.style.border = "1px solid #ccc";
            charDiv.style.borderRadius = "8px";
            charDiv.style.textAlign = "center";
            charDiv.style.padding = "10px";
            // Rellenar la tarjeta con los datos del personaje
            charDiv.innerHTML = `
                <img src="${char.image}" alt="${char.name}" style="width:100%; border-radius:8px;">
                <h4>${char.name}</h4>
                <p>Status: ${char.status}</p>
                <p>Species: ${char.species}</p>
            `;
            // Añadir la tarjeta al contenedor del grid
            container.appendChild(charDiv);
        });
        return container;
    }

    // Función para buscar personajes (async + cache)
    async function fetchCharacters(query) {
        // Si la query está vacía, devolver un array vacío
        if (!query) return [];
        if (cache.has(query)) {
            return cache.get(query);
        }

        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${query}`);
            if (!response.ok) throw new Error("No se encontraron personajes");
            const data = await response.json();
            cache.set(query, data.results);
            return data.results;
        } catch (err) {
            return { error: err.message };
        }
    }

    // Render principal
    function render() {
        const mainContainer = document.createElement("div");

        // Wrapper de búsqueda
        const searchWrapper = document.createElement("div");
        searchWrapper.style.marginBottom = "20px";

        const input = document.createElement("input");
        input.placeholder = "Buscar personaje...";
        input.style.marginRight = "10px";

        const button = document.createElement("button");
        button.textContent = "Buscar";

        const resultsContainer = document.createElement("div");

        searchWrapper.appendChild(input);
        searchWrapper.appendChild(button);
        mainContainer.appendChild(searchWrapper);
        mainContainer.appendChild(resultsContainer);

        // Función para buscar y mostrar resultados
        const searchAndRender = async () => {
            const query = input.value.trim().toLowerCase();
            resultsContainer.innerHTML = "Cargando...";
            const results = await fetchCharacters(query);

            resultsContainer.innerHTML = "";
            if (!results || results.error) {
                resultsContainer.innerHTML = `<p>${results?.error || "No se encontraron resultados"}</p>`;
            } else {
                resultsContainer.appendChild(renderGrid(results));
            }
        };

        // Eventos
        input.addEventListener("input", searchAndRender);
        button.addEventListener("click", searchAndRender);
        input.addEventListener("keyup", (e) => {
            if (e.key === "Enter") searchAndRender();
        });

        return mainContainer;
    }

    return { render };
}
