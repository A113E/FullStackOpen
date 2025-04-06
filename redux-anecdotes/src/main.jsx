// Importaciones de librerías y módulos
// Importamos React para usar JSX
import React from 'react'
// Se usa para renderizar la apliación
import ReactDOM from 'react-dom/client'
// Importamos el store
import store from './store'
// Importamos el componente Provider que hace que el store de Redux esté disponible en toda la aplicación.
import { Provider } from 'react-redux'
// Importamos el componente principal App, que contiene la interfaz del usuario
import App from './App'



// Renderiza la apliación (Busca el elemento HTML con el id="root" en index.html.)
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)