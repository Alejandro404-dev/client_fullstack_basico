// funciones del dominio product (GET,POST) traes o enviar informacion a la base de datos siempre pasando por la mediacion del server
import { api } from "./client";

// 1 - tipo de datos que el server (backend) nos va a devolver en el listado y tambien al crear

export type Product = { id: number; name: string; price: number; }

// 2 - tipo de datos que el frontend envia cuando crea un producto

export type ProductInput = { name: string; price: number }

// 3 - GET => /api/products => Traemos todos los productos
// - axios => nos devuelve {data,status,headers,... } => nos interesa la data 

export async function listProducts(): Promise<Product[]> {
    const { data } = await api.get<Product[]>('/api/products')
    return data
}

// 4 - POST /api/products => creamos un producto con el body {name, price}
// - el backend responde con el producto creado que incluye un id

export async function createProducts(input: ProductInput): Promise<Product> {
    const { data } = await api.post<Product>('/api/products', input)
    return data

}