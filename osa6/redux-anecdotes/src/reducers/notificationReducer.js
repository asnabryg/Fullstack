
export const setNotification = (notification) => {
  // if notification is null, the notification is not displayed.
  // notification is always displayed only 5 seconds
  return {
    type: "SET_NOTIFICATION",
    notification: notification
  }
}

const reducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.notification
    
    case "VOTE":
      return `you voted '${action.data.anecdote}'`
    
    case "ADD":
      return `you added '${action.data.content}'`

    default:
      return state
  }
}

export default reducer