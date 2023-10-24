import React, { useState } from 'react'
import { View, StyleSheet, ImageBackground, Modal, Alert } from 'react-native'
import { Color, Constants, Device, Images, Styles } from '../../../common'
import { RippleEffect, Text } from '../../../component'
import { useDispatch, useSelector } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { logout } from '../../login/action'
import { useNavigation } from '@react-navigation/native'

const Name = () => {
  const { userData } = useSelector(state => state.login)
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const onLogOut = () => {
    Alert.alert(
      'Confirm !',
      'Are you sure you want to Logout !',
      [
        { text: 'Cancel' },
        {
          text: 'OK',
          onPress: () => dispatch(logout())
        }
      ],
      { cancelable: false }
    )
  }

  return (
    <>
      <ImageBackground
        source={Images.raceDetailHeader}
        style={{ width: '100%', height: 170 }}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            justifyContent: 'space-around'
          }}>
          <View style={[styles.flexRow, { paddingTop: Device.isIOS ? 35 : 0 }]}>
            <View>
              <Text style={styles.headlabel}>HORSE</Text>
              <Text style={styles.headlabel}>RACE CLUB</Text>
            </View>
            <View>
              <RippleEffect onPress={() => onLogOut()}>
                <Ionicons
                  name="power-sharp"
                  size={26}
                  color={Color.Background}
                />
              </RippleEffect>
            </View>
          </View>

          <View style={[styles.flexRow, { alignItems: 'flex-end' }]}>
            <View>
              <Text style={styles.namelabel}>{`Hi ${userData?.name}`}</Text>
              <Text
                style={
                  styles.namelabel
                }>{`Welcome to the BOL Book What you Love !`}</Text>
            </View>
            <View>
              <Text style={styles.namelabel}>
                PULL DOWN
                <Ionicons
                  name="arrow-down-sharp"
                  size={20}
                  color={Color.Background}
                  style={{ position: 'relative', top: 15, left: 10 }}
                />
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
    marginHorizontal: 25
  },
  headlabel: {
    fontFamily: Constants.fontFamilyMedium,
    fontSize: 24,
    color: Color.Background
  },
  namelabel: {
    fontFamily: Constants.fontFamilyMedium,
    fontSize: Constants.fontMD,
    color: Color.Background
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default Name
