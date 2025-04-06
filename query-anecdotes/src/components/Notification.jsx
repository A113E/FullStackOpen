import { useNotificationValue } from  '../NotificationContext' // Importamos el custom hook

const Notification = () => {
  // Accedemos al contexto
  const notification = useNotificationValue() // Accedemos solo al primer elemento del array: notification
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }
  
  if (!notification) return null

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
