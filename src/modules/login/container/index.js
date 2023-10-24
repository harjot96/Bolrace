import React, { useLayoutEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import LoginComponent from '../component'
import Color from '../../../common/Color'

const LoginScreen = props => {
  return (
    <View style={styles.container}>
      <LoginComponent />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.Background }
})

export default LoginScreen
