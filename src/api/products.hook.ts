// useQuery sirve para el GET lo que vamos a usar en /api/product
// useMutation sirve para el POST lo que vamos a usar en /api/product
// useQueryClient esto es para hablar con la cache (memoria)

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listProducts, type Product, createProducts, type ProductInput } from "./products";

// cuando un usuario entra por primera vez a la lista de producto. nuestra aplicacion busca el backend la lista de producto y aparece la lista, y cuando entra varias veces directamente pasa por cache
// pasa primero por cache si no hay nada pasa directamente a lista de producto 

// hook para listar los productos
export function useProducts() {
    return useQuery<Product[]>({
        // querykey es nuestro cache de la lista y elegimos de nombre 'product'
        queryKey: ['products'],
        // Funcion que llame al backend con GET /api/products
        queryFn: listProducts,

    })
}

// hook para crear los productos
export function useCreateProduct() {
    //control para hablar con el cache
    const queryClient = useQueryClient();

    return useMutation<
        Product,             //lo que devuelve el backend (el producto creado)
        Error,              //El tipo de error ( usamos Error para mostrar .message)
        ProductInput       //Lo que pasamos a mutate ({name, price})
    >({
        //se ejecuta cuando llamo: mutate({name, price})
        mutationFn: (input: ProductInput) => createProducts(input),

        // si el POST fue exitoso

        onSuccess: () => {
            // - querykey => identifica la cache del listado
            //- invalidate lo que hace es marcar como desactualizado el cache
            //- si productlist ya tiene una lista hecha, entonces hace REFETCH y actualiza la lista
            //- si no hay ninguna lista hecha, entonces hace REFETCH cuando vuelva al listar
            queryClient.invalidateQueries({ queryKey: ['products']})
        }
    })
}