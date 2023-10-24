import React, { useEffect } from 'react'
import { NativeModules, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import Toast from 'react-native-toast-message'
import store from './store/configureStore'
import PushNotification from './PushNotification'
import Navigation from './navigation'
import InternetInfo from './containers/InternetInfo'
import { Color } from './common'

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      NativeModules.SplashScreen.hide()
    }, 500)
  }, [])

  const persistor = persistStore(store)
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <InternetInfo />
        <StatusBar
          animated={true}
          backgroundColor={Color.mainPrimary}
          hidden={false}
        />
        <Navigation />
        <PushNotification />
        <Toast visibilityTime={300} autoHide={true} />
      </PersistGate>
    </Provider>
  )
}

export default App
