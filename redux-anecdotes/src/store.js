// Importamos el configureStore que es la manera moderna de store, usando la librería Redux Toolkit
import { configureStore } from '@reduxjs/toolkit'
// Importamos los reducers (anecdoteReducer-searchReducer)
import searchReducer from './reducers/searchReducer'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'


// Creación del store usando Toolkit
const store = configureStore({
  // Definimos los reducers que se manejarán en el estado
  reducer: {
    anecdotes: anecdoteReducer, // Maneja el estado de las anécdotas
    search: searchReducer, // Maneja el estado de la búsqueda
    notification: notificationReducer // Maneja el estado de las notificaciones
  }
})

export default store