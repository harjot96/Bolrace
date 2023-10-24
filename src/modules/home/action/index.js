import { Config } from '../../../common'
import fetchFromApiServer from '../../../services/Api'

export function getRaceData(data) {
  var url = Config.APIConfig.baseUrl + 'raceinfo/getRaceLists'
  return {
    type: 'RACE_DATA',
    payload: fetchFromApiServer('MULTIPART', url, data)
  }
}

export function getSliderData(data) {
  var url = Config.APIConfig.userUrl + 'slider'
  return {
    type: 'SLIDER_DATA',
    payload: fetchFromApiServer('MULTIPART', url, data)
  }
}
