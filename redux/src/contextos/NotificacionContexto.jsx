import { createContext, useContext, useReducer } from 'react';

// Reducer para manejar el estado de la notificación
function notificacionReducer(state, action) {
  switch (action.type) {
    case 'MOSTRAR_MENSAJE':
      return {
        mensaje: action.payload.mensaje,
        tipo: action.payload.tipo,
      };
    case 'LIMPIAR_MENSAJE':
      return { mensaje: '', tipo: '' };
    default:
      return state;
  }
}

// Crear el contexto
const NotificacionContexto = createContext();

// Hook para acceder fácilmente al contexto
export const useNotificacion = () => useContext(NotificacionContexto);

// Proveedor del contexto
export function NotificacionProvider({ children }) {
  const [state, dispatch] = useReducer(notificacionReducer, {
    mensaje: '',
    tipo: '',
  });

  // Mostrar mensaje (puede ser 'exito' o 'error')
  const mostrarMensaje = (mensaje, tipo = 'exito') => {
    dispatch({
      type: 'MOSTRAR_MENSAJE',
      payload: { mensaje, tipo },
    });

    // limpiar automáticamente después de 5 segundos
    setTimeout(() => {
      dispatch({ type: 'LIMPIAR_MENSAJE' });
    }, 5000);
  };

  // Limpiar mensaje manualmente
  const limpiarMensaje = () => {
    dispatch({ type: 'LIMPIAR_MENSAJE' });
  };

  // Valores del contexto
  const valores = {
    mensaje: state.mensaje,
    tipo: state.tipo,
    mostrarMensaje,
    limpiarMensaje,
  };

  return (
    <NotificacionContexto.Provider value={valores}>
      {children}
    </NotificacionContexto.Provider>
  );
}
