import { useParams } from 'react-router-dom';
import BlogsUsuario from '../Blogs/BlogsUsuario';
import { useUsuario } from '../../contextos/UsuarioContexto';

function Usuario() {
  // Acceder a los valores del contexto
  const { usuarios } = useUsuario();
  // Obtener el id para el usuario individual
  const { id } = useParams();

  if (!usuarios || usuarios.length === 0)
    return <div> Cargando usuario... </div>;
  const usuario = usuarios.find((u) => u.id === id);
  if (!usuario) return <div> No se encontró el usuario </div>;

  return (
    <div>
      <div>
        <h2> Usuario: </h2> {usuario.nombre_usuario}
      </div>
      <div>
        <h3> Nombre de usuario: </h3> {usuario.nombre}
      </div>
      <div>
        <BlogsUsuario usuario={usuario} />
      </div>
    </div>
  );
}

export default Usuario;
