import React from 'react'

const Header = (props) =>{
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.name} {props.exercises}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.content[0][0]} exercises={props.content[0][1]}/>
      <Part name={props.content[1][0]} exercises={props.content[1][1]} />
      <Part name={props.content[2][0]} exercises={props.content[2][1]} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.exercises[0] + props.exercises[1] + props.exercises[2]}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
      <Header course={course}/>
      <Content content={[[part1, exercises1],
                        [part2, exercises2],
                        [part3, exercises3]]}/>
      <Total exercises={[exercises1, exercises2, exercises3]}/>
    </>
  )
}

export default App