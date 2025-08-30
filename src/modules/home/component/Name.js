import React, { useState } from 'react'
import { View, StyleSheet, ImageBackground, Modal, Alert, TouchableOpacity, Animated } from 'react-native'
import { Color, Constants, Device, Images, Styles } from '../../../common'
import { RippleEffect, Text } from '../../../component'
import { useDispatch, useSelector } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { logout } from '../../login/action'
import { useNavigation } from '@react-navigation/native'

const Name = () => {
  const { userData } = useSelector(state => state.login)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [balance] = useState(1250.75) // Same balance as wallet
  const [scaleAnim] = useState(new Animated.Value(1))

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

  const handleWalletPress = () => {
    // Animate button press
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start()
    
    // Navigate to wallet
    navigation.navigate('WalletStack')
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
            <View style={styles.headerRight}>
              {/* Wallet Balance Button */}
              <TouchableOpacity 
                style={styles.walletButton}
                onPress={handleWalletPress}
                activeOpacity={0.8}
              >
                <Animated.View style={[styles.walletIconContainer, { transform: [{ scale: scaleAnim }] }]}>
                  <MaterialCommunityIcons
                    name="wallet"
                    size={20}
                    color={Color.Background}
                  />
                </Animated.View>
                <Text style={styles.walletBalanceText}>₹{balance.toFixed(0)}</Text>
              </TouchableOpacity>
              
              {/* Logout Button */}
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
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  },
  walletButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor:'red',
    marginRight:10
  },
  walletIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Color.Background + '30',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6
  },
  walletBalanceText: {
    fontSize: 14,
    fontFamily: Constants.fontFamilyBold,
    color: Color.Background,
    marginLeft: 2
  }
})

export default Name
