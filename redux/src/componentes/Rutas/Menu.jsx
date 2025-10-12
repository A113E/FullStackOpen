import { Link } from 'react-router-dom';
import { useUsuario } from '../../contextos/UsuarioContexto';
import { AppBar, Toolbar, Button, Typography, Box, Stack } from '@mui/material';

function Menu() {
  const { usuarioLogeado, logoutUsuario } = useUsuario();

  return (
    <AppBar position="static" color="primary" elevation={3} sx={{ mb: 3 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Sección izquierda: navegación */}
        <Stack direction="row" spacing={2}>
          <Button color="inherit" component={Link} to="/">
            Inicio
          </Button>
          <Button color="inherit" component={Link} to="/blogs">
            Blogs
          </Button>
          <Button color="inherit" component={Link} to="/usuarios">
            Usuarios
          </Button>
        </Stack>

        {/* Sección derecha: usuario */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {usuarioLogeado ? (
            <>
              <Typography variant="body1" sx={{ color: 'white' }}>
                {usuarioLogeado.nombre_usuario || usuarioLogeado.nombre}{' '}
                conectado
              </Typography>
              <Button
                variant="outlined"
                color="inherit"
                size="small"
                onClick={logoutUsuario}
              >
                Cerrar sesión
              </Button>
            </>
          ) : (
            <Button
              color="inherit"
              component={Link}
              to="/registro"
              sx={{ fontWeight: 500 }}
            >
              Registro / Iniciar
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Menu;
