import { useParams } from 'react-router-dom';
import { eliminarComentariosBlog } from '../../helpers/helpers';
import { useBlogs } from '../../contextos/BlogsContexto';
import { useComentario } from '../../contextos/ComentarioContexto';
import ComentarioLista from '../Comentarios/ComentarioLista';
import ComentarioForm from '../Comentarios/ComentarioForm';
import { ComentarioProvider } from '../../contextos/ComentarioContexto';
import { TogglableProvider } from '../../contextos/TogglableContexto';
import Togglable from '../Otros/Togglable';
import { useNotificacion } from '../../contextos/NotificacionContexto';
import { useUsuario } from '../../contextos/UsuarioContexto';

function Blog() {
  const { blogs, likeBlog, eliminarBlog } = useBlogs();
  const { mostrarMensaje } = useNotificacion();
  const { usuarioLogeado } = useUsuario();

  // Obtener el id para el blog individual
  const { id } = useParams();

  if (!blogs || blogs.length === 0) return <div>Cargando blog...</div>;
  const blog = blogs.find((b) => b.id === id);
  if (!blog) return <div>No se encontró el blog</div>;

  // Funcion para determinar quien creo el blog
  const creadorBlog = blog.usuario ? blog.usuario.nombre_usuario : 'Anónimo';

  // Funcion para manejar los likes de un blog
  function handleLikeBlog() {
    likeBlog(blog);
    mostrarMensaje('Like agregado correctamente', 'exito');
    console.log('Like agregado');
  }

  // Funcion para mostrar el boton de eliminar solo si es el usuario creador
  const puedeEliminarBlog =
    blog.usuario &&
    usuarioLogeado &&
    (blog.usuario.id === usuarioLogeado.id ||
      blog.usuario._id === usuarioLogeado.id);

  // Funcion para manejar la eliminacion de un blog
  function handleEliminarBlog() {
    if (
      window.confirm(
        `¿Esta seguro que desea eliminar el blog "${blog.titulo}"?`
      )
    ) {
      eliminarBlog(blog);
      eliminarComentariosBlog(blog.id);
      mostrarMensaje('Blog eliminado correctamente', 'exito');
      console.log('Blog eliminado correctamente');
    }
  }

  return (
    <ComentarioProvider blogId={blog.id}>
      <TogglableProvider>
        <BlogContenido
          blog={blog}
          usuarioLogeado={usuarioLogeado}
          creadorBlog={creadorBlog}
          puedeEliminarBlog={puedeEliminarBlog}
          handleLikeBlog={handleLikeBlog}
          handleEliminarBlog={handleEliminarBlog}
        />
      </TogglableProvider>
    </ComentarioProvider>
  );
}

function BlogContenido({
  blog,
  usuarioLogeado,
  creadorBlog,
  puedeEliminarBlog,
  handleEliminarBlog,
  handleLikeBlog,
}) {
  // Obtiene el valor del contexto de la cantidad de comentarios
  const { cantidadComentarios } = useComentario();

  return (
    <div>
      <div>
        <h3> {blog.titulo} </h3>
        <h4> {blog.autor} </h4>
      </div>
      <div>
        <a href={blog.url}> Visitar la página del blog </a>
        <p> ❤️ {blog.likes} likes </p>
        <p>💬 {cantidadComentarios} comentarios</p>
      </div>
      <div> {creadorBlog} </div>
      <div>
        <button onClick={handleLikeBlog}> Like </button>
        {puedeEliminarBlog && (
          <button onClick={handleEliminarBlog}> Eliminar </button>
        )}
      </div>
      <Togglable buttonLabel="Ver Comentarios">
        <ComentarioForm blogId={blog.id} />
        <ComentarioLista usuario={usuarioLogeado} />
      </Togglable>
    </div>
  );
}

export default Blog;
