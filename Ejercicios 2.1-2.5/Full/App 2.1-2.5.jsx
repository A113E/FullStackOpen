import React from 'react'
import Course from './components/Course' // Importamos el componente Course



//COMPONENTE PRINCIPAL
const App = () => {
  const courses = [ 
    {
  name: "Half Stack application development",
  id:1,
  parts: [
    {
      name: "Fundamentals of React",
      exercises: 10,
      id:1
    },
      {
        name: "Using props to pass data",
        exercises:7,
        id:2
      },
      {
        name:"State of a component",
        exercises:14,
        id:3
      },
      {
        name:"Redux",
        exercises:11,
        id:4
      }
  ]
  },
  {
    name:"Node.js",
    id:2, 
    parts: [
      {
        name:"Routing",
        exercises:3,
        id:1
      },
      {
        name: "Middlewares",
        exercises: 7,
        id:2
      }
    ]
  }
]
 
/*
Define el array courses, que contiene dos cursos: 'Half Stack application development' y 'Node.js'.
Usamos map() para iterar sobre courses. En cada iteración, pasamos el curso actual como prop al componente Course.
key={course.id}: React necesita una clave única para identificar cada curso, por lo que utilizamos el id de cada curso.
*/
  return (
    <div>
      {courses.map(course=>(
        <Course key={course.id} course={course} />
      ))}
    </div>
  )
}








export default App

