import { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { obtenerComentarios } from '../servicios/comentarios';
import {
  useCrearComentario,
  useLikeComentario,
  useEliminarComentario,
} from '../mutaciones/comentariosMutaciones';

// Crear el contexto
const ComentarioContexto = createContext();

// Hook que encapsula el contexto
export const useComentario = () => useContext(ComentarioContexto);

// Componente proveedor — ahora recibe blogId y lo usa
export function ComentarioProvider({ children, blogId }) {
  // Si no hay blogId, no intentamos cargar
  const resultado = useQuery({
    queryKey: ['comentarios', blogId], // clave por blog
    queryFn: () => obtenerComentarios(blogId), // pasar blogId explícitamente
    enabled: !!blogId, // sólo ejecutar si hay blogId
    refetchOnWindowFocus: false,
  });

  // Obtener las mutaciones cerradas sobre este blogId
  const crear = useCrearComentario(blogId);
  const like = useLikeComentario(blogId);
  const eliminar = useEliminarComentario(blogId);

  // Funciones para mutar el estado (no necesitan blogId en el componente)
  const crearComentario = (comentarioObjeto) => crear.mutate(comentarioObjeto);
  const likeComentario = (comentario) => like.mutate(comentario);
  const eliminarComentario = (comentario) => eliminar.mutate(comentario);

  const cantidadComentarios = resultado.data ? resultado.data.length : 0;

  if (!blogId) return <div> Blog inválido. </div>;
  if (resultado.isLoading) return <div> Cargando comentarios... </div>;
  if (resultado.isError) return <div> Error al cargar los comentarios </div>;

  return (
    <ComentarioContexto.Provider
      value={{
        comentarios: resultado.data || [],
        crearComentario,
        likeComentario,
        eliminarComentario,
        cantidadComentarios,
      }}
    >
      {children}
    </ComentarioContexto.Provider>
  );
}

export default ComentarioContexto;
