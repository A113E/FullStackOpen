// Importamos React para usar JSX
import React from 'react'
// Se usa para renderizar la apliación
import ReactDOM from 'react-dom/client'

// Importa createStore de Redux, que se usa para crear el store.
import { createStore } from 'redux'
// Importamos el reducer
import reducer from './reducer'

// Creación del store
const store = createStore(reducer)

// Componente principal
const App = () => {
  // Funciones para enviar (dispatch) la acción al store
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={ok}>ok</button> 
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok} </div>
      <div>bad {store.getState().bad} </div>
    </div>
  )
}

// Renderiza la apliación
const root = ReactDOM.createRoot(document.getElementById('root'))

// Define una función para renderizar la App (se encarga de actualizar la UI cuando cambia el estado.)
const renderApp = () => {
  root.render(<App />)
}

renderApp() // Renderiza la aplicación la primera vez.
store.subscribe(renderApp) // Vuelve a renderizar la app cada vez que el estado cambia.
