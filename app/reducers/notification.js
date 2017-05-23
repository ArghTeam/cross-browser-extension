const initialState = {}

const notification = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return { ...action.options, active: true }
    case 'HIDE_NOTIFICATION':
      return { active: false }
    default:
      return state
  }
}

export default notification