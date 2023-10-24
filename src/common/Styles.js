import { Dimensions } from 'react-native'
import Color from './Color'
import Constants from './Constant'
import Device from './Device'

const { height, width } = Dimensions.get('window')

const Styles = {
  height: height,
  width: width,
  modalHeaderHeight: Platform.OS !== 'ios' ? 0 : Device.isIphoneX ? 20 : 0,
  elevation: {
    elevation: Constants.cardElevation,
    shadowColor: Color.ShadowColor,
    shadowOffset: { height: 0 },
    shadowOpacity: Constants.iosCardElevationOpacity
  },
  flexBTW: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  flexCEN: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  flexINI: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  flexARD: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  ProdName: {
    fontSize: 15,
    color: Color.TextSecondary,
    fontFamily: Constants.fontFamilyRegular
  },
  footerBtn: {
    height: 50,
    padding: 10,
    borderRadius: 6
  }
}

export default Styles
