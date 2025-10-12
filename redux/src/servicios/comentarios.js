import axios from 'axios';
import { BACKEND_URL } from '../config';
import { cargarUsuario } from './storage';

const baseUrl = `${BACKEND_URL}/comentarios`;

// Autentificación
function obtenerConfig() {
  const usuario = cargarUsuario();
  if (!usuario?.token) {
    throw new Error('Usuario no encontrado');
  }
  return {
    headers: { Authorization: `Bearer ${usuario.token}` },
  };
}

// Servicio para obtener todos los comentarios de un blog
export function obtenerComentarios(blogId) {
  return axios.get(`${baseUrl}/${blogId}`).then((res) => res.data);
}

// Servicio para crear un nuevo comentario de un blog
export function crearComentario(blogId, comentarioObjeto) {
  return axios
    .post(`${baseUrl}/${blogId}`, comentarioObjeto, obtenerConfig())
    .then((res) => res.data);
}

// Servicio para dar like a un comentario de un blog
export function likeComentario(comentario) {
  return axios
    .post(`${baseUrl}/${comentario.id}/likes`)
    .then((res) => res.data);
}

// Servicio para eliminar un comentario de un blog
export function eliminarComentario(comentario) {
  return axios
    .delete(`${baseUrl}/${comentario.id}`, obtenerConfig())
    .then((res) => res.data);
}
