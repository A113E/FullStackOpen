import { Navigate, Route, Routes } from 'react-router-dom';

// Componentes
import Inicio from './Inicio';
import BlogLista from '../Blogs/BlogLista';
import Blog from '../Blogs/Blog';
import BlogForm from '../Blogs/BlogForm';
import UsuarioLista from '../Usuarios/UsuarioLista';
import Usuario from '../Usuarios/Usuario';
import LoginForm from '../Usuarios/LoginForm';
import SigInForm from '../Usuarios/SigInForm';
import BlogsUsuario from '../Blogs/BlogsUsuario';

import { useUsuario } from '../../contextos/UsuarioContexto';

function Rutas() {
  // Obtener el usuario logeado del contexto
  const { usuarioLogeado } = useUsuario();

  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/blogs" element={<BlogLista />} />
      <Route path="/blogs/:id" element={<Blog />} />
      <Route path="/nuevo_blog" element={<BlogForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/registro" element={<SigInForm />} />
      <Route
        path="/usuarios"
        element={
          usuarioLogeado ? (
            <UsuarioLista />
          ) : (
            <Navigate replace to="/registro"></Navigate>
          )
        }
      />
      <Route path="/usuarios/:id" element={<Usuario />} />
      <Route path="/blogs_usuario" element={<BlogsUsuario />} />
    </Routes>
  );
}

export default Rutas;
