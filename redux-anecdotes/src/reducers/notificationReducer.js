// Reducer para manejar el estado de las notificaciones
// Importamos createSlice desde Redux Toolkit (es un conjunto de estado + reducers + acciones en un solo lugar.)
import { createSlice } from "@reduxjs/toolkit"

// Definimos el estado inicial del notificationReducer
const initialState = ''

// Creamos el slice para las notificaciones
const notificationSlice = createSlice({
    name: 'notification', // Nombre del slice en el estado global (Es una buena práctica dar al parámetro un valor que sea único entre los reducers. )
    initialState, // Definimos el estado inicial anteriormente establecido
    // Definimos las acciones para modificar el estado
    reducers: {
        // Acción para mostrar la notificación
        setNotification(state, action) {
            return action.payload // // Establece el mensaje de la notificación
        },
        // Acción para eliminar la notificación
        clearNotification(state, action) {
            return '' // Vuelve al estado inicial vacío sin notificaciones
        }
    }
})

// Exportamos las acciones
export const { setNotification, clearNotification } = notificationSlice.actions
// Exportamos el reducer
export default notificationSlice.reducer