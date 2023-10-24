import { Config } from '../common'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

getAuthKey = async () => {
  try {
    const value = await AsyncStorage.getItem(Config.Key)

    if (value !== null) {
      return value
    } else {
      return null
    }
  } catch (error) {
    return null
  }
}

const fetchFromApiServer = (requestType, url, data, options) => {
  return getAuthKey().then(authKey => {
    return fetchApiWrapper(authKey, url, requestType, data, options)
  })
}

function _getHeaderConfig(serviceKey, requestType, options) {
  var config = {
    headers: {
      'Content-Type':
        requestType === 'MULTIPART' ? 'multipart/form-data' : 'application/json'
    },
    params: { ...options }
  }
  if (serviceKey && serviceKey !== null) {
    config = {
      headers: {
        'Content-Type':
          requestType === 'MULTIPART'
            ? 'multipart/form-data'
            : 'application/json'
      },
      params: { ...options }
    }
  }
  return config
}

const fetchApiWrapper = (headerItems, uri, requestType, data, options = {}) => {
  const url = uri

  const config = _getHeaderConfig(headerItems, requestType, options)

  if (requestType === 'GET') {
    return axios({ url, method: 'get', ...config })
  } else if (requestType === 'POST') {
    return axios({ url, method: 'post', data, ...config })
  } else if (requestType === 'MULTIPART') {
    return axios({ url, method: 'post', data, ...config })
  } else if (requestType === 'DELETE') {
    return axios({ url, method: 'delete', data, ...config })
  } else if (requestType === 'PUT') {
    return axios({ url, method: 'put', data, ...config })
  }
}

export default fetchFromApiServer
