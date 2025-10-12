import { useState } from 'react';

export function useCampo(type) {
  const [value, setValue] = useState('');

  function onChange(e) {
    setValue(e.target.value);
  }

  function limpiar() {
    setValue('');
  }

  return {
    value,
    inputProps: {
      type,
      value,
      onChange,
    },
    limpiar,
  };
}
