import React, { useEffect, useRef, useState } from 'react'
import { Camera, CameraType } from 'react-native-camera-kit'
import {
  Platform,
  Text,
  TouchableOpacity,
  View,
  AppState,
  StyleSheet
} from 'react-native'
import {
  request,
  PERMISSIONS,
  openSettings,
  check
} from 'react-native-permissions'
import { Styles } from '../../common'

const Scanner = ({ onScan = () => {}, scannerActive = true, id = 0 }) => {
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

  return (
    <View style={styles.container}>
      {permissionsStatus === 'granted' || permissionsStatus === 'limited' ? (
        <Camera
          key={id}
          hideControls={true}
          scanBarcode={scannerActive}
          captured={!scannerActive}
          onReadCode={event => onScan(event.nativeEvent.codeStringValue)}
          showFrame={true}
          laserColor="red"
          frameColor="white"
          cameraType={CameraType.Back}
          style={styles.cameraStyle}
          focusMode={'off'}
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

export default Scanner

const styles = StyleSheet.create({
  container: { flex: 1, height: '100%', width: '100%' },
  cameraStyle: {
    height: '100%',
    width: '100%'
  },
  buttonStyle: {
    height: Styles.height / 3,
    // width: Styles.width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
