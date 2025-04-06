// Importamos las funciones del reducer
import { setNotification, clearNotification } from '../reducers/notificationReducer';

// Crea una acción que muestra una notificación y la elimina después de un timeout
export const setNotificationWithTimeout = (message, timeoutInSeconds) => {
  return async (dispatch) => {
    // 1. Despachamos la acción para mostrar la notificación
    dispatch(setNotification(message));

    // 2. Después de cierto tiempo, despachamos la acción para eliminar la notificación
    setTimeout(() => {
      dispatch(clearNotification()); // Elimina la notificación después del timeout
    }, timeoutInSeconds * 1000); // Convertimos segundos a milisegundos
  };
};