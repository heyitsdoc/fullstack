import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const StatisticLine = (props) => {
    return (
      <p>{props.text} {props.value}</p> 
    )
  }
  const Statistics = (props) => {
    if (good + neutral + bad === 0) {
      return (
        <>
        <h1>statistics</h1>
        <p>No feedback given</p>
        </>
      )
    }
    else;
      return (
      <>
      <h1>statistics</h1>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={good + neutral + bad} />
      <StatisticLine text="average" value={(good - bad) / (good + neutral + bad)} />
      <StatisticLine text="positive" value={`${((good / (good + neutral + bad)) * 100) || 0} %`} />
      </>
        )
  }
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics />
    </div>
  )
}

export default App