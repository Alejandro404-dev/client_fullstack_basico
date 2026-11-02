import { useState } from "react";
import { usePatchProduct, useProducts } from "../api/products.hook";
import EditProductModal from "../components/EditProductModal";
import type { Product } from "../types";

export default function ProductsList() {

    const { data, isLoading, isError } = useProducts()

    const patch = usePatchProduct()

    // Estado de la interface (UI) para el modal de editar producto
    const [editOpen, setEditOpen] = useState(false)

    const [editarProducto, setEditarProducto] = useState<Product | null>(null)

    // si esta buscando en la BD - Utilizamos isLoading para mostrar cargando...
    if (isLoading) { return <p className="text-slate-600  " >Cargando...</p> }

    // si hay error, mandamos un mensaje de error 
    if (isError) { return (<div className="bg-amber-100 border border-amber-300 text-amber-900 p-3 rounded-xl " >Error</div>) }

    // Si no hay data o la cantidad de caracteres es igual a 0, mandamos un mensaje
    if (!data || data.length === 0) { return <p className="text-slate-600 " >Sin productos aun</p> }

    const abrirModalEditor = (producto: Product) => {
        setEditarProducto(producto)
        setEditOpen(true)
    }

    // Recibimos los datos del modal
    const submitEdit = (changes: Partial<Pick<Product, "name" | "price">>) => {
        if (!editarProducto) return
        patch.mutate(
            { id: editarProducto.id, data: changes },
            {
                onSuccess: () => {
                    setEditOpen(false)
                    setEditarProducto(null)
                }
            }
        )
    }
    // mientras se hace el pacht, marcamos "ocupado"
    const busy = patch.isPending

    // si hay datos, renderizamos la tabla
    return (
        <section className="bg-white border border-slate-200 rounded-2xl p-4 text-center " >
            <h2 className="text-xl font-semibold text-slate-900 mb-3 ">Listado</h2>



            <div className="overflow-x-auto " >
                <table className="min-w-full border-collapse ">
                    <thead >
                        <tr className="bg-slate-100 ">
                            <th className="text-left p-2">ID</th>
                            <th className="text-left p-2">Nombre</th>
                            <th className="text-left p-2">Precio</th>
                            <th className="text-left p-2">Acciones</th>
                        </tr>
                    </thead>

                    <tbody className="text-left ">
                        {data.map((producto) => (
                            <tr
                                key={producto.id}
                                className="border-t border-slate-200"
                            >

                                <td className="p-2">{producto.id}</td>
                                <td className="p-2">{producto.name}</td>
                                <td className="p-2">${producto.price.toFixed(2)}</td>
                                <td className="p-2 py-2 flex gap-2 ">
                                    <button
                                        onClick={() => abrirModalEditor(producto)}
                                        className="px-3 py-1 rounded-lg bg-amber-500/90 hover:bg-amber-500 text-black disabled:opacity-60 cursor-pointer "
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className="px-3 py-1 rounded-lg bg-red-600/90 hover:bg-red-500 text-white disabled:opacity-60 cursor-pointer ">
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {editarProducto && (<EditProductModal
                open={editOpen}
                product={editarProducto}
                onCancel={() => { setEditOpen(false); setEditarProducto(null) }}
                onSubmit={submitEdit}
                busy={busy}
            />
            )}
        </section>
    )
}
