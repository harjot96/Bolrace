import fetchFromApiServer from '../../../services/Api'
import { Config } from '../../../common'

export function validateUser(data) {
  var url = Config.APIConfig.userUrl + 'applogin'
  return {
    type: 'VALIDATE_USER',
    payload: fetchFromApiServer('MULTIPART', url, data)
  }
}

export function registerUser(data) {
  var url = Config.APIConfig.userUrl + 'register'
  return {
    type: 'REGISTER_USER',
    payload: fetchFromApiServer('MULTIPART', url, data)
  }
}
export function storeDeviceFCMToken(deviceToken) {
  return {
    type: 'REGISTERED_PUSH_NOTIFICATIONS',
    payload: deviceToken
  }
}

export function fetchSocialLogin(data) {
  var url = Config.APIConfig.userUrl + 'socialLogin'
  return {
    type: 'VALIDATE_USER',
    payload: fetchFromApiServer('MULTIPART', url, data)
  }
}

export function verifyOtp(data) {
  var url = Config.APIConfig.userUrl + 'appverifyotp'
  return {
    type: 'VARIFY_OTP',
    payload: fetchFromApiServer('MULTIPART', url, data)
  }
}

export function resendOtp(data) {
  var url = Config.APIConfig.userUrl + 'resendOtp'
  return {
    type: 'VARIFY_OTP',
    payload: fetchFromApiServer('MULTIPART', url, data)
  }
}

export function changePassword(data) {
  var url = Config.APIConfig.userUrl + 'appvchangepassword'
  return {
    type: 'CHANGE_PASSWORD',
    payload: fetchFromApiServer('MULTIPART', url, data)
  }
}

export function updateProfileLocally(data) {
  return {
    type: 'UPDATE_PROFILE_LOCAL',
    payload: data
  }
}

export function logout() {
  return {
    type: 'LOGOUT'
  }
}
export function loginUser() {
  return {
    type: 'LOGIN'
  }
}
