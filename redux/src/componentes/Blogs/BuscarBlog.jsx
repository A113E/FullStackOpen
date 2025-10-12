import { useBuscar } from '../../contextos/BuscarContexto';

function BuscarBlog() {
  // Acceder a los valores del contexto
  const { valor, tipoBusqueda, buscar, buscarPor } = useBuscar();

  // Manejar el texto del input
  const handleBusqueda = (e) => buscar(e.target.value);

  // Cambiar tipo de búsqueda
  const handleTipoBusqueda = (e) => buscarPor(e.target.value);

  return (
    <div>
      <input
        type="text"
        value={valor}
        onChange={handleBusqueda}
        placeholder={`Buscar blog por ${tipoBusqueda.toLowerCase()}...`}
      />

      <div>
        <strong>Buscar por:</strong>
        <div>
          <label>
            <input
              type="radio"
              name="filtro"
              value="TITULO"
              checked={tipoBusqueda === 'TITULO'}
              onChange={handleTipoBusqueda}
            />
            Título
          </label>
          <label>
            <input
              type="radio"
              name="filtro"
              value="AUTOR"
              checked={tipoBusqueda === 'AUTOR'}
              onChange={handleTipoBusqueda}
            />
            Autor
          </label>
        </div>
      </div>
    </div>
  );
}

export default BuscarBlog;
