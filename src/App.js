import { Createejercicio1 } from "./helpers/ejercicio1";
import { CreateEjercicio2 } from "./helpers/ejercicio2";

export default function createApp() {
    const appDiv = document.getElementById("app");
    appDiv.appendChild(  CreateEjercicio2().render());

    


//   return (
//     <div>app</div>
//   )
}

