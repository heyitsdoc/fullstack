import Hearder from "./componets/Header"
import Total from "./componets/Total"
import Content from "./componets/Content" 

const App = () => {
   const course = {
    name: 'Half Stack application development',
    parts: [
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
  }


  return (
    <div>
      <Hearder course={course.name} />
      <Content parts={course.parts}/>      
      <Total parts={course.parts} />
    </div>
  )
}

export default App