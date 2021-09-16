
export const voteAnecdote = (id, anecdote) => {
  return {
    type: "VOTE",
    data: {
      id,
      anecdote
    }
  }
}

export const createAnectode = (anecdote) => {
  return {
    type: "ADD",
    data: anecdote
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: "INIT_ANECDOTES",
    data: anecdotes
  }
}

const reducer = (state=[], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case "VOTE":
      const anectodeToChange = state.find(a => a.id === action.data.id)
      const changedAnectode = {
        ...anectodeToChange,
        votes: anectodeToChange.votes + 1
      }
      return state.map(
        a => a.id === action.data.id ? changedAnectode : a
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