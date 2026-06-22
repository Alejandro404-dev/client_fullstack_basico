import { NavLink } from "react-router-dom";


export default function Nav() {
  return (
    <nav className=" my-6 " >
      <ul className="flex gap-2" >
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `PX-3 py-2 rounded-xl transition-colors ${isActive
                ? 'bg-slate-200 text-slate-900 hover:bg-slate-300 ' : 'text-red-700 hover:bg-slate-800 hover:text-white '
              }`
            }
          >
            Productos
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/new"
            className={({ isActive }) =>
              `PX-3 py-2 rounded-xl transition-colors ${isActive
                ? 'bg-slate-200 text-slate-900 hover:bg-slate-300 ' : 'text-red-700 hover:bg-slate-800 hover:text-white '
              }`
            }
          >
            Nuevo Producto
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
