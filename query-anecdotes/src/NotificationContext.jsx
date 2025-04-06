// Componente que llama a un Contexto en React * Para compartir datos o estados entre varios componentes sin tener que pasar props manualmente de uno a otro (lo que se llama "prop drilling").
import { createContext, useReducer, useContext } from 'react'
/* Importamos:
-createContext: Para crear un contexto que puedes compartir en tu árbol de componentes.
-useReducer: Un hook que funciona como un mini Redux, útil para manejar estados más complejos o con lógica de acciones.
-useContext es un hook de React que te permite acceder al valor de un contexto en cualquier componente de tu árbol de componentes. Con esto puedes "leer" el estado global proporcionado por tu CounterContext sin necesidad de pasar props a través de los componentes.
*/

// Creación del contexto
const NotificationContext = createContext()
/*
CounterContext es un objeto de contexto que contiene 2 partes principales:
CounterContext.Provider: el componente que provee el dato.
CounterContext.Consumer: el componente que consume el dato (aunque en práctica se usa más useContext para consumir).
*/

// Definimos la función reductora
const notificationReducer = (state, action) => {
    // Manejamos los casos de acciones
    switch (action.type) {
        case 'SET_NOTIFICATION': // Mostrar la notificación
        return action.payload // Retorna la acción en payload
        case 'CLEAR_NOTIFICATION': // Limpiar la notificación
        return null // Retorna el estado vacío
        default: 
        return state // Si la acción no es reconocida, no cambia el estado
    }
}

// Definimos el componente proveedor, que envuelve la aplicación para que los componentes hijos puedan acceder al contexto.
export const NotificationContextProvider = (props) => {
    // Inicializa el hook de useReducer
    const [notification, dispatch] = useReducer(notificationReducer, null) // Invocamos al hook useReducer ** notificationReducer: función que permite cambiar el estado --- ** null: estado inicial vacío

    return(
        <NotificationContext.Provider value={[ notification, dispatch ]}>
            {props.children} {/*son los componentes que envuelvas con CounterContextProvider, que ahora tendrán acceso al contexto.*/}
        </NotificationContext.Provider>
    )
}

// Función auxiliar (custom hook) para simplificar el acceso al contexto
export const useNotificationValue = () => {
    // Obtenemos los valores dentro del contexto
    const notificationAndDispatch = useContext(NotificationContext)
     // Devuelve el primer elemento(notification)
     return notificationAndDispatch[0]
}

// Función auxiliar (custom hook) para simplificar el acceso al contexto
export const useNotificationDispatch = () => {
    // Obtenemos los valores dentro del contexto
    const notificationAndDispatch = useContext(NotificationContext)
     // Devuelve el segundo elemento del array, que es la función para disparar las acciones(SET_NOTIFICATION y CLEAR_NOTIFICATION)
     return notificationAndDispatch[1]
}

export default NotificationContext