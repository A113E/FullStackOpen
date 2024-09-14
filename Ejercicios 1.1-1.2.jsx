//Componente Header
const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.course} </h1>
    </div>
  )
}
//Componente Part
const Part = (props) => {
  console.log(props)
  return (
    <p>{props.part} {props.exercises}</p>
  )
}
//Componente Content Refactorizado
const Content = (props) => {
  console.log(props)
  return (
    <div>
    <Part part={props.part1} exercises={props.exercises1} />
      <Part part={props.part2} exercises={props.exercises2} />
      <Part part={props.part3} exercises={props.exercises3} />
    </div>
  )
}
//Componente Total
const Total = (props) => {
  console.log(props)
  return (
    <p><strong>Total number of exercises:</strong> {props.total}</p>
  )
}
//Aplicación Principal
const App = () => {
  //Raíz
  const course = 'Half Stack application development'
  const content = [
    {part: 'Fundamentals of React' , exercises: 10 },
    {part: 'Using props to pass data', exercises: 7},
    {part: 'State of a component' , exercises: 14}
  ]
  const total = content[0].exercises + content[1].exercises + content[2].exercises
  
  
  return (
    <div>
      <Header course= {course} />
      <Content
        part1={content[0].part} exercises1={content[0].exercises}
        part2={content[1].part} exercises2={content[1].exercises}
        part3={content[2].part} exercises3={content[2].exercises}
      />
      <Total total={total} />
    </div>
  )
}
//Exportación de la aplicación 
export default App
