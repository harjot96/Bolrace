import AsyncStorage from '@react-native-async-storage/async-storage'
import { Config } from '../../../common'

const initialState = {
  isLoggedIn: false,
  raceData: {},
  previousData: [],
  upcomingData: [],
  sliderData: [],
  message: '',
  updateApp: {}
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
        raceData: action.payload.data?.data,
        previousData: action.payload.data?.data?.previous || [],
        upcomingData: action.payload.data?.data?.upcoming || [],
        updateApp: action.payload.data?.data?.update || {}
      }
    case 'RACE_DATA_REJECTED':
      return { ...state, isLoading: false }

    case 'SLIDER_DATA_PENDING':
      return {
        ...state,
        isLoading: true,
        sliderData: []
      }
    case 'SLIDER_DATA_FULFILLED':
      return {
        ...state,
        isLoading: true,
        sliderData: action.payload.data?.data?.slider,
        message: action.payload.data?.data?.message
      }
    case 'SLIDER_DATA_REJECTED':
      return { ...state, isLoading: false }

    default:
      return state
  }
}
