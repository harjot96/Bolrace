import { persistCombineReducers, REHYDRATE } from 'redux-persist'
import { appReducer } from './app'
import { reducer as login } from '../modules/login/reducer'
import { reducer as home } from '../modules/home/reducer'
import { reducer as menu } from '../modules/menu/reducer'

import AsyncStorage from '@react-native-async-storage/async-storage'

const config = {
  key: 'root',
  storage: AsyncStorage,
  timeout: 500,
  blacklist: ['']
}

export default persistCombineReducers(config, {
  app: appReducer,
  login,
  home,
  menu
})
