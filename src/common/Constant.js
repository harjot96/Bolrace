import { Dimensions, Platform } from 'react-native'
const { width, height } = Dimensions.get('window')

const Constants = {
  Key: '@MyEcomStorageT2:serviceKey',

  fontFamily: Platform.OS === 'android' ? 'sans-serif' : 'Gill Sans',

  fontFamilyLight:
    Platform.OS === 'android' ? 'sans-serif-light' : 'PingFangTC-Light',

  fontFamilyRegular:
    Platform.OS === 'android' ? 'sans-serif' : 'PingFangTC-Regular',

  fontFamilyMedium:
    Platform.OS === 'android' ? 'sans-serif-medium' : 'PingFangTC-Medium',

  fontXS: 8,
  fontSM: 10,
  fontMD: 12,
  fontMDS: 13,
  fontLG: 14,
  fontXL: 16,
  fontBig: 18,
  fontH1: 25,
  fontH2: 30,

  SplashScreen: {
    Duration: 2000
  },

  Dimension: {
    ScreenWidth(percent = 1) {
      return Dimensions.get('window').width * percent
    },
    ScreenHeight(percent = 1) {
      return Dimensions.get('window').height * percent
    }
  },

  Window: {
    width: width,
    height: height,
    headerHeight: (65 * height) / 100,
    headerBannerAndroid: (55 * height) / 100,
    profileHeight: (45 * height) / 100
  }
}

export default Constants
