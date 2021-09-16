import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {

  let anecdotes = useSelector(state => state.anecdotes)
  anecdotes = anecdotes.sort((a, b) => {
    return b.votes - a.votes
  })
  const filter = useSelector(state => state.filter)
  if (filter) {
    anecdotes = anecdotes.filter(a =>
      a.content.toLowerCase().includes(filter.toLowerCase()))
  }

  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch(voteAnecdote(anecdote.id, anecdote.content))
  }
  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList