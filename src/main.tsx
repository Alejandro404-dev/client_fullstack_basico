import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from './pages/NotFound.tsx'
import ProductsList from './pages/ProductsList.tsx'
import ProductNew from './pages/ProductNew.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'



// Arbol de rutas
const router = createBrowserRouter([
  {
    path: '/',                                // URL base
    element: <App />,                          // layout (titulo, navbar, <outlet/>)     
    errorElement: <NotFound />,                // 404 del front si no se encuentra la pagina o no hay match con las rutas  
    children: [
      { index: true, element: <ProductsList /> },        // "/"  =>  (pagina principal)
      { path: 'new', element: <ProductNew /> },        // "/new" =>  (pagina de formulario)
    ]
  }
])

// importamos TanStack Query=> se encarga de manejar el estado de las peticiones HTTP, cache, reintentos, etc. para que no tengamos que hacerlo manualmente con useState y useEffect cada vez que queramos hacer una peticion HTTP.
// Creamos la instancia que administrara el cache, reintentos, etc
const queryClient = new QueryClient

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
