import anecdotesService from "../services/anecdotes"

export const voteAnecdote = (id) => {
  return async dispatch => {
    const allAnecdotes = await anecdotesService.getAll()
    const anectodeToChange = allAnecdotes.find(a => a.id === id)
    const changedAnectode = {
      ...anectodeToChange,
      votes: anectodeToChange.votes + 1
    }
    const votedAnectode = await anecdotesService.updateAnecdote(id, changedAnectode)
    dispatch({
      type: "VOTE",
      data: {
        anecdote: votedAnectode
      }
    })
  }
}

export const createAnectode = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createAnecdote(content)
    dispatch({
      type: "ADD",
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes
    })
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case "VOTE":
      return state.map(
        a => a.id === action.data.anecdote.id ? action.data.anecdote : a
      )

    case "ADD":
      return state.concat(action.data)

    case "INIT_ANECDOTES":
      return action.data

    default:
      return state
  }
}

export default reducer