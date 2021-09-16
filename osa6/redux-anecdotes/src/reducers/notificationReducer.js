
export const setNotification = (notification, seconds) => {
  // if notification is null, the notification is not displayed.
  // notification is always displayed only 5 seconds
  return async dispatch => {
    dispatch({
      type: "SET_NOTIFICATION",
      notification: notification
    })
    setTimeout(() => {
      dispatch({
        type: "SET_NOTIFICATION",
        notification: null
      })
    }, seconds * 1000)
  }
}

const reducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.notification

    default:
      return state
  }
}

export default reducer