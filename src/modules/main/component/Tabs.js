import React, { useLayoutEffect } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Color, Constants, Styles } from '../../../common'
import { useNavigation } from '@react-navigation/native'
import { RippleEffect, Text } from '../../../component'
import { useDispatch, useSelector } from 'react-redux'
import { getHotSelectionData, getOddsData } from '../action'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function Tabs({ slotData, setLoading }) {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.login)

  const onTab = value => {
    if (value === 'HOT') {
      setLoading(true)
      var formData = new FormData()
      formData.append('token', 'horseridingv1')
      formData.append('rdate', slotData.rdate)
      formData.append('season', slotData.season)
      formData.append('center', slotData.place)
      dispatch(getHotSelectionData(formData))
        .then(res => {
          if (res.value.status == 200) {
            setLoading(false)
            const list = res.value.data?.data
            navigation.navigate('TabView', { list: list, label: value })
            // this.toast.message(res.message)
          } else if (res.value.status == 403) {
            setLoading(false)
            // localStorage.clear()
            // this.toast.message(res.message)
            // this.navCtrl.navigateRoot(['/login'])
          } else {
            setLoading(false)
            // this.is_selection = 2
          }
        })
        .catch(err => {
          setLoading(false)
        })
    } else {
      setLoading(true)
      var formData = new FormData()
      formData.append('token', 'horseridingv1')
      formData.append('rdate', slotData.rdate)
      formData.append('season', slotData.season)
      formData.append('center', slotData.place)
      formData.append('authToken', userData.token)
      dispatch(getOddsData(formData))
        .then(res => {
          if (res.value.status == 200) {
            setLoading(false)
            const list = res.value.data?.data
            navigation.navigate('TabView', { Oddslist: list, label: value })
            // this.is_selection = 1
            // this.data = res.data.selection
            // this.toast.message(res.message)
          } else if (res.value.status == 403) {
            setLoading(false)
            // localStorage.clear()
            // this.toast.message(res.message)
            // this.navCtrl.navigateRoot(['/login'])
          } else {
            setLoading(false)
            // this.is_selection = 2
          }
        })
        .catch(err => {
          setLoading(false)
        })
    }
  }

  return (
    <View style={styles.mainContainer}>
      <RippleEffect style={styles.tab} onPress={() => onTab('HOT')}>
        <View style={styles.flexrow}>
          <Ionicons name="checkmark-circle" size={24} color="black" />
          <Text style={styles.tabName}>Hot Selection</Text>
        </View>
      </RippleEffect>
      <RippleEffect style={styles.tab2} onPress={() => onTab('ODD')}>
        <View style={styles.flexrow}>
          <Ionicons
            name="checkmark-circle"
            size={24}
            color={Color.Background}
          />
          <Text style={styles.tabName2}>ODDS</Text>
        </View>
      </RippleEffect>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Color.Background
  },
  tab: {
    width: '50%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.Background,
    ...Styles.elevation,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderColor: Color.DivideDark
  },
  tab2: {
    width: '50%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.mainPrimary,
    ...Styles.elevation
  },
  flexrow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabName: {
    fontFamily: Constants.fontFamilyMedium,
    fontSize: Constants.fontLG,
    color: Color.TextSecondary,
    paddingLeft: 10
  },
  tabName2: {
    fontFamily: Constants.fontFamilyMedium,
    fontSize: Constants.fontLG,
    color: Color.Background,
    paddingLeft: 10
  }
})
