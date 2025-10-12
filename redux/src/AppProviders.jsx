import { BuscarContextoProvider } from './contextos/BuscarContexto';
import { BlogsProvider } from './contextos/BlogsContexto';
import { UsuarioProvider } from './contextos/UsuarioContexto';
import { TogglableProvider } from './contextos/TogglableContexto';
import { NotificacionProvider } from './contextos/NotificacionContexto';

export function Providers({ children }) {
  return (
    <UsuarioProvider>
      <BlogsProvider>
        <BuscarContextoProvider>
          <TogglableProvider>
            <NotificacionProvider>{children}</NotificacionProvider>
          </TogglableProvider>
        </BuscarContextoProvider>
      </BlogsProvider>
    </UsuarioProvider>
  );
}
