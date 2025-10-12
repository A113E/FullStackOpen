import { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { obtenerUsuarios } from '../servicios/usuarios';
import { useCrearUsuario } from '../mutaciones/usuariosMutaciones';
import { useLogin } from '../mutaciones/loginMutaciones';
import { cargarUsuario, eliminarUsuarioStorage } from '../servicios/storage';

// Crear el contexto
const UsuarioContexto = createContext();

// Hook que encapsula el contexto
export const useUsuario = () => useContext(UsuarioContexto);

// Componente proveedor
export function UsuarioProvider({ children }) {
  // Estado actual del usuario logeado
  const [usuarioLogeado, setUsuarioLogeado] = useState(null);

  // Hook query para obtener los usuarios
  const resultado = useQuery({
    queryKey: ['usuarios'], // Clave unica para la consulta
    queryFn: obtenerUsuarios,
    refetchOnWindowFocus: false, // Evita recargas innecesarias
  });

  // Obtener las mutaciones
  const crear = useCrearUsuario();
  const login = useLogin();

  // Hook para cargar el usuario al iniciar la app
  useEffect(() => {
    const usuario = cargarUsuario();
    if (usuario) {
      setUsuarioLogeado(usuario);
    }
  }, []);

  // Funciones para mutar el estado
  const crearUsuario = (usuarioObjeto) => crear.mutate(usuarioObjeto);
  function loginUsuario(credenciales) {
    login.mutate(credenciales, {
      onSuccess: (usuario) => {
        setUsuarioLogeado(usuario);
      },
    });
  }

  // Funcion para logout el usuario
  function logoutUsuario() {
    eliminarUsuarioStorage();
    setUsuarioLogeado(null);
  }

  // Controles de carga
  if (resultado.isLoading && !resultado.data) {
    return <div> Cargando usuarios... </div>;
  }
  if (resultado.isError) {
    return <div> Error al cargar los usuarios </div>;
  }

  return (
    <UsuarioContexto.Provider
      value={{
        usuarios: resultado.data || [],
        usuarioLogeado,
        crearUsuario,
        loginUsuario,
        loginUsuario,
        logoutUsuario,
      }}
    >
      {children}
    </UsuarioContexto.Provider>
  );
}

export default UsuarioContexto;
