import express from "express" //framework para crear aplicaciones web
import router from "./router"
import cors, { type CorsOptions } from "cors"


const app = express() //creamos una nueva app de Express (nuestro servidor)

app.use(express.json())

/* 
    Desde el frontend sale una peticion. esa peticion llega al server y pasa por express.json()
    express.json() hace que esa peticion sea legible
    El sistema procesa esa peticion con prisma y, ahi decide que hace con esa peticion

        Ejemplo:
        {
            "name": "Lapicera",
            "price": 10
        }
    el middleware express.json() lee el boddy y lo convierte a un objeto javaScript
    Ahora podemos hacer req.body.name y obtener "Lapicera"
*/

// CORS - El frontend viaja hacia el puerto 3000 (que es el backend) y, en el server a traves de cors le abren la puerta al puerto 5173
//Este mecanismo se necesita cuando estamos en desarrollo
// app.use(cors({
//     origin: "http://localhost:5173", // Permitimos que solo este origen pueda hacer pedidos al backend
//     methods: ['GET', 'POST']
// }))

const FRONTEND_URL = process.env.FRONTEND_URL // EJ: "https://mi-app.vercel.app"

const whitelist = [
    "http://localhost:5173", // DESARROLLO - invitado (dev)
    FRONTEND_URL             // PRODUCCION - INVITADO (VERCEL)

].filter(Boolean)        // SI FRONTEND_URL nop esta definido, lo quitamos  

const cosrOptions: CorsOptions = {
    origin(origin, callback) {
        // si no hay origen = no bloquea, habillitadmos pruebas tipo POSTMAN
        if (!origin) {
            return callback(null, true)
        }

        // 2 - si hay origen y esta en la whitelist, PERMITIMOS - El navegador autoriza la llamada del frontend
        if (whitelist.includes(origin)) {
            return callback(null, true)
        }

        // 3. FLEXIBILIDAD PARA VERCEL: Si la URL viene de Vercel y te pertenece, la dejamos pasar
        // Esto valida que empiece con https:// y termine en .vercel.app conteniendo tu identificador
        if (origin.startsWith("https://") && origin.includes("alejandro404") && origin.endsWith(".vercel.app")) {
            return callback(null, true);
        }

        // 4 - en cualquier otro caso bloqueamos
        return callback(new Error("CORS: origen no permitido"))

    },

    credentials: true,
}
// Registramos 
app.use(cors(cosrOptions))
app.options(/.*/, cors(cosrOptions))

app.use('/api/products', router) //le decimos a la app que use el router para las rutas que empiecen con /api/products  

// 404 - "Not found": se ejecuta si ninguna ruta contesta a la peticion  

app.use((req, res, _next) => {
    res.status(404).json({
        error: 'No encontrado - Not found',
        path: req.originalUrl, // ruta que intentaron acceder
        method: req.method // metodo de la peticion (GET, POST, etc...)
    })
})

// ---- Manejador de errores GLOBAL (500 y otros errores) ----
app.use((err: any, req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('Error Handler: ', err)
    const isDev = process.env.NODE_ENV !== 'production' // si no estamos en produccion, mostramos el error completo (stack trace)

    const payload: Record<string, any> = {
        error: 'Internal server error',
        tip: 'Revisa la consola del servidor para mas detalles'
    }

    // si estamos en desarrollo, agregamos mas detalles tecnicos

    if (isDev) {
        payload.details = {
            message: err?.message,
            stack: err?.stack
        }

    }
    // Elegimos el status HTTP:
    const status = typeof err?.status === 'number' ? err.status : 500

    //Enviamos la respuesta JSON al cliente con el status
    res.status(status).json(payload)
})

console.log(process.env.DATABASE_URL)
export default app