import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import promise from 'redux-promise-middleware'
import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore
} from 'redux'
import reducers from '../redux'
import './../../ReactotronConfig'

var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent
var logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true
})

const middleware = [
  promise,
  thunk,
  logger
  // more middleware
]

const configureStore = () => {
  let store = null
  if (__DEV__) {
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    store = composeEnhancers(applyMiddleware(...middleware))(createStore)(
      reducers
    )

    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept(reducers, () => {
        const nextRootReducer = reducers
        store.replaceReducer(nextRootReducer)
      })
    }

    global.XMLHttpRequest = global.originalXMLHttpRequest
      ? global.originalXMLHttpRequest
      : global.XMLHttpRequest
    global.FormData = global.originalFormData
      ? global.originalFormData
      : global.FormData
  } else {
    store = compose(applyMiddleware(...middleware))(createStore)(reducers)
  }
  return store
}

export default configureStore()
