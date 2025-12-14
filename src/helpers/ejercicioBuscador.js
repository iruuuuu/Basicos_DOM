import { ubicaciones } from "../db/data.js";

export function createBuscador() {
    //creacion del contenedor de todo 
    const container = document.createElement('div')

    //creacion del encabezado del contenedor
    const encabezado = document.createElement('h1')
    encabezado.textContent= "Buscador de alojamientos"
    container.appendChild(encabezado)

    //creacion de campo para realizar la busqueda
    const input = document.createElement('input')
    input.type="text"
    input.placeholder="Introduzca ubicacion a buscar"
    container.appendChild(input)

    const buttom = document.createElement('button')
    buttom.textContent="Buscar"
    buttom.placeholder="Buscar"
    container.appendChild(buttom)

    //creacion del contenedor (dentro de container) que mostrara los resultados de la busqueda
    const containerResultados = document.createElement('div')
    container.appendChild(containerResultados)

    //creacion de escuchador par el input

    input.addEventListener('input', () => {
        const textoInput = input.value.toLowerCase();
        const resultados = ubicaciones.filter(ubi =>
            ubi.nombre.toLowerCase().includes(textoInput)
        );
        mostrarResultados(resultados);
    });




    //funcion para mostrar los resultados 
function mostrarResultados(lista) {
    // Limpiar resultados anteriores
    containerResultados.innerHTML = "";

    // Si no hay coincidencias
    if (lista.length === 0) {
        containerResultados.textContent = "No se ha encontrado coincidencias";
        return;
    }

    // Mostrar cada resultado
    lista.forEach(element => {
        const item = document.createElement("p");
        item.textContent = element.nombre;
        containerResultados.appendChild(item);
    });
}

    return {
        render(){
            return container
        }
    }
}
