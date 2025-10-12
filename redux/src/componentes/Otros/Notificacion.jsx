import { useNotificacion } from '../../contextos/NotificacionContexto';

function Notificacion() {
  // Valores del contexto
  const { mensaje, tipo } = useNotificacion();

  if (!mensaje) return null;

  const estiloNotificacion = {
    color: tipo === 'exito' ? 'green' : 'red',
    background: 'lightgrey',
    fontsize: '20px',
    border: `1px solid ${tipo === 'exito' ? 'green' : 'red'}`,
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  };

  return <div style={estiloNotificacion}>{mensaje}</div>;
}

export default Notificacion;
