import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  // devolvemos dos objetos: uno para el input y otro para el reset
  return {
    inputProps: {
      type,
      value,
      onChange
    },
    reset
  }
}

