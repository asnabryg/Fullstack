import React from "react"
import { useDispatch } from "react-redux"
import { createAnectode } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addAnectode = (event) => {
    event.preventDefault()
    const content = event.target.anectode.value
    event.target.anectode.value = ""
    dispatch(createAnectode(content))
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