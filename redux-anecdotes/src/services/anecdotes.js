// Importamos la librería Axios
import axios from 'axios'

// Definimos la URL del servidor 
const baseUrl = 'http://localhost:3001/anecdotes'

// Servicio para obtener todas las anécdotas del servidor
const getAll = async () => {
    // Realiza una solicitud GET a la URL para obtener todas las anécdotas
    const response = await axios.get(baseUrl)
    // Devuelve una promesa que extrae de la propiedad "Data" de la respuesta del servidor
    return response.data
}

// Servicio para crear una nueva anécdota y enviarla al servidor
const createNew = async (content) => {
    // Creamos un objeto con 2 propiedades
    const object = { content, votes: 0 }
    // Realiza una solicitud POST a la URL para añadir una nueva anécdota al servidor
    const response = await axios.post(baseUrl, object)
    // Devuelve una promesa que extrae de la propiedad "Data" de la respuesta del servidor
    return response.data
}

// Servicio para votar una anécdota y enviarla al servidor
const vote = async (id) => {
    // Primero, obtenemos la anécdota actual
    const anecdoteToUpdate = await axios.get(`${baseUrl}/${id}`);
    const updatedAnecdote = {
      ...anecdoteToUpdate.data,
      votes: anecdoteToUpdate.data.votes + 1, // Incrementamos los votos
    };
  
    // Realiza una solicitud PUT para actualizar la anécdota en el servidor
    const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote);
    return response.data; // Devuelve la anécdota con los votos actualizados
  }
// Exportamos los servicios
export default { getAll, createNew, vote }