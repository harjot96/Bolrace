import { Config } from '../../../common'
import fetchFromApiServer from '../../../services/Api'

export function getPaymentData(data) {
  var url = Config.APIConfig.userUrl + 'payment'
  return {
    type: 'PAYMENT_DATA',
    payload: fetchFromApiServer('MULTIPART', url, data)
  }
}

export function getLogoData(data) {
  var url = Config.APIConfig.userUrl + 'centerlogo'
  return {
    type: 'LOGO_DATA',
    payload: fetchFromApiServer('MULTIPART', url, data)
  }
}

export function getHotSelectionData(data) {
  var url = Config.APIConfig.userUrl + 'hotselection'
  return {
    type: 'HOT_SELECT_DATA',
    payload: fetchFromApiServer('MULTIPART', url, data)
  }
}

export function getOddsData(data) {
  var url = Config.APIConfig.userUrl + 'odds-app'
  return {
    type: 'HOT_OODS_DATA',
    payload: fetchFromApiServer('MULTIPART', url, data)
  }
}
