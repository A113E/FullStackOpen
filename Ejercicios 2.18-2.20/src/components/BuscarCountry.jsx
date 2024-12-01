import React from 'react';

// Componente para hacer las búsquedas
const BuscarCountry = ({ searchCountry, onSearchChange }) => {
  return (
    <div>
      <input
        value={searchCountry}
        onChange={onSearchChange}
        placeholder="Search for a country"
      />
    </div>
  );
};

export default BuscarCountry;