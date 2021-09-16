import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification} from "../reducers/notificationReducer"

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
    dispatch(voteAnecdote(anecdote.id, anecdote.content))
    dispatch(setNotification(`you voted ${anecdote.content}`, 5))
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