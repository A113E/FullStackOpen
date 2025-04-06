// Importamos el reducer
import reducer from './anecdoteReducer'
// Importamos la biblioteca que congela el estapo para evitar que el reducer lo modifique directamente (Rompería el método inmutable)
import deepFreeze from 'deep-freeze'

// Definimos un bloque de pruebas para anecdoteReducer
describe('anecdoteReducer', () => {
    
    // Primera prueba: Verifica que se pueda votar por una anécdota
    test('anecdote can be voted', () => {
        // Definimos un state inicial
        const initialState = [
            {
                content: 'a new anecdote',
                votes: 5,
                id: 1
            },
            {
                content: 'another anecdote',
                votes: 0,
                id: 2
            }
        ]
        const state = initialState
        // Definimos la acción a probar
        const action = {
            type: 'anecdotes/voteAnecdote',
            payload: {id: 2}
        }
        // Congelamos el estado con deepFreeze()
        deepFreeze(state) // Asegura que state no pueda ser modificado directamente dentro del reducer.
        // Llamamos al reducer para obtener el nuevo estado
        const newState = reducer(state, action)
        // Verificamos el estado
        expect(newState).toHaveLength(2) // Confirmamos que le número de anécdotas es el mismo
        expect(newState).toContainEqual(state[0]) // Verifica que la primera anécdota sea igual
        // Verificamos que la anécdota 2 se sume un voto
        expect(newState).toContainEqual({
            content: 'another anecdote',
            votes: 1, 
            id: 2
        })
    })
    // Seguna prueba: Verifica que se pueda agregar una anécdota
    test('return state with a new anecdote', () => {
        // Definimos el estado inicial (al principio vació)
        const state = []
        // Definimos la acción a probar
        const action = {
            type: 'anecdotes/createAnecdote',
            payload: {
                content: 'A anecdote can be added',
                votes: 0,
                id: 1
            }
        }
         // Congelamos el estado con deepFreeze()
         deepFreeze(state) // Asegura que state no pueda ser modificado directamente dentro del reducer.
         // Llamamos al reducer para obtener el nuevo estado
         const newState = reducer(state, action)
         // Verificamos el estado
         expect(newState).toHaveLength(1) // Confirmamos que el estado tenga una anécdota
         expect(newState).toContainEqual(action.payload) // Verifica que la nueva anécdota agregada es igual a la que estaba en action.payload
    })
})