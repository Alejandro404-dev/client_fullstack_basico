import { Router } from "express"
import { crearProducto, editarProducto, listarProductos } from "../controllers/productController"
import { validateBody } from "../middleware/validate"
import { ProductCreateSchema, ProductPatchSchema } from "../validators/product.schema"

const router = Router()

//Rutas

//para obtener datos de la base de datos
router.get('/', listarProductos)

//para enviar datos a la base de datos
router.post('/', validateBody(ProductCreateSchema), crearProducto)

// para editar datos de la base de datos
router.patch('/:id', validateBody(ProductPatchSchema), editarProducto)

//para elimiar datos de la base de datos
router.delete('/', (req, res) => {
    res.json("Desde DELETE")
})

export default router