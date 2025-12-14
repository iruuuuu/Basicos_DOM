// 1. Importar ubicaciones desde data.js 
import { ubicaciones } from '../db/db.js';

export function createEjercicio5() {
    // 3. Crear contenedor principal y encabezado <h1>
    const container = document.createElement('div');
    const encabezado = document.createElement('h1');
    encabezado.textContent = "Reserva de alojamiento";
    container.appendChild(encabezado);

    // 4. Crear <div> para mensajes (vacío al inicio)
    const mensajesContainer = document.createElement('div');
    mensajesContainer.classList.add("message-container");
    container.appendChild(mensajesContainer);

    // 5. Crear <form>
    const formulario = document.createElement('form');
    formulario.classList.add("form-group");

    // Inputs de fechas (check-in y check-out)
    const inputCheckIn = document.createElement('input');
    inputCheckIn.type = "date";
    inputCheckIn.classList.add("input");
    inputCheckIn.placeholder = "Check-in";

    const inputCheckOut = document.createElement('input');
    inputCheckOut.type = "date";
    inputCheckOut.classList.add("input");
    inputCheckOut.placeholder = "Check-out";

    // 8. Crear <select> dinámicamente y llenar con ubicaciones
    const select = document.createElement("select");
    ubicaciones.forEach(element => {
        const option = document.createElement("option");
        option.value = element.nombre;
        option.textContent = element.nombre; // texto visible
        select.appendChild(option);
    });

    // Botón de enviar
    const submitBtn = document.createElement('button');
    submitBtn.type = "submit";
    submitBtn.textContent = "Reservar";

    // Agregar todos los elementos al formulario
    formulario.appendChild(inputCheckIn);
    formulario.appendChild(inputCheckOut);
    formulario.appendChild(select);
    formulario.appendChild(submitBtn);

    container.appendChild(formulario);

    // 6. Agregar event listener 'submit' al form
    //el event listener sirve para detectar el envio del formulario
    // le aplicamos al formulario el metodo .addEventListener que recibe dos argumentos
    // primero el submit/enviar del formulario y luego la funcion que se va a ejecutar
    // event la declaramos como parametro de la funcion 
    // a event se le aplica el metodo .preventDefautl() que viene siendo para evitar el comportamiento por defecto
    formulario.addEventListener("submit", (event) => {
        event.preventDefault();
        // creamos variables que tomen  de valor la fecha de checkin , la fecha del checkout y el sitio/ubicacion seleccionada
        const checkInValue = inputCheckIn.value;
        const checkOutValue = inputCheckOut.value;
        const ubicacionValue = select.value;

        // Validar que no estén vacíos
        if (!checkInValue || !checkOutValue || !ubicacionValue) {
            mensajesContainer.textContent = "Por favor completa todos los campos";
            mensajesContainer.style.color = "red";
            return;
        }

        // Validar que check-out > check-in
        const fechaCheckIn = new Date(checkInValue);
        const fechaCheckOut = new Date(checkOutValue);
        if (fechaCheckOut <= fechaCheckIn) {
            mensajesContainer.textContent = "Check-out debe ser mayor a Check-in";
            mensajesContainer.style.color = "red";
            return;
        }

        // Mostrar mensaje de éxito
        mensajesContainer.textContent = `Reserva realizada en ${ubicacionValue}`;
        mensajesContainer.style.color = "green";
    });

    return {
        render(){
            return container
        }
    }
}
