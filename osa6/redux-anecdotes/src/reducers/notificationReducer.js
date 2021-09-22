
export const setNotification = (notification, seconds) => {
  // if notification is null, the notification is not displayed.
  // notification is always displayed only 5 seconds
  return async dispatch => {
    const timeHandle = setTimeout(() => {
      dispatch({
        type: "SET_NOTIFICATION",
        notification: {
          text: null,
          timeHandle: null
        }
      })
    }, seconds * 1000)
    dispatch({
      type: "SET_NOTIFICATION",
      notification: {
        text: notification,
        timeHandle
      }
    })
  }
}

const reducer = (state = { text: null, timeHandle: null }, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      if (action.notification.timeHandle) {
        clearTimeout(state.timeHandle)
      }
      return action.notification

    default:
      return state
  }
}

export default reducer