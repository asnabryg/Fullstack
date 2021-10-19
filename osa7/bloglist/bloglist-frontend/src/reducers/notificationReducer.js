/* eslint-disable */

export const setNotification = (notification, color, seconds) => {
  return async dispatch => {
    const timeHandle = setTimeout(() => {
      dispatch({
        type: "SET_NOTIFICATION",
        notification: {
          text: null,
          color: null,
          timeHandle: null
        }
      })
    }, seconds * 1000)
    dispatch({
      type: "SET_NOTIFICATION",
      notification: {
        text: notification,
        color,
        timeHandle
      }
    })
  }
}

const reducer = (state = { text: null, color: null, notification: null }, action) => {
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