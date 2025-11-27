
const fetching = async (endpoint) => {
    //variables de entorno 
    const PORT =  import.meta.env.VITE_PORT || 1492;
    const URL= import.meta.env.VITE_URL||"http://localhost";
    const URL_PORT = `${URL}:${PORT}`;

    try {
        const response = await fetch(`${URL_PORT}/${endpoint}`);
        if (!response.ok) {
            throw new Error("No se ha podido cargar el json");
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.log("Error:" ,err)
        throw err;
    }
};


export { fetching };