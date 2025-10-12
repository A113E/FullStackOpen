import { Link } from 'react-router-dom';

function BlogsUsuario({ usuario }) {
  // Si el usuario no tiene blogs o el array está vacío
  if (!usuario.blogs || usuario.blogs.length === 0) {
    return <strong>Este usuario aún no ha creado blogs</strong>;
  }

  return (
    <div>
      <h2> Blogs Creados: </h2>
      <div>
        <ul>
          {usuario.blogs.map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}> {blog.titulo} </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BlogsUsuario;
