import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Color, Constants, Styles } from '../../../common'
import { RippleEffect, Text } from '../../../component'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'

const MenuList = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.cardWrap}>
        <RippleEffect
          style={styles.card}
          onPress={() => navigation.navigate('About')}>
          <View>
            <MaterialCommunityIcons
              name="shield-home"
              size={35}
              color={Color.Secondary}
              style={styles.Icons}
            />
          </View>
          <Text style={Styles.subTxt}>About Us</Text>
        </RippleEffect>
        <RippleEffect
          style={styles.card}
          onPress={() => navigation.navigate('Work')}>
          <View>
            <Ionicons
              name="code-working"
              size={35}
              color={Color.Secondary}
              style={styles.Icons}
            />
          </View>
          <Text style={Styles.subTxt}>Work Showcase</Text>
        </RippleEffect>
      </View>

      <View style={styles.cardWrap}>
        <RippleEffect
          style={styles.card}
          onPress={() => navigation.navigate('UIcomponent')}>
          <View>
            <MaterialCommunityIcons
              name="television-guide"
              size={35}
              color={Color.Secondary}
              style={styles.Icons}
            />
          </View>
          <Text style={Styles.subTxt}>UI-Component</Text>
          <View></View>
        </RippleEffect>
        <RippleEffect
          style={styles.card}
          onPress={() => navigation.navigate('UIstyle')}>
          <View>
            <FontAwesome5
              name="paint-brush"
              size={30}
              color={Color.Secondary}
              style={styles.Icons}
            />
          </View>
          <Text style={Styles.subTxt}>UI-Style Guide</Text>
        </RippleEffect>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: Color.Background
  },
  cardWrap: {
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  card: {
    backgroundColor: '#eaf3fa',
    height: Styles.width / 3,
    width: Styles.width / 2.3,
    ...Styles.elevation,
    borderRadius: 4,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 15
  },
  subTxt: {
    fontFamily: Constants.fontFamilyMedium,
    fontSize: Constants.fontH1,
    color: Color.TextPrimary
  },
  Icons: {
    top: -35
  }
})

export default MenuList
