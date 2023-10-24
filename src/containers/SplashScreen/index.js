import React, { useEffect, useState } from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  ActivityIndicator,
  Animated,
  StatusBar
} from 'react-native'
import { Images, Color, Config, Constants, Device } from '@common'
import { Text } from '@components'
const { width, height } = Dimensions.get('window')

const SplashScreen = ({ isStoreRehydrated }) => {
  const [showModal, setShowModal] = useState(true)
  const [hasAnimationPlayedOnce, setHasAnimationPlayedOnce] = useState(false)
  const [SlideInTop] = useState(new Animated.Value(0))
  const [SlideInRight] = useState(new Animated.Value(0))
  const [SlideInLeft] = useState(new Animated.Value(0))
  const [SlideInUp] = useState(new Animated.Value(0))

  useEffect(() => {
    start()
    if (hasAnimationPlayedOnce && isStoreRehydrated) {
      setTimeout(() => {
        setShowModal(false)
        handleAnimationFinish()
      }, 900)
    } else if (isStoreRehydrated) {
      setTimeout(() => {
        setShowModal(false)
        handleAnimationFinish()
      }, 1800)
    }
  }, [isStoreRehydrated])

  const handleAnimationFinish = () => {
    setHasAnimationPlayedOnce(true)
  }

  const isModalVisible = showModal && !hasAnimationPlayedOnce
  const start = () => {
    return Animated.parallel([
      Animated.timing(SlideInTop, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true
      }),
      Animated.timing(SlideInLeft, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true
      }),
      Animated.timing(SlideInRight, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true
      }),
      Animated.timing(SlideInUp, {
        toValue: 1,
        duration: 1700,
        useNativeDriver: true
      })
    ]).start()
  }

  return isModalVisible ? (
    <View style={styles.SplashScreen_RootView}>
      <StatusBar
        barStyle="light-content"
        animated
        hidden={Device.isIphoneX ? false : !Config.showStatusBar}
        backgroundColor={Color.statusBar}
      />

      <View style={styles.SplashScreen_ChildView}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 10,
            paddingVertical: 10
          }}>
          <View style={{ flex: 0.5, backgroundColor: Color.background }}>
            <Animated.Text
              style={{
                transform: [
                  {
                    translateY: SlideInTop.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-600, 0]
                    })
                  },
                  {
                    scale: SlideInLeft.interpolate({
                      inputRange: [0, 1],
                      outputRange: [4, 1]
                    })
                  }
                ],
                color: Color.primary,
                fontFamily: Constants.fontFamilyMedium,
                fontSize: 22,
                paddingTop: 70,
                paddingHorizontal: 20
              }}>
              Welcome to
            </Animated.Text>

            <View style={{ flexDirection: 'row' }}>
              <Animated.Text
                style={{
                  transform: [
                    {
                      translateX: SlideInLeft.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-600, 0]
                      })
                    },
                    {
                      scale: SlideInUp.interpolate({
                        inputRange: [0, 1],
                        outputRange: [2, 1]
                      })
                    }
                  ],
                  color: Color.primary,
                  fontFamily: Constants.fontFamilyMedium,
                  fontWeight: '700',
                  fontSize: 25,
                  paddingHorizontal: 20
                }}>
                {Config.ApplicationName}
              </Animated.Text>
            </View>
          </View>

          <View style={{ flex: 0.9, backgroundColor: Color.background }}>
            <Image style={styles.image} source={Images.centerLogo} />
            <Text style={styles.pleaseWaitTxt}>Please wait...</Text>

            <ActivityIndicator
              size="large"
              animating={true}
              color={Color.primary}
            />
          </View>
        </View>
      </View>
    </View>
  ) : null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height
  },
  image: {
    width: (width * 100) / 100,
    height: 140,
    resizeMode: 'contain',
    marginTop: 70
  },
  SplashScreen_RootView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: height + 20,
    zIndex: 99999
  },

  SplashScreen_ChildView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    zIndex: 99999
  },
  pleaseWaitTxt: {
    color: Color.primary,
    fontSize: 18,
    textAlign: 'center',
    padding: 20,
    marginTop: 50,
    fontFamily: Constants.fontFamilyRegular
  }
})

export default SplashScreen
