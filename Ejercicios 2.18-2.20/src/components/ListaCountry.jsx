import React, { useState } from 'react';
import DetallesCountry from './DetallesCountry';

const ListaCountry = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleShowDetails = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      {selectedCountry ? (
        <DetallesCountry country={selectedCountry} />
      ) : (
        <ul>
          {countries.map((country) => (
            <li key={country.cca3}>
              {country.name.common}{' '}
              <button onClick={() => handleShowDetails(country)}>Show</button>
            </li>
          ))}
        </ul>
      )}
      {selectedCountry && (
        <button onClick={() => setSelectedCountry(null)}>Back</button>
      )}
    </div>
  );
};

export default ListaCountry;

