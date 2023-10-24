import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { Color, Images } from '../../../common'
import { RippleEffect } from '../../../component'
import { useNavigation } from '@react-navigation/native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const Header = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.singlecontainer}>
      <View
        style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
        <View style={styles.singlelogo}>
          <Image source={Images.HeaderLogo} style={styles.logo} />
        </View>

        <RippleEffect
          onPress={() => navigation.navigate('Login')}
          style={styles.useravatar}>
          <FontAwesome
            name="user-circle-o"
            size={25}
            color={Color.Background}
            style={{ padding: 3 }}
          />
        </RippleEffect>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.Background },
  singlelogo: {
    height: 35,
    width: 100
  },
  logo: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  },
  useravatar: {
    position: 'absolute',
    right: 0,
    top: 4
  },
  singlecontainer: {
    width: '100%',
    backgroundColor: '#343439',
    height: 40,
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row'
  }
})

export default Header
