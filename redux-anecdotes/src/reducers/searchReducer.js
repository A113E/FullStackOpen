// Reducer para manejar el estado de filtro de búsqueda
// Importamos createSlice desde Redux Toolkit (es un conjunto de estado + reducers + acciones en un solo lugar.)
import { createSlice } from "@reduxjs/toolkit"

// Definimos el estado inicial (vacío)
const initialState = ''

// Creamos el slice para manejar la búsqueda con createSlice
const searchSlice = createSlice({
    name: 'search', // Nombre del slice en el estado global (Es una buena práctica dar al parámetro un valor que sea único entre los reducers. )
    initialState, // Definimos el estado inicial anteriormente definido
    // Definimos las funciones para modificar el estado
    reducers: {
        searchChange(state, action) {
            return action.payload // Se retorna el nuevo valor de la búsqueda
        }
    }
})

// Exportamos la acción para usarla en la app
export const { searchChange } = searchSlice.actions 
// Exportamos el reducer para que sea usado en el store
export default searchSlice.reducer 