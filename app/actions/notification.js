let timeout = null

export const showNotification = (options) =>
  dispatch => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      dispatch({ type: 'SHOW_NOTIFICATION', options }) & setTimeout(() => dispatch(hideNotification()), options.timeout || 2000)
    }, 1000)
  }

export const hideNotification = () =>
  dispatch => dispatch({ type: 'HIDE_NOTIFICATION' })