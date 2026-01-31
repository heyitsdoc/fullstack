import Hearder from "./componets/Header"
import Total from "./componets/Total"
import Content from "./componets/Content" 

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

  return (
    <div>
      <Hearder course={course} />
      <Content parts={parts}/>      
      <Total parts={parts} />
    </div>
  )
}

export default App