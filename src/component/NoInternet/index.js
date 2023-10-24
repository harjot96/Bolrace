import React from 'react'
import { View, Image } from 'react-native'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { RippleEffect, Text } from '../../component'
import { Color, Constants, Images, Styles } from '../../common'
import Feather from 'react-native-vector-icons/Feather'

const NoInternet = ({ tryAgain = () => {}, dataAvailable }) => {
  const { isConnected } = useSelector(state => state.login)

  const onReload = () => {
    tryAgain()
  }

  if (dataAvailable) {
    return null
  } else if (isConnected) {
    return null
  }

  return (
    <View style={style.container}>
      <View>
        <Image
          source={Images.NoInternet}
          style={{ height: Styles.height / 2, width: Styles.width, left: -5 }}
        />
      </View>

      <Text style={style.mainTxt}>Oops! Check your internet connection.</Text>

      <View style={{ alignItems: 'center', paddingTop: 30 }}>
        <RippleEffect onPress={() => onReload()} style={style.btnStyle}>
          <Feather name="refresh-ccw" size={15} color={Color.Background} />
          <Text style={{ paddingHorizontal: 10, color: Color.Background }}>
            Try Again
          </Text>
        </RippleEffect>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.Background,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
    height: '100%',
    width: '100%'
  },
  image: {
    resizeMode: 'contain',
    marginTop: -50,
    height: 350,
    width: 350
  },
  btnStyle: {
    backgroundColor: Color.Secondary,
    width: 150,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 4,
    bottom: -20,
    ...Styles.elevation
  },
  mainTxt: {
    fontFamily: Constants.fontFamilyMedium,
    fontSize: Constants.fontLG,
    color: Color.TextPrimary,
    marginTop: 10
  }
})

export default NoInternet
