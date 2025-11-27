# Proyecto: Prácticas Básicas de Manipulación del DOM

Este repositorio contiene una serie de ejercicios diseñados para practicar y demostrar conceptos fundamentales de la manipulación del DOM (Document Object Model) utilizando JavaScript.

## Descripción

El objetivo principal de este proyecto es afianzar las habilidades en la creación, modificación y eliminación de elementos HTML de forma dinámica. Cada ejercicio se centra en un caso de uso diferente, como mostrar mensajes, renderizar listas, crear tarjetas de información y más.

El proyecto está configurado para obtener datos de dos maneras:
1.  **Localmente**: Importando datos directamente desde un archivo JavaScript (`src/db/db.js`).
2.  **Fetching**: Realizando peticiones a un servidor local simulado (`json-server`) que sirve los datos desde un archivo JSON (`src/db/db.json`).

## Estructura del Proyecto

```
Basicos_DOM/
├── src/
│   ├── db/
│   │   ├── db.js       # Datos de prueba en formato de módulos JS.
│   │   └── db.json     # Datos para simular una API con json-server.
│   ├── helpers/
│   │   ├── ejercicio1.js # Lógica para el ejercicio 1.
│   │   └── ejercicio2.js # Lógica para el ejercicio 2.
│   └── ...
├── .env.example        # Archivo de ejemplo para variables de entorno.
├── index.html          # Punto de entrada de la aplicación.
└── package.json        # Dependencias y scripts del proyecto.
```

-   **`src/db/db.js`**: Contiene los datos (objetos y arrays) exportados como módulos de JavaScript. Se utiliza para renderizar el contenido sin necesidad de un servidor.
-   **`src/db/db.json`**: Contiene los mismos datos en formato JSON. Está pensado para ser utilizado con `json-server` para simular peticiones a una API REST.
-   **`src/helpers/ejercicioN.js`**: Cada archivo corresponde a un ejercicio. Contiene la lógica para:
    -   Obtener los datos (localmente o mediante `fetch`).
    -   Crear los elementos HTML necesarios.
    -   Asignar contenido y clases.
    -   Devolver el fragmento del DOM listo para ser insertado en la página principal.

## Cómo Empezar

Sigue estos pasos para ejecutar el proyecto en tu máquina local.

### Prerrequisitos

-   Node.js (versión 18 o superior).
-   Un editor de código como Visual Studio Code.

### Instalación y Ejecución

1.  **Clona el repositorio:**
    ```bash
    git clone <URL-DEL-REPOSITORIO>
    cd Basicos_DOM
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Configura las variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto y añade la URL y el puerto para el servidor JSON.
    ```
    VITE_URL=http://localhost
    VITE_PORT=4000
    ```

4.  **Inicia el servidor de desarrollo (Vite):**
    ```bash
    npm run dev
    ```
    Esto iniciará la aplicación en `http://localhost:5173` (o el puerto que indique Vite).

5.  **Inicia el servidor de datos (json-server):**
    En una terminal separada, ejecuta el siguiente comando para servir el archivo `db.json`.
    ```bash
    npx json-server --watch src/db/db.json --port 4000
    ```
    Ahora los endpoints como `http://localhost:4000/bienvenida` estarán disponibles para las funciones `fetching` de los ejercicios.
