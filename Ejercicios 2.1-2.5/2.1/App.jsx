//COMPONENTE PRINCIPAL
const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return <Course course={course} parts={parts}/>
}

// COMPONENTE QUE FORMATEA UN CURSO A LA VEZ
const Course = ({ course, parts }) => { //Course recibe dos props: course (nombre del curso) y parts (array de partes del curso).*
  return ( //Dentro del componente Course, se renderizan dos componentes:**
  /*
  Header: se le pasa el prop course para mostrar el nombre del curso.
  Content: se le pasa el prop parts, que contiene las partes del curso, y este componente será responsable de mostrar los detalles de cada parte.
  */
    <>
      <Header course={course} />
      <Content parts={parts} />
    </>
  )
}

// COMPONENTE HEADER (ENCABEZADO)
 //Componente que muestra el título del curso
const Header = ({ course }) => <h1>{course}</h1>
/*
Header recibe el prop course que contiene el nombre del curso.
Muestra el nombre del curso dentro de una etiqueta HTML <h1>. Es simplemente el encabezado.
*/

// COMPONENTE QUE DEFINE UNA PARTE
//Este componente se encarga de renderizar una parte específica del curso (nombre de la parte y cuántos ejercicios tiene).
const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
  /*
Part recibe un objeto part como prop, que contiene dos propiedades: name (nombre de la parte) y exercises (número de ejercicios).
Luego, dentro de un párrafo (<p>), muestra el nombre de la parte y el número de ejercicios.
*/
)

// COMPONENTE CONTENT (CONTENIDO)
//Este componente es responsable de renderizar todas las partes del curso, usando el componente Part para cada una
const Content = ({ parts }) => (
  <>
    {parts.map((part, index) => (
      <Part key={index} part={part} />
    ))}
  </>
  /*
Content recibe un prop parts, que es un array de objetos (cada objeto representa una parte del curso).
Usa el método map() para iterar sobre cada parte en el array parts. Por cada parte, se crea un componente Part pasándole el objeto part como prop.
key={index}: key es una propiedad especial en React que ayuda a identificar cada elemento cuando se renderizan listas de elementos. Usamos index como clave única para cada parte en el array.
*/
)



export default App

