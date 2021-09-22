import React from "react"
import { connect } from "react-redux"
import { createAnectode } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = (props) => {

  const addAnectode = async (event) => {
    event.preventDefault()
    const content = event.target.anectode.value
    event.target.anectode.value = ""
    props.createAnectode(content)
    props.setNotification(`you added ${content}`, 5)
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

const mapDispatchToProps = {
  createAnectode,
  setNotification
}

const ConnectedAnecdoteFrom = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteFrom