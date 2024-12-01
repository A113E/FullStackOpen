import React from 'react';
import ListaCountry from './ListaCountry';
import DetallesCountry from './DetallesCountry';

const MostrarCountries = ({ error, filtrarCountry }) => {
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  if (filtrarCountry.length > 10) {
    return <p>Too many matches, specify another filter.</p>;
  }

  if (filtrarCountry.length <= 10 && filtrarCountry.length > 1) {
    return <ListaCountry countries={filtrarCountry} />;
  }

  if (filtrarCountry.length === 1) {
    return <DetallesCountry country={filtrarCountry[0]} />;
  }

  return null;
};

export default MostrarCountries;

