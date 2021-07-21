import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const newRandom = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const addVote = () => {
    const newVotes = [...votes]
    newVotes[selected] = newVotes[selected] + 1
    setVotes(newVotes)
  }
  
  const mostVotesIndex = () => {
    let most = 0;
    let index = 0;
    for(let i=0; i<votes.length; i++){
      if (most < votes[i]){
        most = votes[i]
        index = i
      }
    }
    return index
  }

  return (
    <div>
      <h1>Anecdote of day</h1>
      {anecdotes[selected]}<br/>
      has {votes[selected]} votes<br/>
      <Button handleClick={addVote} text="vote"/>
      <Button handleClick={newRandom} text="next anecdote"/>
      <MostVotes anecdote={anecdotes[mostVotesIndex()]}/>
    </div>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const MostVotes = ({anecdote}) => {
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdote}</p>
    </div>
  )
}

export default App