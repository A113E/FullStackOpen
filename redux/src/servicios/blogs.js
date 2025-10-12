import axios from 'axios';
import { BACKEND_URL } from '../config';
import { cargarUsuario } from './storage';

const baseUrl = `${BACKEND_URL}/blogs`;

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

// Servicio para obtener todos los blogs
export function obtenerBlogs() {
  return axios.get(baseUrl).then((res) => res.data);
}

// Servicio para obtener un blog individual
export function obtenerBlog(id) {
  return axios.get(`${baseUrl}/${id}`).then((res) => res.data);
}

// Servicio para crear un nuevo blog
export function crearBlog(blogObjeto) {
  return axios
    .post(baseUrl, blogObjeto, obtenerConfig())
    .then((res) => res.data);
}

// Servicio para dar like a un blog
export function likeBlog(blog) {
  return axios.post(`${baseUrl}/${blog.id}/likes`).then((res) => res.data);
}

// Servicio para eliminar un blog
export function eliminarBlog(blog) {
  return axios
    .delete(`${baseUrl}/${blog.id}`, obtenerConfig())
    .then((res) => res.data);
}

// Servicio para actualizar un blog
export function actualizarBlog(id, blogActualizado) {
  return axios
    .put(`${baseUrl}/${id}`, blogActualizado, obtenerConfig())
    .then((res) => res.data);
}
