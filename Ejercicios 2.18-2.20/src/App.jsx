import { useState, useEffect } from 'react';
import axios from 'axios';
import BuscarCountry from './components/BuscarCountry';
import MostrarCountries from './components/MostrarCountries';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState('');
  const [filtrarCountry, setFiltrarCountry] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => setCountries(response.data))
      .catch(() => setError('Error al cargar los datos de los países.'));
  }, []);

  useEffect(() => {
    const resultados = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchCountry.toLowerCase())
    );
    setFiltrarCountry(resultados);
  }, [searchCountry, countries]);

  return (
    <div>
      <h1>Buscador de Países</h1>
      <BuscarCountry
        searchCountry={searchCountry}
        onSearchChange={(e) => setSearchCountry(e.target.value)}
      />
      <MostrarCountries error={error} filtrarCountry={filtrarCountry} />
    </div>
  );
};

export default App;


