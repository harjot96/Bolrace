import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  View
} from 'react-native'
import { RippleEffect, Spinner, Text } from '../../../component'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Color, Constants, Device, Images, Styles } from '../../../common'
import { changePassword, resendOtp } from '../action'
import { useDispatch } from 'react-redux'
import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'

let interval
const Forgot = props => {
  const isFromUser = props.route.params?.isFromUser
  const phoneNumber = props.route.params?.phoneNumber

  let seconds = 60
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const [userNumber, setUserNumber] = useState('')
  const [userOTP, setOtp] = useState('')
  const [userPassword, setPassword] = useState('')
  const [isLoading, setLoading] = useState(false)

  const [isError, setError] = useState(false)
  const [isValidNumber, setValidNumber] = useState(false)
  const [isOtpScreen, setOtpScreen] = useState(false)
  const [timer, setTimer] = useState(60)

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
          <Text style={styles.headerMain}>Forgot Password</Text>
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

  useEffect(() => {
    if (isOtpScreen) {
      interval = setInterval(() => {
        setTimer(time => {
          if (time === 0) {
            clearInterval(interval)
            return time
          }
          return time - 1
        })
      }, 1000)
      return () => clearInterval(interval)
    }
    if (isFromUser) {
      setOtpScreen(true)
      setUserNumber(phoneNumber)
    }
  }, [isOtpScreen])

  const onProceed = () => {
    if (userNumber) {
      if (userNumber.length <= 9) {
        setValidNumber(true)
      } else {
        var bodyFormData = new FormData()
        bodyFormData.append('phone', userNumber)
        bodyFormData.append('type', 'app')
        bodyFormData.append('token', 'horseridingv1')
        setLoading(true)
        dispatch(resendOtp(bodyFormData)).then(res => {
          if (res.value.data?.statuscode === 200) {
            setLoading(false)
            Toast.show({
              position: 'bottom',
              text1: res.value.data?.message,
              visibilityTime: 1000
            })
            setOtpScreen(true)
          } else {
            setLoading(false)
          }
        })
      }
    } else {
      setError(true)
      setLoading(false)
    }
  }

  const onResendOtp = () => {
    var bodyFormData = new FormData()
    bodyFormData.append('phone', userNumber)
    bodyFormData.append('type', 'app')
    bodyFormData.append('token', 'horseridingv1')
    setLoading(true)
    dispatch(resendOtp(bodyFormData)).then(res => {
      if (res.value.data?.statuscode === 200) {
        setLoading(false)
        Toast.show({
          position: 'bottom',
          text1: res.value.data?.message,
          visibilityTime: 1000
        })
        setOtpScreen(true)
      } else {
        setLoading(false)
      }
    })
  }

  const onSubmit = () => {
    if (userOTP && userPassword) {
      var bodyFormData = new FormData()
      bodyFormData.append('phone', userNumber)
      bodyFormData.append('newpassword', userPassword)
      bodyFormData.append('confirmpassword', userPassword)
      bodyFormData.append('token', 'horseridingv1')
      setLoading(true)
      dispatch(changePassword(bodyFormData)).then(res => {
        if (res.value.data?.statuscode === 200) {
          setLoading(false)
          Toast.show({
            position: 'bottom',
            type: 'success',
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
      setLoading(false)
    }
  }

  return (
    <View style={styles.mainContainer}>
      {isLoading ? <Spinner /> : null}

      {!isOtpScreen ? (
        <>
          <View style={{ flex: 1 }}>
            <KeyboardAvoidingView
              enabled
              behavior={'padding'}
              style={{ flex: 1 }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignItems: 'center', margin: 25 }}>
                  <Image
                    source={Images.otp}
                    style={{ height: 180, width: 180 }}
                  />
                </View>
                <Text style={styles.heading}>Phone</Text>
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
                    value={userNumber}
                    style={styles.userInput}
                    keyboardType={'numeric'}
                    autoFocus={true}
                    autoCapitalize="none"
                    placeholder="Enter Phone Number"
                    onChangeText={userNumber => {
                      setUserNumber(userNumber)
                      setError(false)
                      setValidNumber(false)
                    }}
                  />
                </View>

                <View>
                  {isError ? (
                    <Text style={styles.errorStyle}>
                      Phone number is required*
                    </Text>
                  ) : null}

                  {isValidNumber ? (
                    <Text style={styles.errorStyle}>
                      Enter Valid Phone Number*
                    </Text>
                  ) : null}
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              margin: 15
            }}>
            <RippleEffect style={styles.button} onPress={() => onProceed()}>
              <Text style={styles.logintxt}>Proceed</Text>
            </RippleEffect>
          </View>
        </>
      ) : (
        <View style={{ flex: 1 }}>
          <KeyboardAvoidingView
            enabled
            behavior={'padding'}
            style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{
                  alignItems: 'center',
                  margin: 25,
                  backgroundColor: '#fff'
                }}>
                <Image
                  source={Images.otp}
                  style={{
                    height: 180,
                    width: 180,
                    resizeMode: 'contain'
                  }}
                />
              </View>

              <View style={{ flex: 0.7 }}>
                <View>
                  <Text style={styles.heading}>Phone</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.userInput}
                      keyboardType={'email-address'}
                      autoCapitalize="none"
                      placeholder={userNumber}
                      editable={false}
                    />
                  </View>
                </View>

                <View>
                  <Text style={styles.heading}>OTP</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      value={userOTP}
                      style={styles.userInput}
                      keyboardType={'numeric'}
                      autoFocus={true}
                      autoCapitalize="none"
                      placeholder="Enter OTP"
                      onChangeText={userNumber => {
                        setOtp(userNumber)
                        setError(false)
                      }}
                    />
                    {isError && userOTP === '' ? (
                      <Text style={[styles.errorStyle, { left: 0 }]}>
                        Required*
                      </Text>
                    ) : null}
                  </View>
                </View>

                <View>
                  <Text style={styles.heading}>Password</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      value={userPassword}
                      style={styles.userInput}
                      autoFocus={true}
                      autoCapitalize="none"
                      placeholder="Enter New Password"
                      onChangeText={userNumber => {
                        setPassword(userNumber)
                        setError(false)
                      }}
                      textContentType="password"
                      secureTextEntry
                    />
                    {isError && userPassword === '' ? (
                      <Text style={[styles.errorStyle, { left: 0 }]}>
                        Required*
                      </Text>
                    ) : null}
                  </View>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {timer === 0 ? (
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={styles.otpStyle}>Did not receive OTP </Text>
                <RippleEffect onPress={onResendOtp}>
                  <Text style={styles.otpStyleBold}>Resend Now</Text>
                </RippleEffect>
              </View>
            ) : (
              <Text style={styles.otpStyle}>Resend OTP after {timer} sec</Text>
            )}
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              margin: 15
            }}>
            <RippleEffect style={styles.button} onPress={() => onSubmit()}>
              <Text style={styles.logintxt}>Submit</Text>
            </RippleEffect>
          </View>
        </View>
      )}
    </View>
  )
}

export default Forgot

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
    flex: 1,
    position: 'relative'
  },

  heading: {
    fontFamily: Constants.fontFamilyRegular,
    fontSize: Constants.fontLG,
    color: Color.Secondary,
    paddingHorizontal: 15,
    paddingVertical: 10,
    top: 8
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
    width: '100%',
    position: 'relative'
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
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: Color.mainPrimary,
    padding: 12,
    borderRadius: 5,
    width: '50%',
    marginVertical: 30,
    zIndex: 1,
    elevation: 4,
    marginTop: 30
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
    alignItems: 'center'
  },
  lblTxt: {
    position: 'absolute',
    top: 5,
    left: 10,
    zIndex: 5,
    color: Color.Background,
    fontFamily: Constants.fontFamilyMedium
  },
  icStyle: {
    width: '10%',
    left: 0,
    top: 3
  },
  errorStyle: {
    fontFamily: Constants.fontFamilyRegular,
    fontSize: Constants.fontMD,
    padding: 10,
    color: Color.mainPrimary,
    position: 'absolute',
    bottom: -20,
    left: 45
  },
  otpStyle: {
    fontFamily: Constants.fontFamilyRegular,
    fontSize: Constants.fontLG,
    color: Color.TextSecondary,
    marginVertical: 15,
    top: 15
  },
  otpStyleBold: {
    fontFamily: Constants.fontFamilyMedium,
    fontSize: Constants.fontLG,
    color: Color.TextSecondary,
    marginVertical: 15,
    top: 15
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
