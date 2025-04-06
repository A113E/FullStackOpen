// Librería Axios para hacer peticiones HTTP
import axios from 'axios'

// Definimos la URL
const baseUrl = 'http://localhost:3001/anecdotes'

// Request: Obtener anécdotas
export const getAnecdotes = () =>
    axios.get(baseUrl).then(res => res.data) // Hace una petición GET a la URL para obtener las anécdotas
// .then(res => res.data) → Extrae solo la data de la respuesta para que result.data contenga directamente los datos sin necesidad de acceder a result.data.data.

// Request: Crear una anécdota
// request.js
export const createAnecdote = async (newAnecdote) => {
  const response = await axios.post(baseUrl, newAnecdote)
  if (response.status >= 400) {
    throw new Error(response.data.error) // Forzamos el error manualmente
  }
  return response.data
}

// Request: Votar una anécdota
export const voteToAnecdote = voteAnecdote => {
    axios.put(`${baseUrl}/${voteAnecdote.id}`, voteAnecdote).then(res => res.data) // Hace una petición PUT a la URL para actializar la nota con el voto
// .then(res => res.data) → Extrae solo la data de la respuesta para que result.data contenga directamente los datos sin necesidad de acceder a result.data.data.
}