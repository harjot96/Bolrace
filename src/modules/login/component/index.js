import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Linking,
  ImageBackground
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { Constants, Images, Color, Styles, Device } from '../../../common'
import { Spinner, Text, RippleEffect } from '../../../component'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { fetchSocialLogin, loginUser, validateUser } from '../action'
import SignUp from './SignUp'
import SigninSVG from '../../../assets/image/signinHeading_center.svg'
import Shape from '../../../assets/image/shape.svg'
import GoogleSVG from '../../../assets/image/google.svg'
import Toast from 'react-native-toast-message'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from '@react-native-google-signin/google-signin'

GoogleSignin.configure({
  webClientId:
    '314974166764-ucm2bt8c1q77h4og7sjvmhm0jro1tmnb.apps.googleusercontent.com',
  iosClientId:
    '314974166764-2h1kfab24mkmdqb1iok0q7q0ohi5lmtv.apps.googleusercontent.com',
  forceCodeForRefreshToken: true
})

export default function LoginComponent() {
  const navigation = useNavigation()
  const { deviceFCMToken } = useSelector(state => state.login)
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showInvalid, setInvalid] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [isLoginScreen, setLoginScreen] = useState(true)

  const login = () => {
    setLoading(true)
    var bodyFormData = new FormData()
    bodyFormData.append('phone', username)
    bodyFormData.append('password', password)
    bodyFormData.append('type', 'app')
    bodyFormData.append('token', 'horseridingv1')
    dispatch(validateUser(bodyFormData)).then(res => {
      if (res.value.data?.statuscode === 200) {
        setLoading(false)
        dispatch(loginUser())
      } else if (res.value.data?.statuscode === 201) {
        setLoading(false)
        Toast.show({
          position: 'bottom',
          type: 'error',
          text1: res.value.data?.message,
          visibilityTime: 1000
        })
        navigation.navigate('OTP', { phoneNumber: username })
      } else if (res.value.data?.statuscode === 403) {
        setLoading(false)
        Toast.show({
          position: 'bottom',
          type: 'error',
          text1: res.value.data?.message,
          visibilityTime: 1000
        })
      } else if (res.value.data?.statuscode === 405) {
        setLoading(false)
        Toast.show({
          position: 'bottom',
          type: 'error',
          text1: res.value.data?.message,
          visibilityTime: 1000
        })
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
  }

  const onSignUp = () => {
    setLoginScreen(!isLoginScreen)
  }

  const singIn = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      var bodyFormData = new FormData()
      bodyFormData.append('email', userInfo.user.email)
      bodyFormData.append('name', userInfo.user.name)
      bodyFormData.append('image', userInfo.user.photo)
      bodyFormData.append('fcmtoken', deviceFCMToken)
      bodyFormData.append('type', 'app')
      bodyFormData.append('loginmethod', 'google')
      bodyFormData.append('token', 'horseridingv1')
      setLoading(true)
      dispatch(fetchSocialLogin(bodyFormData)).then(res => {
        if (res.value.data?.statuscode === 200) {
          setLoading(false)
          dispatch(loginUser())
        } else if (res.value.data?.statuscode === 403) {
          setLoading(false)
          Toast.show({
            position: 'bottom',
            type: 'error',
            text1: res.value.data?.message,
            visibilityTime: 1000
          })
          // this.navCtrl.navigateRoot(['/register'])
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
    } catch (error) {
      setLoading(false)
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }

  const onForgotPassword = () => {
    navigation.navigate('Forgot Password')
  }

  return (
    <>
      {isLoginScreen ? (
        <View
          style={[styles.mainContainer, { paddingTop: Device.isIOS ? 50 : 0 }]}>
          <View style={[styles.mainContainer, { backgroundColor: '#fff' }]}>
            {isLoading ? <Spinner /> : null}

            <ImageBackground
              source={Images.signinHeadingP}
              style={styles.headerContainer}>
              <View style={styles.overlay} />
              <Text style={styles.lblTxt}>Login</Text>
              <View style={{ zIndex: 5 }}>
                <SigninSVG />
              </View>
            </ImageBackground>
            <>
              <View style={{ padding: 5 }}>
                <Text style={styles.heading}>
                  Enter your details to Sign In
                </Text>

                <View style={styles.inputContainer}>
                  <FontAwesome
                    name="mobile"
                    size={24}
                    color={Color.mainPrimary}
                    style={{
                      width: '10%',
                      left: 4,
                      top: 3
                    }}
                  />
                  <TextInput
                    value={username}
                    style={styles.userInput}
                    keyboardType={'numeric'}
                    autoFocus={true}
                    autoCapitalize="none"
                    placeholder="Phone"
                    maxLength={11}
                    onChangeText={userName => {
                      setUsername(userName)
                      setInvalid(false)
                    }}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <MaterialCommunityIcons
                    name="lock"
                    size={20}
                    color={Color.mainPrimary}
                    style={{ width: '10%', alignItems: 'center' }}
                  />
                  <TextInput
                    value={password}
                    style={styles.userInput}
                    keyboardType={'default'}
                    placeholder="Password"
                    autoCapitalize="none"
                    onChangeText={password => {
                      setPassword(password)
                      setInvalid(false)
                    }}
                    secureTextEntry
                  />
                </View>
              </View>

              <View
                style={{
                  paddingHorizontal: 15
                }}>
                {showInvalid ? (
                  <Text style={{ color: 'red', height: 17 }}>
                    Invalid Username or Password
                  </Text>
                ) : (
                  <Text style={{ height: 17 }}></Text>
                )}

                <>
                  <RippleEffect onPress={() => onForgotPassword()}>
                    <Text
                      style={{
                        color: Color.TextSecondary,
                        fontSize: Constants.fontMD,
                        fontFamily: Constants.fontFamilyMedium,
                        paddingHorizontal: 10
                      }}>
                      Forgot Password?
                    </Text>
                  </RippleEffect>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center'
                    }}>
                    <Text
                      style={{
                        width: '30%',
                        borderBottomWidth: 1,
                        borderBottomColor: Color.DivideDark
                      }}></Text>
                    <Text style={styles.loginWithStyle}>OR LOGIN WITH</Text>
                    <Text
                      style={{
                        width: '30%',
                        borderBottomWidth: 1,
                        borderBottomColor: Color.DivideDark
                      }}></Text>
                  </View>
                </>

                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <RippleEffect
                    style={styles.containerBox}
                    onPress={() => singIn()}>
                    <GoogleSVG />
                  </RippleEffect>
                </View>

                <RippleEffect style={styles.button} onPress={() => login()}>
                  <Text style={styles.logintxt}>Sign In</Text>
                </RippleEffect>
              </View>
            </>

            <View style={styles.termTxt}>
              <View style={{ ...Styles.flexINI, paddingBottom: 2 }}>
                <RippleEffect onPress={() => onSignUp()}>
                  <Text
                    style={{
                      color: Color.TextTertiary,
                      fontSize: Constants.fontSM
                    }}>
                    Don't have an account ? &nbsp;
                    <Text
                      style={{
                        color: Color.mainPrimary,
                        fontSize: Constants.fontSM,
                        fontFamily: Constants.fontFamilyMedium
                      }}>
                      &nbsp;Sign Up
                    </Text>
                  </Text>
                </RippleEffect>
              </View>
            </View>

            <ImageBackground style={styles.footerContainer}>
              <View>
                <Shape />
              </View>
            </ImageBackground>
          </View>
        </View>
      ) : (
        <SignUp onSignUp={onSignUp} />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Color.mainPrimary,
    flex: 1,
    position: 'relative'
  },

  heading: {
    fontFamily: Constants.fontFamilyRegular,
    fontSize: Constants.fontLG,
    color: Color.Secondary,
    paddingHorizontal: 15,
    paddingVertical: 10
  },

  labelTxt: {
    fontFamily: Constants.fontFamilyRegular,
    fontSize: Constants.fontLG,
    color: Color.TextPrimary
  },

  inputContainer: {
    paddingHorizontal: 15,
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

  button: {
    alignItems: 'center',
    backgroundColor: Color.mainPrimary,
    padding: 12,
    borderRadius: 50,
    width: '100%',
    marginVertical: 30,
    zIndex: 1,
    elevation: 4,
    marginTop: 0
  },

  logintxt: {
    fontSize: Constants.fontXL,
    fontFamily: Constants.fontFamilyBold,
    color: Color.Background
  },

  termTxt: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Styles.width,
    left: 0
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
  headerContainer: {
    width: '100%',
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  lblTxt: {
    position: 'absolute',
    top: 5,
    left: 10,
    zIndex: 5,
    color: Color.Background,
    fontFamily: Constants.fontFamilyMedium
  },
  loginWithStyle: {
    fontSize: Constants.fontMD,
    width: '35%',
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    color: Color.TextTertiary,
    fontFamily: Constants.fontFamilyMedium,
    position: 'relative',
    top: 10
  },
  containerBox: {
    backgroundColor: Color.Background,
    borderWidth: 1,
    borderColor: Color.DivideDark,
    borderRadius: 4,
    margin: 20,
    padding: 5,
    paddingHorizontal: 7
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: -1
  }
})
