// Librería de Node.js que crea un API REST falsa (para manejar los datos desde db.json) ** Súper útil para pruebas de front-end o prototipos rápidos.
import jsonServer from 'json-server'

const server = jsonServer.create() // Crea una instancia del servidor de Express de json-server
const router = jsonServer.router('db.json') // Crea un router para conectar al archivo db.json
const middlewares = jsonServer.defaults() // Carga middlewares por defectos 
/*
logger (para ver las peticiones por consola),
CORS (para permitir acceso cruzado),
static server (sirve archivos estáticos si los hay),
no-cache (evita que se cachee contenido).
*/

// Middleware personalizado que se ejecutará en cada petición
const validator = (request, response, next) => {
  console.log()

  // Extraemos el content del cuerpo de la solicitud
  const { content } = request.body // Asume que se envía un JSON
 
  // Valida si la petición es de tipo POST
  if (request.method==='POST' && (!content || content.length<5) ) { // Si en la petición no hay el campo content o si es menor a 5 caracteres entonces:
    return response.status(400).json({
      error: 'too short anecdote, must have length 5 or more' // Devuelve un error 400 (BAD REQUEST)
    })
  } else {
    next() // Si no hay errores, pasás al siguiente middleware con next().
  }
}

server.use(middlewares) // Aplicamos los middlewares por defectos anteriormente definidos
server.use(jsonServer.bodyParser) // Aplicamos el middleware necesario para leer req.body
server.use(validator) // Aplicamos el middleware personalizado para validar entradas
server.use(router) // Montamos el router que transforma db.json en endpoints REST

// Levantamos el servidor en el puerto 3001
server.listen(3001, () => {
  console.log('JSON Server is running') // Muestra un mensaje en la consola que el puerto está corriendo
})
