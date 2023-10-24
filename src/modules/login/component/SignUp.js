import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Linking,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { Constants, Images, Color, Styles, Device } from '../../../common'
import { Spinner, Text, RippleEffect } from '../../../component'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Foundation from 'react-native-vector-icons/Foundation'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { registerUser, validateUser } from '../action'
import SignupSVG from '../../../assets/image/signupHeading_center.svg'
import Shape from '../../../assets/image/shape.svg'
import Toast from 'react-native-toast-message'

export default function SignUp({ onSignUp }) {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userNumber, setUserNumber] = useState('')
  const [password, setPassword] = useState('')
  const [showInvalid, setInvalid] = useState(false)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {}, [])

  const onLogin = () => {
    onSignUp()
  }

  const onRegister = () => {
    if (userName && userEmail && userNumber && password) {
      setLoading(true)
      var bodyFormData = new FormData()
      bodyFormData.append('name', userName)
      bodyFormData.append('email', userEmail)
      bodyFormData.append('phone', userNumber)
      bodyFormData.append('password', password)
      bodyFormData.append('type', 'app')
      bodyFormData.append('token', 'horseridingv1')
      dispatch(registerUser(bodyFormData)).then(res => {
        if (res.value.data?.statuscode === 200) {
          setLoading(false)
          onLogin()
          Toast.show({
            position: 'bottom',
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
    } else {
      setInvalid(true)
    }
  }

  return (
    <View style={[styles.mainContainer, { paddingTop: Device.isIOS ? 50 : 0 }]}>
      <View style={[styles.mainContainer, { backgroundColor: '#fff' }]}>
        {isLoading ? <Spinner /> : null}
        <ImageBackground
          source={Images.signupHeading}
          style={styles.headerContainer}>
          <View style={styles.overlay} />
          <Text style={styles.lblTxt}>Sign Up</Text>
          <View style={{ zIndex: 5 }}>
            <SignupSVG />
          </View>
        </ImageBackground>

        <>
          <KeyboardAvoidingView
            enabled
            behavior={'padding'}
            style={{ flex: 0.9, alignItems: 'center' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ padding: 5 }}>
                <Text style={styles.heading}>
                  Enter your details to Sign Up
                </Text>

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
                    autoFocus={true}
                    autoCapitalize="none"
                    placeholder="Name"
                    onChangeText={userNumber => {
                      setUserName(userNumber)
                      setInvalid(false)
                    }}
                  />
                  {showInvalid && userName === '' ? (
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
                      setInvalid(false)
                    }}
                  />
                  {showInvalid && userEmail === '' ? (
                    <Text style={styles.errorStyle}>Required*</Text>
                  ) : null}
                </View>

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
                    placeholder="Phone"
                    maxLength={11}
                    onChangeText={userNumber => {
                      setUserNumber(userNumber)
                      setInvalid(false)
                    }}
                  />
                  {showInvalid && userNumber === '' ? (
                    <Text style={styles.errorStyle}>Required*</Text>
                  ) : null}
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
                  {showInvalid && password === '' ? (
                    <Text style={styles.errorStyle}>Required*</Text>
                  ) : null}
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>

          <View
            style={{
              paddingHorizontal: 15
            }}>
            <Text style={{ height: 17 }}></Text>

            <RippleEffect style={styles.button} onPress={() => onRegister()}>
              <Text style={styles.logintxt}>Sign Up</Text>
            </RippleEffect>
          </View>
        </>

        <View style={styles.termTxt}>
          <View style={{ ...Styles.flexINI, paddingBottom: 2 }}>
            <RippleEffect onPress={() => onLogin()}>
              <Text
                style={{ color: Color.Primary, fontSize: Constants.fontSM }}>
                <Text
                  style={{
                    color: Color.TextTertiary,
                    fontSize: Constants.fontSM
                  }}>
                  Already have an account ?&nbsp;
                  <Text
                    style={{
                      color: Color.mainPrimary,
                      fontSize: Constants.fontSM,
                      fontFamily: Constants.fontFamilyMedium
                    }}>
                    &nbsp;Login
                  </Text>
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
    bottom: -25,
    left: 38
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: -1
  }
})
