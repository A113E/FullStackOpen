// Archivo: Course.js

import React from 'react'

// COMPONENTE HEADER (ENCABEZADO)
const Header = ({ course }) => <h1>{course}</h1>

// COMPONENTE PART (PARTE INDIVIDUAL)
const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

// COMPONENTE CONTENT (CONTENIDO DEL CURSO)
const Content = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <>
      {parts.map(part => (
        <Part key={part.id} part={part} />
      ))}
      <p><strong>Total of {totalExercises} exercises</strong></p>
    </>
  )
}

// COMPONENTE COURSE
const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </>
  )
}

// Exportamos el componente Course como predeterminado
export default Course
