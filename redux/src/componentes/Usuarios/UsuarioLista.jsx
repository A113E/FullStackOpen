import { Link } from 'react-router-dom';
import { useUsuario } from '../../contextos/UsuarioContexto';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material';

function UsuarioLista() {
  // Acceder al valor del contexto
  const { usuarios } = useUsuario();
  // Validacion
  if (!usuarios || usuarios.length === 0)
    return <div>No hay usuarios registrados</div>;

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> Usuarios </TableCell>
              <TableCell> Cantidad de Blogs </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell>
                  <Link to={`/usuarios/${usuario.id}`}> {usuario.nombre} </Link>
                </TableCell>
                <TableCell>
                  {usuario.blogs ? usuario.blogs.length : 0}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UsuarioLista;
