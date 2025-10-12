import { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query'; // Permite hacer peticiones a la API
import { obtenerBlogs } from '../servicios/blogs';
import {
  useCrearBlog,
  useActualizarBlog,
  useLikeBlog,
  useEliminarBlog,
} from '../mutaciones/blogsMutaciones';

// Crear el contexto
const BlogsContexto = createContext();

// Hook que encapsula el contexto
export const useBlogs = () => useContext(BlogsContexto);

// Componente proveedor
export function BlogsProvider({ children }) {
  // Hook query para obtener los blogs
  const resultado = useQuery({
    queryKey: ['blogs'], // Nombre unico de la consulta
    queryFn: obtenerBlogs, // Funcion asincronica para obtener los datos de la API
    refetchOnWindowFocus: false, // Desactiva que vuelva pedir los datos al actualizarse la pagina
  });

  // Obtener las mutaciones
  const crear = useCrearBlog();
  const actualizar = useActualizarBlog();
  const like = useLikeBlog();
  const eliminar = useEliminarBlog();

  // Funciones para mutar el estado
  const crearBlog = (blogObjeto) => crear.mutate(blogObjeto);
  const actualizarBlog = (id, blogObjeto) =>
    actualizar.mutate({ id, blogObjeto });
  const likeBlog = (blog) => like.mutate({ ...blog, likes: blog.likes + 1 });
  const eliminarBlog = (blog) => eliminar.mutate(blog);

  // Controles de carga
  if (resultado.isLoading && !resultado.data) {
    return <div> Cargando blogs... </div>;
  }

  if (resultado.isError) {
    return <div> Error al cargar los blogs </div>;
  }

  return (
    <BlogsContexto.Provider
      value={{
        blogs: resultado.data || [],
        crearBlog,
        actualizarBlog,
        likeBlog,
        eliminarBlog,
      }}
    >
      {children}
    </BlogsContexto.Provider>
  );
}

export default BlogsContexto;
