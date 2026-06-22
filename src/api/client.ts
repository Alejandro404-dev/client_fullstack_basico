// se encarga del transporte de datos y los errores de la API cominucacion entre el frontend y el backend
// 1 - importamos axios, la libreria que hace las llamadas http
import axios from "axios";

//2 - Instancia api con cofiguracion general
// baseURL => la ruta del server
// headers => avisamos que enviaremos un json
// timeout => si el server no responde en 8000ms === 8s, abortamos y evitamos colgar la UI
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE as string,
    headers: { 'content-Type': 'application/json' },
    timeout: 8000
})

// 3 - Interceptor de respuesta
api.interceptors.response.use(
    // 3.1 - Respuesta exitosa, la dejamos pasar sin tocarla
    (res) => res,

    // 3.2 - Respuesta con error => transformamos la respues de error en un Error "amigable"
    (error) => {
        // axios nos da acceso a "response" => tenemos el status y el body  (data) del server
        const status = error.response?.status    // el status puede ser 400,404, 500...
        const data = error.response?.data        // lo que devuelve el bakend en el body

        // intentamos sacar un texto que nos explique o que nos diga el error
        /*
        lo que puede mandar el back: 
            { message: "..."} => usamos ese message 
            {errors: [...] } => por ejemplo, validaciones => lo convertimos en un string que se pueda leer  
            si no hay nada, usamos error.message (generico)         
        */
        const mensaje =
            data?.message ?? // si hay un message, lo usamos
            (data?.errors ? JSON.stringify(data.errors, null, 2) : error.message) // si hay un error, lo convertimos a string, sino usamos el mensaje generico de error
        return Promise.reject(new Error(`HTTP ${status ?? '??'} - ${mensaje}`))
    }
)