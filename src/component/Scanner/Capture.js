import React, { useEffect, useRef, useState } from 'react'
import { CameraScreen, CameraType } from 'react-native-camera-kit'
import {
  Platform,
  Text,
  TouchableOpacity,
  View,
  AppState,
  StyleSheet,
  Alert,
  Image
} from 'react-native'
import {
  request,
  PERMISSIONS,
  openSettings,
  check
} from 'react-native-permissions'
import { Styles, Images } from '../../common'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
// import { changeFocus } from '../../modules/inward/action'
import ImgToBase64 from 'react-native-image-base64'
import { convertTobase64 } from '../../utils'
import RNFetchBlob from 'rn-fetch-blob'

const Capture = ({
  id = 0,
  setModel,
  setCaptureImages,
  setBaseURI,
  onCancel
}) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [permissionsStatus, setPermissionStatus] = useState('')
  const appState = useRef(AppState.currentState)

  useEffect(() => {
    requestUserPermissions()
  }, [])

  useEffect(() => {
    const state = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        checkPermission()
      }
      appState.current = nextAppState
    })
    return () => {
      state.remove()
    }
  }, [])

  const checkPermission = () => {
    check(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA
    ).then(result => {
      setPermissionStatus(result)
    })
  }

  const requestUserPermissions = () => {
    request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA
    ).then(result => {
      switch (result) {
        case 'unavailable':
          alert('Your Device does not support camera feature')
          setPermissionStatus('unavailable')
          break
        case 'denied':
          alert('You will not be able to scan barcodes')
          setPermissionStatus('denied')
          break
        case 'granted':
          setPermissionStatus('granted')
          break
        case 'limited':
          setPermissionStatus('granted')
          break
        case 'blocked':
          setPermissionStatus('blocked')
          break

        default:
          break
      }
    })
  }

  const goToSettings = () => {
    openSettings().catch(() => {
      alert('cannot open settings')
    })
  }

  const exitCamera = () => {
    onCancel()
  }

  const onBottomButtonPressed = async event => {
    setModel(false)
    var img = [],
      img = event.captureImages
    setCaptureImages(img)
    if (event.captureImages?.length) {
      RNFetchBlob.fs.readFile(img[img.length - 1].uri, 'base64').then(res => {
        setBaseURI(res)
      })
    }
    if (event.type === 'left') {
      exitCamera()
    } else if (event.type === 'right') {
      Alert.alert(
        'Retake',
        'Dont add to bill',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: true }
      )
      setCaptureImages(img)
    } else {
      setCaptureImages(img)
      setModel(true)
    }
  }

  return (
    <View style={styles.container}>
      {permissionsStatus === 'granted' || permissionsStatus === 'limited' ? (
        <CameraScreen
          key={id}
          cameraType={CameraType.Back}
          style={styles.cameraStyle}
          onBottomButtonPressed={event => onBottomButtonPressed(event)}
          captureButtonImage={Images.IcCapture}
          actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
        />
      ) : permissionsStatus === 'unavailable' ? (
        <View
          style={{
            height: Styles.height / 3
          }}>
          <Text>Your device does not support camera feature</Text>
        </View>
      ) : (
        <TouchableOpacity onPress={goToSettings} style={styles.buttonStyle}>
          <Text style={{ color: 'black' }}>Click to allow Camera access</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default Capture

const styles = StyleSheet.create({
  container: { flex: 1 },
  cameraStyle: {
    height: Styles.height,
    width: Styles.height / 3
  },
  buttonStyle: {
    height: Styles.height / 3,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
