
import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { setNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  // const dispatch = useDispatch()
  // if (notification) {
  //   setTimeout(() => {
  //     dispatch(setNotification(null))
  //   }, 5000)
  // }
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <>
      {notification
        ?
        <div style={style}>
          {notification}
        </div>
        :
        null}
    </>
  )
}

export default Notification