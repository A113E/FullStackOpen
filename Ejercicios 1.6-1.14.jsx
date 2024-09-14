import { useState } from 'react' //Se importa la funcion useState desde el react****

//COMPONENTE ESTADISTICAS CON CONDICIONAL
const Statistics = ({good, neutral, bad, total, promedio, positivo}) => { //Se refactoriza el componente para que mueste las variables en el parámetro***
  if (total === 0) { //Primera Condición= Si el total de comentarios (good,neutral y bad) es 0 entonces:***
    return <h2>No FeedBack Given</h2> //Devuelve el texto
  }
  return (  //Segunda Condición=Si el total es mayor que 0 entonces devuleve un div de HTML***
  //El div se compone por:
  //Un encabezado (h1) con un titulo
  //Una tabla en donde se encuentran todas las estadísticas
  //Cada estadistica se encuentra en un componente separado (StatisticLine) que tiene su propio valor y texto ***
    <div> 
  <h1>Statistics</h1> 
  <table>
    <tbody>
      <StatisticLine text="Good" value={good} />
      <StatisticLine text="Neutral" value={neutral} />
      <StatisticLine text="Bad" value={bad} />
      <StatisticLine text="Total" value={total} />
      <StatisticLine text="Average" value={promedio} />
      <StatisticLine text="Positive" value={positivo} />
      </tbody>
      </table>
  </div>
  )
}
//COMPONENTE BUTTON
const Button = (props) => { //Este componente llama al botón para clickear el comentario mediante el parametro props ***
  return ( //Devuelve un botón HTML con el atributo onClick(importante) y el texto del botón
    <button onClick={props.onClick}> 
      {props.text}
    </button>
  )
}
// COMPONENTE PARA MOSTRAR UNA ESTADÍSTICA
const StatisticLine = ({text, value}) => { //Componente utilizado para separar cada estadística con su propio valor y texto(usado en el componente Statistics)***
  return ( //Devuelve las filas texto y valor de la tabla anteriorm
    <tr>
     <td>{text}: </td> 
     <td> {value} </td>
      </tr>
  )
}
//COMPONENTE ANECDOTAS
const Anecdotas = ({anecdotes, votes, selected, handleRandomAnecdote, handleVotes}) => { //Componente para refactorizar las anecdotas generadas en el componente de raiz (App)
  return ( //Devuelve:
  //Un div HTML con:
  //Un encabezado (h1) con un titulo
  //Un parrafo HTML (p) con el valor de la variable anecdotes con una condicion que si no hay anecdotas muestre un texto
  //Otro parrafo con la cantidad total de votos de la anecdota
  //Botones con la funcion de votar y de cambiar de anecdota
    <div>
      <h1>Anecdotes</h1>
      <p>{selected === null ? 'Show me a Anecdote' : anecdotes[selected]}</p>
      <p>Has {votes} votes </p>
      <button onClick= {handleVotes}>Vote</button>
      <button onClick= {handleRandomAnecdote}> Next Anecdote </button>
    </div>
  )
}
//COMPONENTE PARA MOSTRAR LA ANECDOTA CON MAS VOTOS
const AnecdoteWithMostVotes = ({anecdotes, votes}) => { //Refactoriza mediante las variables anecdotes y votes y dos funciones la anecdota con mayor cantidad de votos 
  const maxVotes = Math.max(...votes); //Funcion para calcular la anecdota con mayor cantidad de votos
  const bestAnecdoteIndex = votes.indexOf(maxVotes); //Funcion para recorrer todas las anecdotas y determinar la mas votada (indexOf)

  if (maxVotes === 0) { //Condicion 1: Si la variable maxVotes es igual a 0 muestra un textp
    return <p>No votes yet</p>;
  }

  return ( //Condicion 2: Si la variable maxVotes es mayor que 0 devuelve:
  //Un encabezado (h2) con un titulo
  //Un parrafo con la anecdota con mas votos
  //Cantidad de votos de la anecdota
    <div>
      <h2>Anecdote with most votes</h2>
      <p> {anecdotes[bestAnecdoteIndex]} </p>
      <p>Has {maxVotes} votes </p>
    </div>
  )
}




//COMPONENTE PRINCIPAL
const App = () => { //Componente que contiene las variables y la funcion con los estados (useState)
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [promedio, setPromedio] = useState(0)
  const [positivo, setPositivo] = useState(0)
  const [selected, setSelected] = useState(null)
  const [votes, setVotes] = useState(new Array(8).fill(0))
 //Imprime las variables en la consola
  console.log(good);
  console.log(neutral);
  console.log(bad);
  console.log(total);
  console.log(promedio);
  console.log(positivo);
  console.log(selected);
  console.log(votes);

  //Funcion para manejar el boton de clickear los comentarios good
  const handleClickGood = () => {
    const updatedGood = good + 1 //se crea una variable que actualiza el nuevo valor de la variable good (updatedGood) que al hacer click le suma uno al valor de good
    setGood(updatedGood) //Llama a la funcion del estado y toma el valor de la nueva variable creada
    const updatedTotal = updatedGood+neutral+bad //se crea una nueva variable  (updatedTotal) que su valor será la suma del valor actualizado de good y los otros dos comentarios (neutral y bad)
    setTotal(updatedTotal) //Llama a la funcion del estado Total y toma el nuevo valor de la variable creada
    setPromedio((updatedGood*1+neutral*0+bad*-1)/updatedTotal) //Llama a la funcion del estado promedio y le dice que tome el valor de la suma de la variable good actualizado y las otras dos con las clasificaciones predeterminadas entre la cantidad total de comentarios
    setPositivo((updatedGood/updatedTotal)*100) //Llama a la funcion del estado positivo y le dice que tome el valor de dividir el valor actualizado de good y el valor actualizado del total multiplicado por 100 (Esto es para determinar porcentaje)
  }
  
//Funcion para manejar el boton de clickear los comentarios neutral
  const handleClickNeutral = () => {
    const updatedNeutral = neutral + 1 //se crea una variable que actualiza el nuevo valor de la variable neutral (updatedNeutral) que al hacer click le suma uno al valor de neutral
    setNeutral(updatedNeutral) //Llama a la funcion del estado y toma el valor de la nueva variable creada
    const updatedTotal = updatedNeutral+good+bad //se crea una nueva variable  (updatedTotal) que su valor será la suma del valor actualizado de neutral y los otros dos comentarios (good y bad)
    setTotal(updatedTotal) //Llama a la funcion del estado Total y toma el nuevo valor de la variable creada
    setPromedio((updatedNeutral*0+good*1+bad*-1) /updatedTotal) //Llama a la funcion del estado promedio y le dice que tome el valor de la suma de la variable neutral actualizado y las otras dos con las clasificaciones predeterminadas entre la cantidad total de comentarios
    setPositivo((good / updatedTotal) * 100) //Llama a la funcion del estado positivo y le dice que tome el valor de dividir el valor actualizado de good y el valor actualizado del total multiplicado por 100 (Esto es para determinar porcentaje)
  }
  
//Funcion para manejar el boton de clickear los comentarios bad
  const handleClickBad = () => {
    const updatedBad = bad + 1 //se crea una variable que actualiza el nuevo valor de la variable bad (updatedBad) que al hacer click le suma uno al valor de neutral
    setBad(updatedBad) //Llama a la funcion del estado y toma el valor de la nueva variable creada
    const updatedTotal = updatedBad+good+neutral //se crea una nueva variable  (updatedTotal) que su valor será la suma del valor actualizado de bad y los otros dos comentarios (good y neutral)
    setTotal(updatedTotal) //Llama a la funcion del estado Total y toma el nuevo valor de la variable creada
    setPromedio((updatedBad*-1+good*1+neutral*0) /updatedTotal) //Llama a la funcion del estado promedio y le dice que tome el valor de la suma de la variable bad actualizado y las otras dos con las clasificaciones predeterminadas entre la cantidad total de comentarios
    setPositivo((good / updatedTotal) * 100) //Llama a la funcion del estado positivo y le dice que tome el valor de dividir el valor actualizado de good y el valor actualizado del total multiplicado por 100 (Esto es para determinar porcentaje)
  }

  //Variable con un array o lista con las anecdotas predeterminadas (8)
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  //Funcion para seleccionar una anecdota aleatoria dentro del arrya
  const handleRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }
  //Funcion que permite votar por cada anecdota del array y sumar los votos
  const handleVotes = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected] += 1;
    setVotes(updatedVotes);
  };
  

  return ( //Renderiza la aplicación App
    <div>
      <h1>Give FeedBack</h1>
      <Button onClick={handleClickGood} text="Good" />
      <Button onClick={handleClickNeutral} text="Neutral" />
      <Button onClick={handleClickBad} text="Bad" />
      <Statistics 
        good={good} 
        neutral={neutral} 
        bad={bad} 
        total={total} 
        promedio={promedio} 
        positivo={positivo} 
      />
      <Anecdotas anecdotes={anecdotes}
      votes={selected === null ? 0 : votes[selected]}
      selected={selected}
      handleRandomAnecdote={handleRandomAnecdote}
      handleVotes={handleVotes} />
      <AnecdoteWithMostVotes anecdotes={anecdotes} votes={votes} />
      
    </div>
  )
  
}







// Exportación de la aplicación
export default App

