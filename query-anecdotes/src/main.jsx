// Importaciones
import ReactDOM from 'react-dom/client' // Renderiza la aplicación en el DOM
// Importamos las librerías QUERY
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
/*
QueryClient: Crea una instancia de React Query para gestionar el almacenamiento en caché y el estado de los datos remotos.
QueryClientProvider: Es un proveedor de *contexto* que permite que toda la aplicación use React Query.
*/

// Importamos el componente principal que contiene toda la estructura de la aplicación
import App from './App'

// Creación del cliente Query
const queryClient = new QueryClient() // Crea una instancia de QueryClient que manejará las consultas a la API (Se encarga de almacenar en caché los datos, gestionar la revalidación automática y optimizar las peticiones.)

// Importamos el context, para envolver tu app y darle acceso al valor y las acciones del contador a todos los componentes hijos.
import { NotificationContextProvider } from './NotificationContext'


// Renderización de la aplicación
ReactDOM.createRoot(document.getElementById('root')).render( // Obtiene el elemento con el id "root" en el archivo index.html. Aquí es donde React montará la aplicación.
  <QueryClientProvider client={queryClient}> {/*Provee la instancia de queryClient a toda la aplicación (PERMITE QUE CUALQUIER COMPONENTE DENTRO DE APP PUEDA USAR USEQUERY Y USEMUTATION).*/}
  <NotificationContextProvider>
    <App/> {/*Todo el código de App y sus componentes hijos pueden acceder a React Query.*/}
    </NotificationContextProvider>
  </QueryClientProvider>
)