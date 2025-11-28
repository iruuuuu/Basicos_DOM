import { Createejercicio1 } from "./helpers/ejercicio1";
import { CreateEjercicio2 } from "./helpers/ejercicio2";
import { CreateEjercicio3 } from "./helpers/ejercicio3";
import { createEjercicio4 } from "./helpers/ejercicio4";
import { ejercicio11 } from "./helpers/ejercicio11";
import { createRickAndMortySearch } from "./helpers/buscadorRickAndMorty.js";
export default function createApp() {
    const appDiv = document.getElementById("app");
    appDiv.appendChild(Createejercicio1().render());
    appDiv.appendChild(CreateEjercicio2().render());
    appDiv.appendChild(CreateEjercicio3().render());
    appDiv.appendChild(createEjercicio4().render());
    appDiv.appendChild(createRickAndMortySearch().render());
    appDiv.appendChild(ejercicio11().render());
    
    


//   return (
//     <div>app</div>
//   )
}

