import { Link } from "react-router-dom";


export default function NotFound() {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center " >
            <h2 className="text-2xl font-bold text-slate-900 " >Pagina no encontrada</h2>
            <p className="text-red-700 font-bold mt-1 " >La ruta que buscas no existe.</p>
            <Link
                to="/"
                className="inline-block mt-4 px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover: bg-slate-100 "
            >
                Volver al listado de productos!
            </Link>



        </div>
    )
}
