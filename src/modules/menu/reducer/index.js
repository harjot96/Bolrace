import AsyncStorage from '@react-native-async-storage/async-storage'
import { Config } from '../../../common'

const initialState = {
  isLoggedIn: false,
  raceData: {}
}

export const reducer = (state = initialState, action) => {
  const { type } = action
  switch (type) {
    case 'RACE_DATA_PENDING':
      return { ...state, isLoading: true, raceData: {} }
    case 'RACE_DATA_FULFILLED':
      return {
        ...state,
        isLoading: true,
        raceData: action.payload.data?.data
      }
    case 'RACE_DATA_REJECTED':
      return { ...state, isLoading: false }

    default:
      return state
  }
}
