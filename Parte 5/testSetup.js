import { afterEach } from 'vitest'
import { cleanup  } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

afterEach(() => {
    cleanup() // luego de cada prueba, la función cleanup es ejecutada para resetear jsdom, que esta simulando al navegador.
})