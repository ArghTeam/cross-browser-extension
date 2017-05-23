import React from 'react'
import { connect } from 'react-redux'
import Notification from '../Notification/Notification'

const NotificationHolder = props => <Notification notification={props.notification}/>

const stateProps = state => {
  return {
    notification: state.notification
  }
}

export default connect(stateProps)(NotificationHolder)
