const INITIAL_STATE = {
  current: [],
  DDD: ['isRed', 'isGreen', 'isPurple', 'isOrder'],
  color: null,
  id: null
}

export const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CLICK_GOOD':
      return { ...state, color: action.click }
    default:
      return state
  }
}
