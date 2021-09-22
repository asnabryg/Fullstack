
import React from 'react'
import { connect } from "react-redux"
import { setNotification } from '../reducers/notificationReducer'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <>
      {props.notification.text
        ?
        <div style={style}>
          {props.notification.text}
        </div>
        :
        null}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const mapDispatchToProps = {
  setNotification
}

const ConnectedNotification = connect(mapStateToProps, mapDispatchToProps)(Notification)
export default ConnectedNotification