import { proyectos } from "../db/db.js";

console.log("Ejercicio 10 cargado");

export function createEjercicio10() {

    // === 1. Crear el contenedor principal ===
    const container = document.createElement("div");
    container.classList.add("portfolio-container");

    // === 2. Encabezado ===
    const h1 = document.createElement("h1");
    h1.textContent = "💼 Portafolio de Proyectos";
    container.appendChild(h1);

    // === 3. Obtener tecnologías únicas ===
    const tecnologias = new Set();
    proyectos.forEach(p => p.tecnologias.forEach(t => tecnologias.add(t)));

    // === 4. Contenedor de filtros ===
    const filterContainer = document.createElement("div");
    filterContainer.classList.add("filter-buttons");
    container.appendChild(filterContainer);

    const botones = [];

    function crearBoton(nombre) {
        const btn = document.createElement("button");
        btn.textContent = nombre;
        btn.classList.add("filter-btn");
        filterContainer.appendChild(btn);
        botones.push(btn);
        return btn;
    }

    // Botón "Todos"
    const btnTodos = crearBoton("Todos");

    // Botones por tecnología
    tecnologias.forEach(t => crearBoton(t));

    // === 5. Contador ===
    const counter = document.createElement("div");
    counter.classList.add("projects-count");
    container.appendChild(counter);

    // === 6. Grid de proyectos ===
    const grid = document.createElement("div");
    grid.classList.add("projects-grid");
    container.appendChild(grid);

    // === 7. Función para renderizar proyectos ===
    function renderProyectos(lista) {
        grid.innerHTML = "";

        counter.textContent = `Mostrando ${lista.length} proyectos`;

        lista.forEach(element => {
            const card = document.createElement("div");
            card.classList.add("project-card");

            // Badge de destacado
            if (element.destacado) {
                const badge = document.createElement("span");
                badge.classList.add("featured-badge");
                badge.textContent = "⭐";
                card.appendChild(badge);
            }

            // Imagen
            const img = document.createElement("img");
            img.src = element.imagen;
            card.appendChild(img);

            // Contenedor de contenido
            const content = document.createElement("div");
            content.classList.add("project-card-content");

            const titulo = document.createElement("h3");
            titulo.classList.add("project-title");
            titulo.textContent = element.titulo;

            const desc = document.createElement("p");
            desc.classList.add("project-description");
            desc.textContent = element.descripcion;

            const techStack = document.createElement("div");
            techStack.classList.add("tech-stack");

            element.tecnologias.forEach(t => {
                const badge = document.createElement("span");
                badge.classList.add("tech-badge");
                badge.textContent = t;
                techStack.appendChild(badge);
            });

            content.appendChild(titulo);
            content.appendChild(desc);
            content.appendChild(techStack);

            card.appendChild(content);
            grid.appendChild(card);
        });
    }

    // === 8. Event listeners ===
    botones.forEach(btn => {
        btn.addEventListener("click", () => {

            botones.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filtro = btn.textContent;

            if (filtro === "Todos") {
                renderProyectos(proyectos);
            } else {
                const filtrados = proyectos.filter(p => p.tecnologias.includes(filtro));
                renderProyectos(filtrados);
            }
        });
    });

    // === 9. Render inicial ===
    btnTodos.classList.add("active");
    renderProyectos(proyectos);

    // === 10. Devolver componente con .render() ===
    return {
        render() {
            return container;
        }
    };
}


/*
filtrar
buscar
localstorage para la cache
*/
