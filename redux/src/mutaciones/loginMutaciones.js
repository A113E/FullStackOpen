import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../servicios/login';
import { usuarioGuardado } from '../servicios/storage';

// Mutacion para cambiar el estado al iniciar sesión
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login, // Funcion asincrónica que llama a la API
    // Si el servidor responde exitosamente
    onSuccess: (usuario) => {
      // Guardar en storage usando el servicio
      usuarioGuardado(usuario);
      // Actualiza el estado con el nuevo usuario
      queryClient.setQueryData(['login'], usuario);
    },
    // Si responde con error
    onError: (error) => {
      console.error(
        'Error al iniciar sesión',
        error.response?.data || error.message
      ); // Captura el error
    },
  });
}
