// Importamos createSlice desde Redux Toolkit (es un conjunto de estado + reducers + acciones en un solo lugar.)
import { createSlice } from "@reduxjs/toolkit"
// Importamos los servicios
import anecdoteService from '../services/anecdotes'


// Creación del slice con createSlice (conjunto de acciones y un reducer asociado.)
const anecdoteSlice = createSlice({
  name: 'anecdotes', // Nombre del slice en el estado global (Es una buena práctica dar al parámetro un valor que sea único entre los reducers. )
  initialState: [], // Estado inicial (vacío) se extrae del archivo db.json
  // Definimos las acciones para modificar el estado
  reducers: {
    // Acción para añadir un voto a una anécdota
voteAnecdote(state, action) {
  const updatedAnecdote = action.payload; // La anécdota actualizada viene del servidor
  // Retorna el estado recorriendo cada anécdota y crea un nuevo array con los cambios hechos
  return state.map(anecdote =>
    // Si el id de la anécdota no coincide con el id de la anécdota actualizada, devuelve la anécdota tal y como está
    anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote // Si coincide, se actualiza el array con la anécdota votada
  ).sort((a, b) => b.votes - a.votes); // Función que ordena las anécdotas por votos de mayor a menor
    },
    // Acción para añadir un objeto de una anécdota
    appendAnecdote(state, action) {
      // Agrega una nueva anécdota al estado
      return [...state, action.payload].sort((a,b) => b.votes - a.votes) // Ordena las anécdotas por votos de mayor a menor
    },
    // Acción para reemplazar el estado de las anécdotas con un array de anécdotas
    setAnecdotes(state, action) {
      // Carga todas las anécdotas desde la base de datos o API
      return action.payload
    }
  }
})

// Exportamos las acciones (PRIMERO)
export const { voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

// Thunk Actions (acciones que devuleven funciones asincrónicas)
// Thunk action, que devuelve una función en vez de una acción regular, permitiendo realizar operaciones asincrónicas
export const initializedAnecdotes = () => {
  // Retorna una función asincrónica que recibe dispatch (para enviar acciones al store y actualizar el estado de la aplicación.) como parámetro
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll() // Hace una petición HTTP para obtener todas las anécdotas del servidor
    // Una vez obtenida las anécdotas se llama dispatch para actualizar las anécdotas
    dispatch(setAnecdotes(anecdotes)) // Recibe las anécdotas como argumento y las guarda en el estado global
  }
} 

// Thunk action, para crear una nueva anécdota y actualizar el estado con la nueva anécdota
export const createAnecdote = content => {
  // Retorna una función asincrónica que recibe dispatch (para enviar acciones al stores y actualizar el estado de la aplicación) como parámetro
  return async dispatch => {
    // Se crea una instancia con la nueva anécdota
    const newAnecdote = await anecdoteService.createNew(content) // Envía una petición HTTP para crear una nueva anécdota en el servidor y devuelve la anécdota creada con ID único
    // Una vez creada la anécdota se llama a dispatch para actualizar el estado con la nueva anécdota
    dispatch(appendAnecdote(newAnecdote)) // Recibe la nueva anécdota como arguemento y la guarda en el estado global (appendAnecdote)
  }
}

// Thunk action para votar una anécdota
export const voteAnecdoteAsync = (id) => {
  return async (dispatch) => {
    try {
      // Llama al servicio para votar la anécdota en el servidor
      const updatedAnecdote = await anecdoteService.vote(id);
      // Despacha la acción para actualizar el estado en Redux con la anécdota actualizada
      dispatch(voteAnecdote(updatedAnecdote));
    } catch (error) {
      console.error('Error voting anecdote:', error);
    }
  };
};


// Exporta el reducer, que se usará en configureStore para gestionar el estado en Redux. (ÚLTIMO)
export default anecdoteSlice.reducer
