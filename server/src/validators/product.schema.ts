import { minLength, minValue, number, object, optional, pipe, string } from "valibot";
// Esquema para Crear
export const ProductCreateSchema = object({
    name: pipe(
        string('name debe ser Texto'),
        minLength(1, 'name es requerido')
    ),
    price: pipe(
        number('price debe ser un numero'),
        minValue(0.01, 'price debe ser > 0')
    )
})

// Esquema para editar - PATCH - Actualizacion Parcial
// Los dos campos (name, price) son opcionales
// Si llegan los campos, entonces se validad igual que create
// si no llega ningun campo , el controlador nos devolvera 400
export const ProductPatchSchema = object({
    name: optional(
        pipe(
            string('name debe ser Texto'),
            minLength(1, 'name es requerido')
        )
    ),
    price: optional(
        pipe(
            number('price debe ser un numero'),
            minValue(0.01, 'price debe ser > 0')
        )
    )
}) 