// flujo : Frontend => pedido => server => Rutas => controller ( contiene los handlers que son funciones con prisma ) => BD
//importamos los tipos de express para tipar correctamente los parametros del handler
/*
    -Request: lo que llega del cliente (header, body, params , etc...)     
    -Response: lo que le vamos a devolver al cliente (cleinte = Frontend)   
    -NextFuntion: si algo sale mal pasa el error a un manejador global    
 */
import { Request, Response, NextFunction } from "express";

// importamos prisma que es nuestro unico contacto con la base de datos
import { prisma } from "../lib/prisma";

export async function crearProducto(req: Request, res: Response, next: NextFunction) {

    try {
        // 1 - lo que envia el cliente
        // - name => tiene que ser un string y le sacamos espacios a los costados con trim y si no viene nada, le asignamos un string vacio
        const name = String(req.body?.name ?? '').trim()

        // - price => convertimos price a numero, por si vino como String (ej: "10" )
        const price = Number(req.body?.price)

        // 2 - Le pedimos a prisma que cree el registro en la tabla "product" 
        const crear = await prisma.product.create({
            data: { name, price }
        })

        // 3 si salio bien, devolvemos un status 201 (Created) y el JSON del producto nuevo
        res.status(201).json(crear)

    } catch (error) {
        // 4 si algo salio mal, pasamos el error al manejador global de errores
        next(error)
    }
}

export async function listarProductos(_req: Request, res: Response, next: NextFunction) {

    try {
        // 1 - pedimos todos los productos ordenados por ID ascendente
        const items = await prisma.product.findMany({
            orderBy: { id: 'asc' }
        })
        res.json(items)

    } catch (error) {
        next(error)

    }

}
export async function editarProducto(req: Request, res: Response, next: NextFunction) {
    try {
        // 1- validamos el id
        //el id siempre viene como string "api/product/7 "
        const id = Number(req.params.id)

        // ID valido(true) = 7, 2.5 - Id NaN - Infinity (-Infiniti)
        if (!Number.isFinite(id)) {
            return res.status(400).json({ message: "id invalido"}) 
        }

        const {name, price } = req.body as {name?: string; price?: number}

        if (typeof name === "undefined" && typeof price === "undefined") {
            return res.json(400).json ({message: "Nada que actualizar"}) 
        }

        // 2 - actualizamos

        const updated = await prisma.product.update({
            where: { id },       // El id cuyo campos dependientes (name o price) vamos a actualizar
            data: {
                ...(name !== undefined && { name}), // Incluir un "name" solo si vino
                ...(price !== undefined && { price}), // Incluir un "price", solo si vino
            },
        })

        // 3- respuesta de exito
        return res.json(updated)
        
    } catch (error) { 
        next(error) 
    }

}



