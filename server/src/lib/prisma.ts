//crea y comparte una sola conexion (cliente) a la base de datos, Nos sirve para toda la app.
import { PrismaClient } from "@prisma/client";


//TypeScript: en el objeto global puede existir un prisma
const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined
}

/*
    si ya hay una conexion guardada, la utilizamos 
    si no hay una conexion guardada, creamos una nueva conexion y la guardamos para reutilizarla
*/

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
    // log: ['query', 'error' , 'warm'] //esto es para ver las consultas que se hacen a la base de datos en la consola, solo para desarrollo
})

//en desarrollo guardamos el cliente en global para reusarlo  
if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
}