import { useNavigate, Link } from 'react-router-dom';
import { useCampo } from '../../hooks/useCampo';
import { useUsuario } from '../../contextos/UsuarioContexto';
import { useNotificacion } from '../../contextos/NotificacionContexto';
import { TextField, Button } from '@mui/material';

function SigInForm() {
  // Acceder a los valores del contexto
  const { usuarios, crearUsuario } = useUsuario();
  const { mostrarMensaje } = useNotificacion();

  // Redireccionamiento dinamico
  const navigate = useNavigate();

  // Campos del formulario
  const nombre_usuario = useCampo('text');
  const nombre = useCampo('text');
  const password = useCampo('password');

  // Función para limpiar los campos del formulario
  function limpiarFormulario() {
    nombre_usuario.limpiar();
    nombre.limpiar();
    password.limpiar();
  }

  // Función para manejar el registro de usuario
  function handleRegistro(e) {
    e.preventDefault();

    // Crea el objeto de usuario
    const usuarioObjeto = {
      nombre_usuario: nombre_usuario.value,
      nombre: nombre.value,
      password: password.value,
    };

    // Verifica que esten los campos
    if (!usuarioObjeto.nombre_usuario) {
      console.error('El nombre de usuario es requerido');
      return;
    }
    if (!usuarioObjeto.nombre) {
      console.error('El nombre es requerido');
      return;
    }
    if (!usuarioObjeto.password) {
      console.error('La contraseña es requerida');
      return;
    }

    if (
      usuarioObjeto.nombre_usuario.length < 3 ||
      usuarioObjeto.password.length < 3
    ) {
      console.error(
        'El nombre de usuario y la contraseña deben tener al menos 3 caracteres'
      );
      return;
    }

    // Verifica que el nombre de usuario ya existe
    const usuarioExistente = usuarios.find(
      (usuario) => usuario.nombre_usuario === usuarioObjeto.nombre_usuario
    );

    if (usuarioExistente) {
      console.error('Nombre de usuario ya se encuentra registrado', error);
      return;
    }

    crearUsuario(usuarioObjeto);
    mostrarMensaje('Usuario registrado correctamente', 'exito');
    console.log('Usuario agregado correctamente', usuarioObjeto);
    limpiarFormulario();
    navigate('/login');
  }

  return (
    <div>
      <h2> Registrarse </h2>
      <div>
        <p>
          {' '}
          ¿Ya tienes una cuenta?{' '}
          <Link style={{ padding: '5px' }} to="/login">
            {' '}
            Iniciar Sesión{' '}
          </Link>{' '}
        </p>
        <form onSubmit={handleRegistro}>
          <div>
            Nombre de usuario:
            <TextField {...nombre_usuario.inputProps} id="usuario-input" />
          </div>
          <div>
            Nombre Completo:
            <TextField {...nombre.inputProps} id="nombre-input" />
          </div>
          <div>
            Contraseña:
            <TextField {...password.inputProps} id="password-input" />
          </div>
          <Button variant="contained" color="primary" type="submit">
            {' '}
            Registrarse{' '}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default SigInForm;
