import { Link } from 'react-router-dom';
import { useBlogs } from '../../contextos/BlogsContexto';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material';

function Inicio() {
  // Acceder al valor del contexto
  const { blogs } = useBlogs();
  // Función para mostrar solo los ultimos 5 blogs creados
  const mostrarUltimos = [...blogs]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Por fecha de creado
    .slice(0, 5); // Mostrar solo los 5 ultimos

  return (
    <div>
      <h2> Últimas Entradas </h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {mostrarUltimos.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}> {blog.titulo} </Link>
                </TableCell>
                <TableCell>{blog.autor}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Inicio;
