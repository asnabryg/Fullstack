import React, { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => setGood(good + 1)
  const addNeutral = () => setNeutral(neutral + 1)
  const addBad = () => setBad(bad + 1)

  const sum = good + neutral + bad
  const average = (good - bad) / sum
  const positive = (good / sum) * 100
  

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={addGood} text="good"/>
      <Button handleClick={addNeutral} text="neutral" />
      <Button handleClick={addBad} text="bad" />

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={sum}
        average={average}
        positive={positive}
      />
    </>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>
        {text}
      </td>
      <td>
        {value}
      </td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.all === 0){
    return (
      <div>
        <h1>statistic</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>statistic</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={props.all} />
          <StatisticLine text="average" value={props.average} />
          <StatisticLine text="positive" value={props.positive + " %"} />
        </tbody>
      </table>
    </div>
  )
}

export default App
