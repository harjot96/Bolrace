import { Config } from '../../../common'
import fetchFromApiServer from '../../../services/Api'

export function getWebUrlData(data) {
  var url = Config.APIConfig.userUrl + 'externalurl'
  return {
    type: 'URL_DATA',
    payload: fetchFromApiServer('MULTIPART', url, data)
  }
}

export function getCalanderData(data) {
  var url = Config.APIConfig.userUrl + 'getfixtures'
  return {
    type: 'CALANDER_DATA',
    payload: fetchFromApiServer('MULTIPART', url, data)
  }
}

export function getTermsData(data) {
  var url = Config.APIConfig.userUrl + 'terms'
  return {
    type: 'TERMS_DATA',
    payload: fetchFromApiServer('MULTIPART', url, data)
  }
}

export function updateProfile(data) {
  var url = Config.APIConfig.userUrl + 'update-user-info'
  return {
    type: 'UPDATE_PROFILE_DATA',
    payload: fetchFromApiServer('MULTIPART', url, data)
  }
}
