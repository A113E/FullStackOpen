import axios from 'axios';
import { BACKEND_URL } from '../config';

const baseUrl = `${BACKEND_URL}/usuarios`;

// Servicio para obtener todos los usuarios
export function obtenerUsuarios() {
  return axios.get(baseUrl).then((res) => res.data);
}

// Servicio para obtener un usuario individual
export function obtenerUsuario(id) {
  return axios.get(`${baseUrl}/${id}`).then((res) => res.data);
}

// Servicio para crear un nuevo usuario
export function crearUsuario(usuarioObjeto) {
  return axios.post(baseUrl, usuarioObjeto).then((res) => res.data);
}
