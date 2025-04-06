// Importamos las librerías y módulos
// Importamos React para usar JSX
import React from 'react'
// Importamos la función que representa la acción de crear Anécdota
import { createAnecdote } from '../reducers/anecdoteReducer'
// Importamos useDispatch para enviar acciones al store
import { useDispatch } from 'react-redux'
// Importamos la acción para manejar la notificación
import { setNotificationWithTimeout } from '../actions/notificationAction';


// Componente para Formulario de agregar anécdotas
const AnecdoteForm = () => {
    // Obtener el dipatch
    const dispatch = useDispatch() // Hook: se usa para enviar acciones al store de Redux. (proporciona acceso a cualquier componente de React a la función dispatch de redux-store definida en main.jsx.)

      // Función para dispatch acción de crear una anécdota
  const addAnecdote = async (event) => {
    event.preventDefault() // Evita que el formulario recargue la página al enviarlo
    // Obtiene el texto de la anécdota ingresada en el input
    const content = event.target.anecdote.value
    // Limpia el campo de entrada luego de enviar el contenido
    event.target.anecdote.value = ''
    // Envía (dispatch) la acción para agregar la nueva anécdota al estado global de la aplicación
    dispatch(createAnecdote(content))
     // Muestra una notificación
     dispatch(setNotificationWithTimeout(`You created a new anecdote: "${content}"`, 5))
  }

  // Renderizamos el componente
  return (
    <div>
    <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
      </div>
  )
}

// Exportamos el componente 
export default AnecdoteForm