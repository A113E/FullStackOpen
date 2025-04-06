// Importamos: useSelector: Permite acceder al estado global de Redux en un componente.
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification) // Tomamos el estado de las notificaciones desde Redux
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    position: 'fixed', // Esto asegura que se vea en la parte superior
    top: 10,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000,
  }


  return notification ? (
    <div style={style}>
      {notification}
    </div>
  ) : null
}

export default Notification