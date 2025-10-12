// Componentes
import Footer from './componentes/Rutas/Footer';
import Menu from './componentes/Rutas/Menu';
import Rutas from './componentes/Rutas/Rutas';
import Notificacion from './componentes/Otros/Notificacion';
import { Container } from '@mui/material';

function App() {
  return (
    <Container>
      <h1>BlogsList_App</h1>
      <Menu />
      <Notificacion />
      <Rutas />
      <Footer />
    </Container>
  );
}

export default App;
