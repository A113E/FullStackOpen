import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  crearComentario,
  likeComentario,
  eliminarComentario,
} from '../servicios/comentarios';

// Ahora cada hook recibe blogId para actualizar la cache ['comentarios', blogId]
export function useCrearComentario(blogId) {
  const queryClient = useQueryClient();

  return useMutation({
    // mutationFn recibe el comentarioObjeto (texto)
    mutationFn: (comentarioObjeto) => crearComentario(blogId, comentarioObjeto),
    onSuccess: (comentarioCreado) => {
      const key = ['comentarios', blogId];
      const comentarios = queryClient.getQueryData(key) || [];
      queryClient.setQueryData(key, comentarios.concat(comentarioCreado));
    },
  });
}

export function useLikeComentario(blogId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comentario) => likeComentario(comentario),
    onSuccess: (comentarioLikeado) => {
      const key = ['comentarios', blogId];
      const comentarios = queryClient.getQueryData(key) || [];
      queryClient.setQueryData(
        key,
        comentarios.map((c) =>
          c.id === comentarioLikeado.id ? comentarioLikeado : c
        )
      );
    },
  });
}

export function useEliminarComentario(blogId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comentario) => eliminarComentario(comentario),
    onSuccess: (_, variables) => {
      // variables es el arg pasado a mutate (comentario)
      const eliminadoId = variables?.id;
      const key = ['comentarios', blogId];
      const comentarios = queryClient.getQueryData(key) || [];
      queryClient.setQueryData(
        key,
        comentarios.filter((c) => c.id !== eliminadoId)
      );
    },
  });
}
