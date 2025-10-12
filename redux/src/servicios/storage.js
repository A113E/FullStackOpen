const KEY = 'usuarioKey';

// Servicio para guardar usuario en el storage
export function usuarioGuardado(usuario) {
  localStorage.setItem(KEY, JSON.stringify(usuario));
}

// Servicio para obtener el usuario del localStorage
export function cargarUsuario() {
  const usuario = localStorage.getItem(KEY);
  return usuario ? JSON.parse(usuario) : null;
}

// Servicio para mostrar el nombre del usuario cargado
export function yo() {
  const usuario = cargarUsuario();
  return usuario ? usuario.nombre_usuario : null;
}

// Servicio para eliminar usuario del storage
export function eliminarUsuarioStorage() {
  localStorage.removeItem(KEY);
}
