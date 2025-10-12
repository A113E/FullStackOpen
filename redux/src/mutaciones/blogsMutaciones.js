import { useMutation, useQueryClient } from '@tanstack/react-query'; // Permite hacer peticiones a la API
import {
  crearBlog,
  actualizarBlog,
  likeBlog,
  eliminarBlog,
} from '../servicios/blogs';

// Mutacion query para cambiar el estado al agregar un nuevo blog
export function useCrearBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: crearBlog, // Funcion asincronica que hace la llamada a la API
    // Si el servidor responde exitosamente
    onSuccess: (blogObjeto) => {
      // Actualiza la cache manualmente
      const blogs = queryClient.getQueryData(['blogs']) || [];
      // Actualiza la cache con el nuevo array
      queryClient.setQueryData(['blogs'], blogs.concat(blogObjeto)); // Concatena el nuevo blog al final
    },
  });
}

// Mutacion query para cambiar el estado al actualizar un blog
export function useActualizarBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, blogObjeto }) => actualizarBlog(id, blogObjeto), // Funcion asincronica que usa los hooks de la API
    // Si el servidor responde exitosamente
    onSuccess: (blogActualizado) => {
      // Actualiza la caché manualmente
      const blogs = queryClient.getQueryData(['blogs']) || []; // Obtiene el array actual
      // Reemplaza el blog en el array
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((blog) =>
          blog.id === blogActualizado.id ? blogActualizado : blog
        )
      );
    },
  });
}

// Mutacion Query para actualizar los likes de un blog
export function useLikeBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likeBlog, // Funcion asincronica que hace la llamada a la API
    onSuccess: (blogLikeado) => {
      // Actualiza la caché manualmente
      const blogs = queryClient.getQueryData(['blogs']) || []; // Obtiene los blogs actuales

      // Reemplaza el blog con los likes actualizados
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((blog) => (blog.id === blogLikeado.id ? blogLikeado : blog))
      );
    },
  });
}

// Mutación para eliminar el blog
export function useEliminarBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: eliminarBlog, // Funcion asincronica que llama a la API
    // Si responde exitosamente
    onSuccess: (blogEliminado) => {
      // Actualiza la caché manualmente
      const blogs = queryClient.getQueryData(['blogs']) || []; // Obtiene el array actuañ

      // Elimina el blog del array
      queryClient.setQueryData(
        ['blogs'],
        blogs.filter((blog) => blog.id !== blogEliminado.id)
      );
    },
  });
}
