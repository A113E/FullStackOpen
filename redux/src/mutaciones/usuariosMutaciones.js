import { useMutation, useQueryClient } from '@tanstack/react-query';
import { crearUsuario } from '../servicios/usuarios';

// Mutacion para cambiar el estado al agregar un nuevo usuario
export function useCrearUsuario() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: crearUsuario, // Funcion asincronica que hace la llamada a la API
    // Si el servidor responde exitosamente
    onSuccess: (usuarioObjeto) => {
      // Actualiza la cache manualmente
      const usuarios = queryClient.getQueryData(['usuarios']) || []; // Obtiene el array actual casheado
      // Actualiza la caché con el nuevo array
      queryClient.setQueryData(['usuarios'], usuarios.concat(usuarioObjeto)); // Concatena el nuevo usuario al final
    },
    onError: (error) => {
      console.error(
        'Error al crear usuario:',
        error.response?.data || error.message
      );
    },
  });
}
