import AsyncStorage from '@react-native-async-storage/async-storage'
import { Config } from '../../../common'

const initialState = {
  isLoading: false,
  userData: {},
  isLoggedIn: false,
  configSetting: { Currency: 'INR' },
  isConnected: true,
  deviceFCMToken: ''
}

export const reducer = (state = initialState, action) => {
  const { type } = action
  switch (type) {
    case 'VALIDATE_USER_PENDING':
      return { ...state, isLoading: true, userData: {} }
    case 'VALIDATE_USER_FULFILLED':
      return { ...state, isLoading: false, userData: action.payload.data?.data }
    case 'VALIDATE_USER_REJECTED':
      return { ...state, isLoading: false }
    case 'UPDATE_PROFILE_LOCAL':
      let user = state.userData
      user.name = action.payload.name
      user.email = action.payload.email
      user.phone = action.payload.phone
      return { ...state, userData: { ...user } }
    case 'LOGIN':
      return { ...state, isLoggedIn: true }
    case 'REGISTERED_PUSH_NOTIFICATIONS':
      return { ...state, deviceFCMToken: action.payload }
    case 'LOGOUT':
      AsyncStorage.removeItem(Config.Key)
      return Object.assign({}, initialState)

    default:
      return state
  }
}
