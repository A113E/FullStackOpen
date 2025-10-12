import { useCampo } from '../../hooks/useCampo';
import { useNavigate } from 'react-router-dom';
import { useUsuario } from '../../contextos/UsuarioContexto';
import { useNotificacion } from '../../contextos/NotificacionContexto';
import { TextField, Button } from '@mui/material';

function LoginForm() {
  // Acceder al valor del contexto
  const { loginUsuario } = useUsuario();
  const { mostrarMensaje } = useNotificacion();

  // Para redireccionamiento dinamico
  const navigate = useNavigate();

  // Campos del formulario
  const nombre_usuario = useCampo('text');
  const password = useCampo('password');

  // Función para limpiar el formulario
  function limpiarFormulario() {
    nombre_usuario.limpiar();
    password.limpiar();
  }

  // Función para manejar el login de usuario
  function handleLogin(e) {
    e.preventDefault();
    const usuarioLoggeado = {
      nombre_usuario: nombre_usuario.value,
      password: password.value,
    };
    loginUsuario(usuarioLoggeado);
    mostrarMensaje(
      `Bienvenido de vuelta ${usuarioLoggeado.nombre_usuario}`,
      'exito'
    );
    limpiarFormulario();
    navigate('/');
  }

  return (
    <div>
      <h2> Iniciar Sesión </h2>
      <div>
        <form onSubmit={handleLogin}>
          <div>
            Nombre de usuario:
            <TextField {...nombre_usuario.inputProps} id="usuario-input" />
          </div>
          <div>
            Contraseña:
            <TextField {...password.inputProps} id="password-input" />
          </div>
          <Button variant="contained" color="primary" type="submit">
            {' '}
            Iniciar{' '}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
