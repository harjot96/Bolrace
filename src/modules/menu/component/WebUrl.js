import React, { useLayoutEffect } from 'react'
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native'
import { Color, Constants, Device, Images, Styles } from '../../../common'
import { useNavigation } from '@react-navigation/native'
import HTML from 'react-native-render-html'
import { RippleEffect, Text } from '../../../component'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function WebUrl(props) {
  const data = props.route.params.data
  const Title = props.route.params.title
  const navigation = useNavigation()

  const onBack = () => {
    navigation.goBack(null)
  }

  const LogoHeader = () => {
    const headerTitle =
      Title === 'term' ? 'Terms & Condition' : 'Privacy Policy'
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          zIndex: 2
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
          <Text style={styles.headerMain}>{headerTitle}</Text>
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
            justifyContent: 'center',
            paddingTop: Device.isIOS ? 50 : 0
          }}
          source={Images.termsBg}>
          <LogoHeader {...props} />
          <View style={styles.overlay} />
        </ImageBackground>
      )
    })
  }, [navigation])

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <HTML source={{ html: data }} contentWidth={Styles.width} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 15,
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
