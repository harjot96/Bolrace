import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Image, ImageBackground, StyleSheet, View } from 'react-native'
import { RippleEffect, Spinner, Text } from '../../../component'
import Color from '../../../common/Color'
import { useDispatch, useSelector } from 'react-redux'
import { Config, Constants, Device, Images } from '../../../common'
import {
  getLogoData,
  getPaymentData,
  getRaceData,
  getSliderData
} from '../action'
import { useNavigation } from '@react-navigation/native'
import MenuCard from '../component/MenuCard'
import Tabs from '../component/Tabs'
import { dateFormat } from '../../../utils'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { logout } from '../../login/action'
import Toast from 'react-native-toast-message'

const MainScreen = props => {
  const slotData = props.route.params.Slot
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const { userData } = useSelector(state => state.login)
  const [isLoading, setLoading] = useState(false)
  const [logo, setLogo] = useState('')

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
          <Text style={styles.headerMain}>{slotData.label}</Text>
          <Text style={styles.headerSub}>
            {dateFormat(slotData.rdate, 'DD-MMM-YYYY')}
          </Text>
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
          <LogoHeader {...props} />
          <View style={styles.overlay} />
        </ImageBackground>
      )
    })
  }, [navigation])

  useEffect(() => {
    getLogo()
  }, [])

  const getLogo = () => {
    var formData = new FormData()
    formData.append('center', slotData.place)
    formData.append('token', 'horseridingv1')
    formData.append('authToken', userData.token)
    dispatch(getLogoData(formData)).then(res => {
      if (res.value.data?.statuscode === 200) {
        setLogo(res.value.data?.data)
      } else if (res.value.data?.statuscode === 201) {
        Toast.show({
          position: 'bottom',
          type: 'error',
          text1: res.value.data?.message,
          visibilityTime: 1000
        })
      } else if (res.value.data?.statuscode === 403) {
        dispatch(logout())
        navigation.navigate('Login')
      }
    })
  }
  const onRaceCard = cardItem => {
    var formData = new FormData()
    formData.append('racedate', slotData.rdate)
    formData.append('center', slotData.place)
    formData.append('season', slotData.season)
    formData.append('authToken', userData.token)
    formData.append('token', 'horseridingv1')
    formData.append('userid', userData.user)
    dispatch(getPaymentData(formData)).then(res => {
      if (res.value.data?.statuscode === 200) {
        openCard(cardItem)
        Toast.show({
          position: 'bottom',
          text1: res.value.data?.message,
          visibilityTime: 1000
        })
      } else if (res.value.data?.statuscode === 201) {
        Toast.show({
          position: 'bottom',
          text1: res.value.data?.message,
          visibilityTime: 1000
        })
      } else if (res.value.data?.statuscode === 403) {
        dispatch(logout())
        navigation.navigate('Login')
      } else {
        Toast.show({
          position: 'bottom',
          type: 'error',
          text1: res.value.data?.message,
          visibilityTime: 1000
        })
      }
    })
  }

  const openCard = cardItem => {
    const url =
      Config.APIConfig.baseUrl +
      cardItem.value +
      '?session=' +
      slotData.season +
      '&rdate=' +
      slotData.rdate +
      '&rcount=5&center=' +
      slotData.place +
      '&token=' +
      userData.token

    navigation.navigate('web', {
      url: url,
      headerName: cardItem.name
    })
  }

  return (
    <View style={styles.container}>
      {isLoading ? <Spinner /> : null}
      <View style={{ flex: 2 }}>
        <MenuCard onSlot={onRaceCard} logo={logo} />
      </View>
      <View style={styles.tabContainer}>
        <Tabs slotData={slotData} setLoading={setLoading} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.Background,
    position: 'relative'
  },
  tabContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 0
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

export default MainScreen
