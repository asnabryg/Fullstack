/* eslint-disable */

export const setNotification = (notification, color, seconds) => {
  console.log('asd 2')
  return async dispatch => {
    console.log('asd 3')
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
    console.log('asd 4')
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
  console.log('0000')
  switch (action.type) {
    case "SET_NOTIFICATION":
      console.log('1111')
      if (action.notification.timeHandle) {
        console.log('2222')
        clearTimeout(state.timeHandle)
      }
      console.log('3333')
      return action.notification
    
    default:
      console.log('default')
      return state
  }
}

export default reducer