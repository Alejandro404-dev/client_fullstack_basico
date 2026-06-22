import { Outlet } from "react-router-dom"
import Nav from "./components/Nav"


function App() {


  return (

    <div className=" max-w-5xl mx-auto px-4 py-8" >
      <h1 className="text-3xl font-bold text-slate-900  text-center" >Productos</h1>
      <p className=" text-slate-600 mt-1 text-center" > PROYECTO = Frontend - server - prisma -BD</p>
      <Nav/>
      <Outlet /> {/* Renderizamos la pagina segun la ruta */}
    </div>

  )
}

export default App
