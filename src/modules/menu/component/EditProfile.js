import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  ImageBackground,
  Linking
} from 'react-native'
import { Constants, Images, Color, Styles, Device } from '../../../common'
import { RippleEffect, Spinner, Text } from '../../../component'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { getTermsData, getWebUrlData, updateProfile } from '../action'
import Toast from 'react-native-toast-message'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Foundation from 'react-native-vector-icons/Foundation'
import { updateProfileLocally } from '../../login/action'

export default function EditProfile() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.login)

  const [isLoading, setLoading] = useState(false)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userNumber, setUserNumber] = useState('')
  const [webUrl, setWebUrl] = useState('')
  const [isError, setError] = useState(false)

  const LogoHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          zIndex: 2,
          paddingLeft: 20,
          paddingTop: Device.isIOS ? 50 : 0
        }}>
        <View>
          <Text style={styles.headerMain}>Edit Profile</Text>
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
          source={Images.termsBg}>
          <LogoHeader />
          <View style={styles.overlay} />
        </ImageBackground>
      )
    })
  }, [navigation])

  useLayoutEffect(() => {
    setData()
    fetchData()
  }, [])

  const setData = () => {
    setUserName(userData.name)
    setUserEmail(userData.email)
    setUserNumber(userData.phone)
  }

  const onDelete = () => {}

  const onUpdate = () => {
    if (userName && userEmail) {
      setLoading(true)
      var bodyFormData = new FormData()
      bodyFormData.append('name', userName)
      bodyFormData.append('phone', userNumber)
      bodyFormData.append('mobile', userNumber)
      bodyFormData.append('email', userEmail)
      bodyFormData.append('user', userData.user)
      bodyFormData.append('authToken', userData.token)
      bodyFormData.append('token', 'horseridingv1')
      dispatch(updateProfile(bodyFormData)).then(res => {
        if (res.value.data?.statuscode == 200) {
          dispatch(
            updateProfileLocally({
              name: userName,
              phone: userNumber,
              email: userEmail
            })
          )
          setLoading(false)
          Toast.show({
            position: 'bottom',
            text1: res.value.data?.message,
            visibilityTime: 1000
          })
        } else if (res.value.data?.statuscode == 403) {
          setLoading(false)
          Toast.show({
            position: 'bottom',
            type: 'error',
            text1: res.value.data?.message,
            visibilityTime: 1000
          })
          navigation.navigate('Login')
        } else {
          setLoading(false)
          Toast.show({
            position: 'bottom',
            type: 'error',
            text1: res.value.data?.message,
            visibilityTime: 1000
          })
        }
      })
    } else {
      setError(true)
    }
  }

  const onTerm = value => {
    var bodyFormData = new FormData()
    bodyFormData.append('token', 'horseridingv1')
    bodyFormData.append('type', value)
    dispatch(getTermsData(bodyFormData))
      .then(res => {
        if (res.value.data?.statuscode === 200) {
          navigation.navigate('WebUrl', {
            data: res.value.data?.data,
            title: value
          })
        }
      })
      .catch(err => {})
  }

  const fetchData = () => {
    setLoading(true)
    var bodyFormData = new FormData()
    bodyFormData.append('token', 'horseridingv1')
    dispatch(getWebUrlData(bodyFormData))
      .then(res => {
        if (res.value.data?.statuscode === 200) {
          setWebUrl(res.value.data?.data)
          setLoading(false)
        }
      })
      .catch(err => {
        setLoading(false)
      })
  }

  const onWebUrl = () => {
    Linking.canOpenURL(webUrl)
      .then(() => {
        Linking.openURL(webUrl)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <View style={styles.mainContainer}>
      {isLoading ? <Spinner /> : null}
      <Text style={styles.subLbl}>Update Your Profile</Text>
      <View>
        <View style={styles.inputContainer}>
          <FontAwesome5
            name="user-alt"
            size={18}
            color={Color.mainPrimary}
            style={styles.icStyle}
          />
          <TextInput
            value={userName}
            style={styles.userInput}
            keyboardType={'email-address'}
            autoCapitalize="none"
            placeholder="Name"
            onChangeText={userNumber => {
              setUserName(userNumber)
              setError(false)
            }}
          />
          {isError && userName === '' ? (
            <Text style={styles.errorStyle}>Required*</Text>
          ) : null}
        </View>
        <View style={styles.inputContainer}>
          <Foundation
            name="mail"
            size={24}
            color={Color.mainPrimary}
            style={styles.icStyle}
          />
          <TextInput
            value={userEmail}
            style={styles.userInput}
            keyboardType={'email-address'}
            autoFocus={true}
            autoCapitalize="none"
            placeholder="Email"
            onChangeText={userNumber => {
              setUserEmail(userNumber)
              setError(false)
            }}
          />
          {isError && userEmail === '' ? (
            <Text style={styles.errorStyle}>Required*</Text>
          ) : null}
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome
            name="mobile"
            size={25}
            color={Color.mainPrimary}
            style={[styles.icStyle, { left: 8 }]}
          />
          <TextInput
            value={userNumber}
            style={styles.userInput}
            keyboardType={'numeric'}
            autoFocus={true}
            autoCapitalize="none"
            placeholder="Phone"
            maxLength={11}
            onChangeText={userNumber => {
              setUserNumber(userNumber)
            }}
          />
        </View>
      </View>

      <View style={{ marginVertical: 10 }}>
        <RippleEffect style={styles.button} onPress={() => onUpdate()}>
          <Text style={styles.btnTxt}>Update Profile</Text>
        </RippleEffect>

        <RippleEffect style={styles.button} onPress={() => onDelete()}>
          <Text style={styles.btnTxt}>Delete Profile</Text>
        </RippleEffect>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <RippleEffect onPress={() => onTerm('term')}>
          <Text style={styles.termsTxt}>Terms & Condition</Text>
        </RippleEffect>
        <View style={{ paddingHorizontal: 5 }}>
          <Text>|</Text>
        </View>
        <RippleEffect onPress={() => onTerm('privacy')}>
          <Text style={styles.termsTxt}>Privacy Policy</Text>
        </RippleEffect>
      </View>

      <RippleEffect style={styles.websiteLink} onPress={() => onWebUrl()}>
        <Text style={styles.link}>Visit our website</Text>
      </RippleEffect>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: 15,
    backgroundColor: '#fff'
  },
  subLbl: {
    fontFamily: Constants.fontFamilyRegular,
    fontSize: Constants.fontXL,
    color: Color.TextSecondary,
    paddingVertical: 15,
    paddingHorizontal: 8
  },
  inputContainer: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%'
  },
  userInput: {
    width: '90%',
    fontSize: Constants.fontLG,
    borderBottomWidth: 1,
    paddingLeft: 0,
    borderBottomColor: Color.DivideDark,
    height: 50
  },
  icStyle: {
    width: '10%',
    left: 4,
    top: 3
  },
  button: {
    backgroundColor: Color.mainPrimary,
    padding: 15,
    margin: 20,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    ...Styles.elevation
  },
  btnTxt: {
    color: Color.Background,
    fontFamily: Constants.fontFamilyMedium,
    fontSize: Constants.fontXL
  },
  termsTxt: {
    borderBottomWidth: 0.5,
    borderBottomColor: Color.TextSecondary
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
  },
  websiteLink: {
    position: 'absolute',
    bottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    textAlign: 'center',
    left: 15
  },
  link: {
    fontFamily: Constants.fontFamilyMedium,
    fontSize: Constants.fontMD,
    color: Color.mainPrimary
  },
  errorStyle: {
    fontFamily: Constants.fontFamilyRegular,
    fontSize: Constants.fontMD,
    padding: 10,
    color: Color.mainPrimary,
    position: 'absolute',
    bottom: -25,
    left: 30
  }
})
