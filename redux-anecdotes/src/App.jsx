// Importación de librerías y módulos
// Importamos Hook de React que ejecuta efectos secundarios cuando un componente se monta o cambia
import { useEffect } from 'react'
// Importamos react para usar JSX
import React from 'react'
// Importamos el componente que muestra la lista de Anécdotas
import AnecdoteList from './components/AnecdoteList'
// Importamos el componente que maneja la creación de anécdotas
import AnecdoteForm from './components/AnecdoteForm'
// Importamos el componente que maneja la búsqueda de anécdotas
import Search from './components/Search'
// Importamos el componente que maneja las notificaciones
import Notification from './components/Notification'
// Importamos la acción de Redux que establece el estado inicial de las anécdotas
import { initializedAnecdotes } from './reducers/anecdoteReducer'
// Importamos Hook de React-Redux para enviar acciones al store de Redux
import { useDispatch } from 'react-redux'


const App = () => {

 // Obtención del dispatch de Redux
 const dispatch = useDispatch() // Almacena dispatch en una variable, para poder usarlo en la función de useEffect.
 
 // Definimos el useEffect para cargar las anécdotas desde el inicio
  useEffect(() => {
   // Se llama a dispatch lo que ejecuta la acción asincrónica (interna) initialize
   dispatch(initializedAnecdotes())
  }, []) // El array de dependencias ([]) indica que este efecto se ejecuta solo una vez, justo después de que el componente App se monte por primera vez.
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Search />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App