import { useProducts } from "../api/products.hook";

export default function ProductsList() {

    const { data, isLoading, isError } = useProducts()

    // si esta buscando en la BD - Utilizamos isLoading para mostrar cargando...
    if (isLoading) {
        return <p className="text-slate-600  " >Cargando...</p>
    }
    // si hay error, mandamos un mensaje de error 
    if (isError) {
        return (
            <div className="bg-amber-100 border border-amber-300 text-amber-900 p-3 rounded-xl " >
                Error
            </div>
        )
    }
    // Si no hay data o la cantidad de caracteres es igual a 0, mandamos un mensaje
    if (!data || data.length === 0) {
        return <p className="text-slate-600 " >Sin productos aun</p>

    }

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

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
