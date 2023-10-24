import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Color, Images } from '../../common'
import { ImageCache, Text, RippleEffect } from '..'

const FloatingButton = ({
  onPress = () => {},
  label = '',
  opacity = 1,
  ...rest
}) => {
  return (
    <RippleEffect
      onPress={onPress}
      style={[styles.container, { opacity: opacity }]}
      {...rest}>
      <View
        style={{
          opacity: opacity
        }}>
        <View>
          <Text style={styles.title}>{label || 'Complete'}</Text>
        </View>
      </View>
    </RippleEffect>
  )
}
const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '90%',
    margin: 20,
    borderRadius: 6,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    backgroundColor: Color.Primary
  },
  buttonContainer: {
    padding: 10,
    justifyContent: 'center'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  subTitle: {
    color: '#fff',
    paddingTop: 3,
    opacity: 0.8
  },
  mainContainer: {
    height: '100%',
    width: '100%',
    flexDirection: 'row'
  }
})
export default FloatingButton
