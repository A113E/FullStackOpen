import { useCampo } from '../../hooks/useCampo';
import { useComentario } from '../../contextos/ComentarioContexto';
import { useNotificacion } from '../../contextos/NotificacionContexto';
import { TextField, Button } from '@mui/material';

function ComentarioForm({ blogId }) {
  // Acceder a los valores del contexto
  const { crearComentario } = useComentario();
  const { mostrarMensaje } = useNotificacion();
  // Campos del formulario
  const comentario = useCampo('text');

  // Instancia para limpiar el formulario
  function limpiarFormulario() {
    comentario.limpiar();
  }

  // Funcion para añadir un nuevo comentario de un objeto
  function añadirComentario(e) {
    e.preventDefault();

    const comentarioObjeto = {
      comentario: comentario.value,
    };

    if (!comentarioObjeto.comentario) {
      console.error('Debes comentar algo');
    }

    crearComentario(comentarioObjeto);
    mostrarMensaje('Comentario agregado correctamente', 'exito');
    console.log('Comentario añadido', comentarioObjeto);
    limpiarFormulario();
  }

  return (
    <div>
      <form onSubmit={añadirComentario}>
        <TextField
          {...comentario.inputProps}
          id="comentario-input"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
        />
        <Button variant="contained" color="primary" type="submit">
          {' '}
          Comentar{' '}
        </Button>
      </form>
    </div>
  );
}

export default ComentarioForm;
