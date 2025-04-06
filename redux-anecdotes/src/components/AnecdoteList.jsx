// Importamos React para usar JSX
import React from 'react'
// Importa función que representa voto
import { voteAnecdoteAsync } from '../reducers/anecdoteReducer'
// Importa la acción para manejar la notificación
import { setNotificationWithTimeout } from '../actions/notificationAction'
/* Importamos: 
useSelector: Permite acceder al estado global de Redux en un componente.
useDispatch: Se usa para enviar acciones (dispatch) al store de Redux. 
*/
import { useSelector, useDispatch } from 'react-redux'

// Componente presentacional para mostrar una sola anécdota
const Anecdote = ({ anecdote, handleVote }) => {
    // Renderizamos el componente
    return (
        <div>
            {anecdote.content}
            <div>
            has {anecdote.votes}
            <button onClick={handleVote}>vote</button>
            </div>
        </div>
    )
}

// Componente para mostrar la lista de anécdotas
const AnecdoteList = () => {
    // Obtener el dispatch
    const dispatch = useDispatch() // Hook: se usa para enviar acciones al store de Redux. (proporciona acceso a cualquier componente de React a la función dispatch de redux-store definida en main.jsx.)
    // Obtener el estado de las anécdotas y aplicar el filtro de búsqueda
    const anecdotesToShow = useSelector(({ anecdotes, search }) => 
    anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(search.toLowerCase())
    )
    )

      // Manejador de votos
      const handleVote = (anecdote) => {
    dispatch(voteAnecdoteAsync(anecdote.id)) // Despachamos la acción para votar
    dispatch(setNotificationWithTimeout(`You voted for "${anecdote.content}"`, 5)); // Despachamos la acción para mostrar la notificación
  }

    // Renderiza el componente
    return (
        anecdotesToShow.map(anecdote => 
            <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleVote={() => handleVote(anecdote)}
            />
        )
    )
}

export default AnecdoteList