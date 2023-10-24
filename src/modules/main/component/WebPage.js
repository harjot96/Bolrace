import React, { useLayoutEffect } from 'react'
import { Image, ImageBackground, StyleSheet, View } from 'react-native'
import { WebView } from 'react-native-webview'
import { Color, Constants, Device, Images } from '../../../common'
import { useNavigation } from '@react-navigation/native'
import { RippleEffect, Text } from '../../../component'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { dateFormat } from '../../../utils'

export default function WebPage(props) {
  const URL = props.route.params.url
  const headerName = props.route.params.headerName
  const navigation = useNavigation()

  const onBack = () => {
    navigation.goBack(null)
  }

  const LogoHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          zIndex: 2,
          paddingTop: Device.isIOS ? 50 : 0
        }}>
        <RippleEffect onPress={onBack}>
          <Ionicons
            name="md-arrow-back-outline"
            size={24}
            color={Color.Background}
            style={{ paddingHorizontal: 20 }}
          />
        </RippleEffect>
        <View>
          <Text style={styles.headerMain}>{headerName}</Text>
        </View>
      </View>
    )
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      // header: props => <LogoTitle {...props} />,
      headerBackground: () => (
        <ImageBackground
          style={{
            height: '100%',
            width: '100%',
            flex: 1,
            justifyContent: 'center'
          }}
          source={Images.horse1}>
          <LogoHeader />
          <View style={styles.overlay} />
        </ImageBackground>
      )
    })
  }, [navigation])

  return (
    <View style={styles.mainContainer}>
      <View style={{ flex: 1 }}>
        <WebView
          source={{
            uri: URL
          }}
          setDisplayZoomControls={true}
          setBuiltInZoomControls={true}
          style={{}}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.Background,
    position: 'relative'
  },
  headerMain: {
    color: Color.Background,
    fontFamily: Constants.fontFamilyMedium,
    fontSize: Constants.fontXL,
    zIndex: 2
  },
  headerSub: {
    color: Color.Background,
    fontFamily: Constants.fontFamilyMedium,
    fontSize: Constants.fontMD,
    paddingTop: 1,
    zIndex: 2
  },
  overlay: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(185,25,25,0.7)'
  }
})
