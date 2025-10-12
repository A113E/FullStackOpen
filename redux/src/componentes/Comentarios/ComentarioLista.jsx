import Comentario from './Comentario';
import { useComentario } from '../../contextos/ComentarioContexto';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material';

function ComentarioLista({ usuario }) {
  const { comentarios } = useComentario();
  // Funcion para ordenar los comentarios por likes
  const comentariosOrdenados = [...comentarios].sort(
    (a, b) => b.likes - a.likes
  );

  if (!comentarios || comentarios.length === 0)
    return <div>Sin comentarios...</div>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {comentariosOrdenados.map((comentario) => (
            <TableRow key={comentario.id}>
              <TableCell>
                <Comentario comentario={comentario} usuario={usuario} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ComentarioLista;
