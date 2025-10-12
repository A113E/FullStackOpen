import { useNavigate } from 'react-router-dom';
import { useCampo } from '../../hooks/useCampo';
import { eliminarComentariosBlog } from '../../helpers/helpers';
import { useBlogs } from '../../contextos/BlogsContexto';
import { useNotificacion } from '../../contextos/NotificacionContexto';
import { TextField, Button } from '@mui/material';

function BlogForm() {
  const navigate = useNavigate(); // Redireccionamiento dinamico

  // Mutacion del contexto
  const { blogs, crearBlog, actualizarBlog } = useBlogs();
  const { mostrarMensaje } = useNotificacion();

  // Campos del formulario
  const titulo = useCampo('text');
  const autor = useCampo('text');
  const url = useCampo('text');

  // Función para limpiar los campos del formulario
  function limpiarFormulario() {
    titulo.limpiar();
    autor.limpiar();
    url.limpiar();
  }

  // Función para añadir un nuevo blog
  function añadirBlog(e) {
    e.preventDefault();

    // Crear objeto de blog
    const blogObjeto = {
      titulo: titulo.value,
      autor: autor.value,
      url: url.value,
    };

    // Validaciones
    if (!blogObjeto.titulo) {
      console.error('Titulo es requerido', error);
      return;
    }
    if (!blogObjeto.autor) {
      console.error('Autor es requerido', error);
      return;
    }
    if (!blogObjeto.url) {
      console.error('Url es requerido', error);
      return;
    }

    // Verificar si existe un blog con ese titulo
    const blogExistente = blogs.find(
      (blog) => blog.titulo === blogObjeto.titulo
    );

    if (blogExistente) {
      const confirmar = window.confirm(
        `Ya existe un blog con ese titulo "${blogObjeto.titulo}". ¿Desea reemplazarlo?`
      );
      if (confirmar) {
        eliminarComentariosBlog(blogExistente.id); // Elimina los comentarios que tenia ese blog
        actualizarBlog({
          id: blogExistente.id,
          blogObjeto,
        });
        mostrarMensaje('Blog Actualizado correctamente', 'exito');
        console.log('Blog Actualizado', blogObjeto);
      }
    } else {
      crearBlog(blogObjeto);
      mostrarMensaje('Blog agregado correctamente', 'exito');
      console.log('Blog agregado', blogObjeto);
    }
    limpiarFormulario();
    navigate('/blogs');
  }

  return (
    <div>
      <h2> Añadir Blog </h2>
      <form onSubmit={añadirBlog}>
        <div>
          Título:
          <TextField {...titulo.inputProps} id="titulo-input" />
        </div>
        <div>
          Autor:
          <TextField {...autor.inputProps} id="autor-input" />
        </div>
        <div>
          URL:
          <TextField {...url.inputProps} id="url-input" />
        </div>
        <Button variant="contained" color="primary" type="submit">
          {' '}
          Añadir{' '}
        </Button>
      </form>
    </div>
  );
}

export default BlogForm;
