import React, { useState } from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { RippleEffect, Spinner, Text } from '../../../component'
import { Color, Constants, Device, Images, Styles } from '../../../common'
import { resendOtp, verifyOtp } from '../action'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import Toast from 'react-native-toast-message'
import Ionicons from 'react-native-vector-icons/Ionicons'
import SignupSVG from '../../../assets/image/otpHeading_center.svg'

const OTP = props => {
  const phoneNumber = props.route.params?.phoneNumber
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [userOtp, setUserOtp] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  const [clearInput, setclearInput] = useState(false)

  const onSubmit = () => {
    if (userOtp) {
      var bodyFormData = new FormData()
      bodyFormData.append('phone', phoneNumber)
      bodyFormData.append('otp', userOtp)
      bodyFormData.append('token', 'horseridingv1')
      setLoading(true)
      dispatch(verifyOtp(bodyFormData)).then(res => {
        if (res.value.data?.statuscode === 200) {
          setLoading(false)
          Toast.show({
            position: 'bottom',
            text1: res.value.data?.message,
            visibilityTime: 1000
          })
          navigation.navigate('Forgot Password', {
            isFromUser: true,
            phoneNumber: phoneNumber
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
    } else {
      setError(true)
    }
  }

  const onResendOtp = () => {
    var bodyFormData = new FormData()
    bodyFormData.append('phone', phoneNumber)
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
      }
    })
  }

  const onBack = () => {
    navigation.goBack(null)
  }

  return (
    <View style={[styles.mainContainer, { paddingTop: Device.isIOS ? 50 : 0 }]}>
      <View style={[styles.mainContainer, { backgroundColor: '#fff' }]}>
        {isLoading ? <Spinner /> : null}

        <ImageBackground
          source={Images.signupHeading}
          style={styles.headerContainer}>
          <View style={styles.overlay} />
          <View style={styles.lblTxt}>
            <RippleEffect onPress={onBack}>
              <Ionicons
                name="arrow-back-circle"
                size={30}
                color={Color.Background}
              />
            </RippleEffect>
          </View>
          <View style={{ zIndex: 5 }}>
            <SignupSVG />
          </View>
        </ImageBackground>

        <View style={{ padding: 20 }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.TxtStyle}>
              Kindly enter the OTP has been sent to Registerd Phone No.
            </Text>
            <Text style={styles.TxtStyle}>Registerd Phone No.</Text>
            <Text style={styles.TxtStyle}>{`******${phoneNumber.slice(
              6
            )}`}</Text>
          </View>

          <View>
            <OTPInputView
              style={{
                width: '100%',
                height: 100,
                color: Color.TextPrimary,
                paddingHorizontal: 20
              }}
              pinCount={4}
              autoFocusOnLoad
              editable={true}
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={code => {
                setUserOtp(code)
              }}
              onCodeChanged={code => {
                setUserOtp(code)
                setclearInput(false)
              }}
              clearInputs={clearInput}
            />
          </View>

          <View>
            <RippleEffect style={styles.button} onPress={() => onSubmit()}>
              <Text style={styles.logintxt}>Submit</Text>
            </RippleEffect>
          </View>
          <View>
            <RippleEffect
              onPress={() => onResendOtp()}
              style={{ justifyContent: 'center', flexDirection: 'row' }}>
              <Text style={styles.resendTxtStyle}>Resend Otp??</Text>
            </RippleEffect>
          </View>
        </View>
      </View>
    </View>
  )
}

export default OTP

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
    borderBottomColor: Color.DivideDark
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: Color.mainPrimary,
    padding: 12,
    borderRadius: 5,
    width: '100%',
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
  underlineStyleBase: {
    width: 55,
    height: 55,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: Color.TextPrimary,
    fontSize: Constants.fontLG
  },
  underlineStyleHighLighted: {
    borderColor: '#03DAC6'
  },
  resendTxtStyle: {
    fontFamily: Constants.fontFamilyMedium,
    fontSize: Constants.fontLG,
    padding: 10,
    color: Color.mainPrimary
  },
  TxtStyle: {
    fontFamily: Constants.fontFamilyRegular,
    fontSize: Constants.fontLG,
    color: Color.TextPrimary
  }
})
