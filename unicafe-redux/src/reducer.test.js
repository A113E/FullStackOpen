// Pruebas unitarias para el reducer 

// Importamos la biblioteca que congela el estapo para evitar que el reducer lo modifique directamente (Rompería el método inmutable)
import deepFreeze from 'deep-freeze'
// Importamos el reducer que vamos a probar
import counterReducer from './reducer'

// Definimos un bloque de pruebas para la aplicación
describe('unicafe reducer', () => {
  // Definimos el estado inicial antes de cada prueba
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }
  
  // Primera prueba: Verifica el estado inicial ( estamos verificando que cuando el reducer recibe un estado undefined, devuelva el estado inicial correcto.)
  test('should return a proper initial state when called with undefined state', () => {
    // Se crea una variable state como un objeto vacío {} (aunque en realidad no se usa).
    const state = {}
    // La variable action representa una acción de Redux con el tipo 'DO_NOTHING', que el reducer no debe reconocer.
    const action = {
      type: 'DO_NOTHING'
    }
    
    // Llamamos a counterReducer, pasándole undefined como estado y action como acción.
    const newState = counterReducer(undefined, action)
    // Redux espera que si el estado es undefined, el reducer devuelva el estado inicial.
    expect(newState).toEqual(initialState)
  })

  // Segunda prueba: Incrementa good (verifica si el reducer incrementa correctamente el contador "good" cuando recibe la acción GOOD.)
  test('good is incremented', () => {
    // Definimos la acción GOOD
    const action = {
      type: 'GOOD'
    }
    // Definimos el estado inicial
    const state = initialState
    
    // Congelamos el estado para evitar mutaciones
    deepFreeze(state)

    // Llamamos a counterReducer, pasándole el estado actual y la acción GOOD.
    const newState = counterReducer(state, action)
    // Comprueba que el estado devuelto por el reducer ha aumentado en 1 el contador "good".
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  // Tercera prueba: Incrementa ok (verifica si el reducer incrementa correctamente el contador "ok" cuando recibe la acción OK.)
  test('ok is incremented', () => {
    // Definimos la acción OK
    const action = {
      type: 'OK'
    }
    // Definimos el estado inicial
    const state = initialState

    // Congelamos el estado para evitar mutaciones
    deepFreeze(state)

    // Llamamos a counterReducer, pasándole el estado actual y la acción OK.
    const newState = counterReducer(state, action)
    // Comprueba que el estado devuelto por el reducer ha aumentado en 1 el contador "ok".
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  }) 

  // Cuarta prueba: Incrementa bad (verifica si el reducer incrementa correctamente el contador "bad" cuando recibe la acción BAD.)
  test('bad is incremented', () => {
    // Definimos la acción BAD
    const action = {
      type: 'BAD'
    }
    // Definimos el estado inicial
    const state = initialState

    // Congelamos el estado para evitar mutaciones
    deepFreeze(state)

    // Llamamos a counterReducer, pasándole el estado actual y la acción BAD.
    const newState = counterReducer(state, action)
    // Comprueba que el estado devuelto por el reducer ha aumentado en 1 el contador "bad".
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  // Quinta prueba: Reinicia todos loc ontadores a 0 (verifica si el reducer reinicia correctamente todos los contadores a 0 cuando recibe ZERO.)
  test('reset counters', () => {
    // Definimos la acción ZERO
    const action = {
      type: 'ZERO'
    }
    // Definimos el estado inicial
    const state = {
      good: 4,
      ok: 2,
      bad: 1
    }

    // Congelamos el estado para evitar mutaciones
    deepFreeze(state)

    // Llamamos a counterReducer, pasándole el estado actual y la acción ZERO
    const newState = counterReducer(state, action)
    // Comprueba que el estado devuelto por el reducer ha reiniciado a 0 todos los contadores
    expect(newState).toEqual(initialState)
  })
})