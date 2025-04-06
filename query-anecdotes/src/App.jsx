// Importaciones
// Importación de librerías
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
/*
useMutation: Se usa para mutar datos (Crear, actualizar o eliminar recursos em el servidor)
useQuery: Es un hook de React Query que permite hacer peticiones a una API y manejar automáticamente el estado de la consulta (loading, error, data, etc.).
useQueryClient: Para manejar y actualizar la caché de React Query.
*/
// Importación de Componentes
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
// Importación de los Requests
import { getAnecdotes, voteToAnecdote } from './request'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  // Definimos el useQueryClient() que se encargará de actualizar la caché del servidor
  const queryClient = useQueryClient()
  // Accedemos al contexto
  const dispatch = useNotificationDispatch() // Accedemos al segundo elemento del array: para modificar el valor del estado.

  

  // Declaración de voteAnecdoteMutation
  const voteAnecdoteMutation = useMutation({
    mutationFn: voteToAnecdote, // Mutación (actualizar los votos de la anécdota) ** Función encargada de hacer la petición HTTP en request.js
    // Función (CALLBACK) que se ejecuta automaticamente después de que los votos de la anécdota se actualicen con éxito *** SOLO SE ACTIVA SI LA MUTACIÓN NO FALLA
    onSuccess: (voteAnecdote) => { // voteAnecdote es la respuesta del servidor. es decir la anecdota actualizada.  *** El valor del parámetro es el valor devuelto por la función voteToAnecdote, definida en el archivo request.js
      // Obtenemos las notas de la caché
      // Obtenemos las anécdotas de la caché
      const anecdotes = queryClient.getQueryData({ queryKey: ['anecdotes'] }) // Busca en la caché de React Query las anecdotas ya almacenadas. *** Si hay anecdotas previamente cargadas, las obtiene sin necesidad de hacer otra petición al servidor.
      // Reemplazamos la anécdota actualizada en la caché
      const voteAnecdotes = anecdotes.map(anecdote => // Busacamos el id en el array
        anecdote.id === voteAnecdote.id ? voteToAnecdote : anecdote // Verificamos si el id de la anecdota coinicide con el de la anecdota actualizada (voteAnecdote) -- si no es igual deja la anecdota como está
      )
      // ACTUALIZA MANUALMENTE LA CACHÉ DE REACT QUERY
      queryClient.setQueryData({ queryKey: ['anecdotes'] }, voteAnecdotes) // Modifica el array con la anécdota votada
            // Así la UI se actualiza instantaneamente sin necesidad de hacer otra petición al servidor (OPTIMIZACIÓN)
    }
  })
  

  const handleVote = (anecdote) => {
    // Ejecuta la mutación voteAnecdoteMutation
    voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({type: 'SET_NOTIFICATION', payload: `Anecdote: "${anecdote.content}" voted`})
    setTimeout(() => dispatch({type: 'CLEAR_NOTIFICATION'}), 5000)
    console.log('vote')
  }

  // useQuery para obtener todas las anécdotas
  const result = useQuery({
    queryKey: ['anecdotes'], // Clave única para la consulta en la caché de ReactQuery
    queryFn: getAnecdotes,  // Referencia al request getAnecdotes en request.js para hacer la solicitud
    retry: 1, // Se realiza solo un intento de solicitud ** Manejo de Errores
    // Por defecto, React Query vuelve a hacer una solicitud al servidor cada vez que la ventana del navegador vuelve a estar en primer plano (por ejemplo, cuando el usuario cambia de pestaña y regresa).
    refetchOnWindowFocus: false // Se desactiva este comportamiento, evitando recargas innecesarias.
  })

  // Muestra el objeto result en la consola del navegador.
  console.log(JSON.parse(JSON.stringify(result))); // JSON.parse(JSON.stringify(result)) → Se usa para eliminar referencias circulares y ver el objeto de manera más limpia en la consola.

  // Manejo del estado (Evita que el componente intente renderizar datos vacíos)
  if(result.isLoading) { // Verifica si la consulta aún está en proceso.
    return <div>Loading Anecdotes...</div> // Mustra el mensaje mientras la API responde
  }
  if(result.isError) { // Verifica si la consulta falló
    return <div>Anecdote service not available due to problems in server</div> // Muestra un mensaje de error si la API no responde
  }

  // Guardar los datos obtenidos
  const anecdotes = result.data // result.data contiene la información obtenida de la API.

  

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
