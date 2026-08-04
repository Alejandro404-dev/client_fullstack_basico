// funciones del dominio product (GET,POST) traes o enviar informacion a la base de datos siempre pasando por la mediacion del server
import type { FormValues, Product } from "../types";
import { api } from "./client";

// 3 - GET => /api/products => Traemos todos los productos
// - axios => nos devuelve {data,status,headers,... } => nos interesa la data 

export async function listProducts(): Promise<Product[]> {
    const { data } = await api.get<Product[]>('/api/products')
    return data
}

// 4 - POST /api/products => creamos un producto con el body {name, price}
// - el backend responde con el producto creado que incluye un id

export async function createProducts(input: FormValues): Promise<Product> {
    const { data } = await api.post<Product>('/api/products', input)
    return data

}

// 5 - PATCH => esta funcion sirve para editar parcialmente un producto en el servidor

export async function patchProduct(
    id: number,                            // A que producto editar por id
    input: Partial<FormValues>           // que campos cambiamos - pueden ser name, price o ambos
): Promise<Product> {
    const { data } = await api.patch<Product>(`/api/products/${id}`, input)
    return data
}

