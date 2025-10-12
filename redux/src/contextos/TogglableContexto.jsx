import { createContext, useContext, useReducer } from 'react';

// Reducer
function togglableReducer(state, action) {
  switch (action.type) {
    case 'CAMBIAR_VISIBILIDAD':
      return { ...state, visibilidad: !state.visibilidad };
    default:
      return state;
  }
}

// Crear contexto
const TogglableContexto = createContext();

// Hook para consumir el contexto
export const useTogglable = () => useContext(TogglableContexto);

// Proveedor
export function TogglableProvider({ children }) {
  const [state, dispatch] = useReducer(togglableReducer, {
    visibilidad: false,
  });

  const cambiarVisibilidad = () => {
    dispatch({ type: 'CAMBIAR_VISIBILIDAD' });
  };

  const valores = {
    visibilidad: state.visibilidad,
    cambiarVisibilidad,
  };

  return (
    <TogglableContexto.Provider value={valores}>
      {children}
    </TogglableContexto.Provider>
  );
}

export default TogglableContexto;
