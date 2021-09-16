import React from "react"
import { useDispatch } from "react-redux"
import { createAnectode } from "../reducers/anecdoteReducer"
import anecdoteService from "../services/anecdotes"

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addAnectode = async (event) => {
    event.preventDefault()
    const content = event.target.anectode.value
    event.target.anectode.value = ""
    const newAnecdote = await anecdoteService.createAnecdote(content)
    console.log("NEW ANECDOTE", newAnecdote)
    dispatch(createAnectode(newAnecdote))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnectode}>
        <div><input name="anectode" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm