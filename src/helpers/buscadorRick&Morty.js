//crear un buscador de rick y morty dinamico (con cada pulsacion del teclado realizo la busqueda)
// para que atraves de un formulario utilizando el boton de buscar o un enter (ambos validos) me realice la busqueda por el nombre de 
// todas las posibles coincidencis omstrando los resultados en un grids
//utilizar fetch para traer los datos 
//implementar una cache para que atraves de un map guarde las busquedas anteriores.
//Si busco 2 veces la misma palabra , no lo buscara en la api , sino que no que lo traera del map
//https://rickandmortyapi.com/api/character/?name=(nombre de la busqueda)

//busca , filtra, tiene eventos , map , crea elementos dinamicamente , maneja promesas , uso de fetch , uso de localstorage o sessionstorage

const buscarPersonajes = () => {
    const form = document.createElement('form');
    const input = document.createElement('input');
    const button = document.createElement('button');
    const resultsContainer = document.createElement('div');
    const cache = new Map();

    form.appendChild(input);
    form.appendChild(button);
    document.body.appendChild(form);
    document.body.appendChild(resultsContainer);

    button.addEventListener('click', () => {
        const query = input.value.trim().toLowerCase();
        if (cache.has(query)) {
            displayResults(cache.get(query), resultsContainer);
        } else {
            fetch(`https://rickandmortyapi.com/api/character/?name=${query}`)
                .then(response => response.json())
                .then(data => {
                    cache.set(query, data.results);
                    displayResults(data.results, resultsContainer);
                });
        }
    });

    input.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            button.click();
        };
    });
};

const displayResults = (results, container) => {
    container.innerHTML = '';
    results.forEach(character => {
        const charDiv = document.createElement('div');
        charDiv.textContent = character.name;
        container.appendChild(charDiv);
    });
};

buscarPersonajes();






