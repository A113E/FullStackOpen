// Definimos el estado inicial de la apliación
const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

// Definimos la función reducer
const counterReducer = (state = initialState, action) => { // Se define como state la función initialState
  console.log(action) // Imprimimos en la consola cada acción
  switch (action.type) { // Definimos los tipos de acciones con switch-case
    case 'GOOD': // En el caso de que la acción sea GOOD retorna...
      return { ...state, good: state.good + 1 } // Suma 1 al parámetro good
    case 'OK': // En el caso de que la acción sea OK retorna...
      return { ...state, ok: state.ok + 1 } // Suma 1 al parámetro ok
    case 'BAD': // En el caso de que la acción sea BAD retorna...
      return { ...state, bad: state.bad + 1 } // Suma 1 al parámetro bad
    case 'ZERO': // En el caso de que la acción sea ZERO retorna...
      return initialState // Al estado inicial
    default: return state // Returna el estado por defecto
  }
  
}

// Exportamos el reducer
export default counterReducer
