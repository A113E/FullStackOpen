import {
  eliminarComentario,
  obtenerComentarios,
} from '../servicios/comentarios';

export async function eliminarComentariosBlog(blogId) {
  const comentarios = await obtenerComentarios(blogId);
  await Promise.all(comentarios.map((c) => eliminarComentario(c.id)));
}
