import { createContext, useReducer, useContext } from 'react';

function buscarReducer(state, action) {
  switch (action.type) {
    case 'BUSCAR':
      return { ...state, valor: action.payload };
    case 'BUSCAR_POR':
      return { ...state, tipoBusqueda: action.payload };
    default:
      return state;
  }
}

// Contexto para proveer a los componentes hijos
const BuscarContexto = createContext();

export const useBuscar = () => useContext(BuscarContexto);

export function BuscarContextoProvider({ children }) {
  // UseReducer
  const [state, dispatch] = useReducer(buscarReducer, {
    valor: '',
    tipoBusqueda: 'TITULO',
  });

  // Objeto limpio con los valores y acciones del contexto
  const valores = {
    valor: state.valor,
    tipoBusqueda: state.tipoBusqueda,
    buscar: (valor) => dispatch({ type: 'BUSCAR', payload: valor }),
    buscarPor: (tipo) => dispatch({ type: 'BUSCAR_POR', payload: tipo }),
  };

  return (
    <BuscarContexto.Provider value={valores}>
      {children}
    </BuscarContexto.Provider>
  );
}

export default BuscarContexto;
