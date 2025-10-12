import { useComentario } from '../../contextos/ComentarioContexto';
import { useNotificacion } from '../../contextos/NotificacionContexto';

function Comentario({ comentario, usuario }) {
  // Acceder a los valores del contexto
  const { likeComentario, eliminarComentario } = useComentario();
  const { mostrarMensaje } = useNotificacion();
  // Funcion para determinar quien creo el comentario
  const creadorComentario = comentario.usuario
    ? comentario.usuario.nombre_usuario
    : 'Anonimo';

  // Funcion para manejar los likes de un comentario
  function handleLikeComentario() {
    likeComentario(comentario);
    mostrarMensaje('Like agregado correctamente', 'exito');
    console.log('Like agregado correctamente');
  }

  // Funcion para mostrar el boton de eliminar solo al creador
  const puedeEliminarComentario =
    comentario.usuario &&
    usuario &&
    (comentario.usuario.id === usuario.id ||
      comentario.usuario._id === usuario.id);

  // Funcion para manejar a eliminacion de un comentario
  function handleEliminarComentario() {
    eliminarComentario(comentario);
    mostrarMensaje('Comentario eliminado correctamente', 'exito');
    console.log('Comentario eliminado correctamente');
  }

  return (
    <div>
      <div>
        <h3> {creadorComentario} </h3>
        <p> {comentario.comentario} </p>
        <p> {comentario.likes} likes </p>
      </div>
      <div>
        <button onClick={handleLikeComentario}> Like </button>
        {puedeEliminarComentario && (
          <button onClick={handleEliminarComentario}> Eliminar </button>
        )}
      </div>
    </div>
  );
}

export default Comentario;
