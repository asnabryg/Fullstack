/* eslint-disable */
import React from "react";
import { connect } from "react-redux"
import { setNotification } from "../reducers/notificationReducer";

const Notification = (props) => {
    console.log('NOTFICATION', props)
    if (!props.notification.text) {
        return null
    }
    return (
        <div className="notification" style={{ color: props.notification.color }}>
            {props.notification.text}
        </div>
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

const ConnectedNotfication = connect(mapStateToProps, mapDispatchToProps)(Notification)
export default ConnectedNotfication