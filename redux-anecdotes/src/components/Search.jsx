// Importamos react para usar JSX
import React from 'react'
// Importamos la función searchChange dentro del reducer searchReducer para manejar el filtro de búsqueda
import { searchChange } from '../reducers/searchReducer'
// Importamos: useDispatch: Se usa para enviar acciones (dispatch) al store de Redux.
import { useDispatch } from 'react-redux'

// Definimos el componente Search
const Search = () => {
    // Hook useDispatch para obtener la función dispatch
    const dispatch = useDispatch() // es necesario para enviar la acción searchChange al store y actualizar el estado global

    // Creamos un controlador de eventos para manejar el filtro de búsqueda
    const handleSearch = (event) => {
        event.preventDefault() // Evita que se recargue la página

        // Llamamos a la acción dispatch
        dispatch(searchChange(event.target.value)) // Actualiza el filtro en el store
    }

    // Renderizamos el componente
    return (
        <div>
            Filter: <input onChange={handleSearch} />
        </div>
    )
}

// Exportamos el componente 
export default Search