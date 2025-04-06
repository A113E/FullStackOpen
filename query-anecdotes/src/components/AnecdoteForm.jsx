// Importación de librerías
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../request'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  // Definimos el useQueryClient() que se encargará de actualizar la caché del servidor
  const queryClient = useQueryClient()
  // Accedemos al contexto
  const dispatch = useNotificationDispatch() // Accedemos al segundo elemento del array: para modificar el valor del estado.

  // Declaración de newAnecdoteMutation
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: `Anecdote created: "${newAnecdote.content}"`
      })
      setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), 5000)
    },
    onError: (error) => {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: 'too short anecdote, must have length 5 or more' // Ahora sí recibirá el mensaje del servidor
      })
      setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), 5000)
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate ({ content, votes: 0 })
    console.log('new anecdote')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
