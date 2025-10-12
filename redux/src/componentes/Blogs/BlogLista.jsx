import { Link } from 'react-router-dom';
import BuscarBlog from './BuscarBlog';
import { useBlogs } from '../../contextos/BlogsContexto';
import { useBuscar } from '../../contextos/BuscarContexto';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material';

function BlogLista() {
  const { blogs } = useBlogs();
  const { valor, tipoBusqueda } = useBuscar();

  // Ordenar los blogs con y sin busqueda activa
  const blogsOrdenados = valor
    ? blogs
        .filter((blog) => {
          if (tipoBusqueda === 'TITULO') {
            return blog.titulo.toLowerCase().includes(valor.toLowerCase());
          }
          if (tipoBusqueda === 'AUTOR') {
            return blog.autor.toLowerCase().includes(valor.toLowerCase());
          }
          return true;
        })
        .sort((a, b) => b.likes - a.likes)
    : [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <BuscarBlog />
      <div>
        <button type="submit">
          <Link to={'/nuevo_blog'}> Añadir Blog </Link>{' '}
        </button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogsOrdenados.map((blog) => (
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

export default BlogLista;
