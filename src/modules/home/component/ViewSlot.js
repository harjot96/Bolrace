import React, { useLayoutEffect } from 'react'
import { View, StyleSheet, FlatList, ImageBackground } from 'react-native'
import { Color, Constants, Device, Images, Styles } from '../../../common'
import { RippleEffect, Text } from '../../../component'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { getTruncate } from '../../../utils'
import Ionicons from 'react-native-vector-icons/Ionicons'

const ViewSlot = props => {
  const slotData = props.route.params.Slot
  const headerName = props.route.params.headerName
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { userData } = useSelector(state => state.login)

  const onBack = () => {
    navigation.goBack(null)
  }
  const LogoHeader = () => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', zIndex: 2 }}>
        <RippleEffect onPress={onBack}>
          <Ionicons
            name="md-arrow-back-outline"
            size={24}
            color={Color.Background}
            style={{ paddingHorizontal: 20 }}
          />
        </RippleEffect>
        <View>
          <Text style={styles.headerMain}>{headerName}</Text>
        </View>
      </View>
    )
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      // header: props => <LogoTitle {...props} />,
      headerBackground: () => (
        <ImageBackground
          style={{
            height: '100%',
            width: '100%',
            flex: 1,
            justifyContent: 'center',
            paddingTop: Device.isIOS ? 50 : 0
          }}
          source={Images.termsBg}>
          <LogoHeader {...props} />
          <View style={styles.overlay} />
        </ImageBackground>
      )
    })
  }, [navigation])

  const onSlot = item => {
    navigation.navigate('Main', {
      Slot: item
    })
  }

  const renderSlot = ({ item }) => {
    return (
      <RippleEffect
        onPress={() => onSlot(item)}
        style={
          headerName === 'Upcoming Race'
            ? [
                styles.upcomingStyle,
                item.result === '1'
                  ? { backgroundColor: Color.Primary }
                  : { backgroundColor: Color.Background }
              ]
            : [
                styles.previousStyle,
                item.cancel === 'c' ? { borderColor: Color.mainPrimary } : {}
              ]
        }>
        <Text numberOfLines={1} style={styles.dateTxt}>
          {item.racedate}
        </Text>
        <Text numberOfLines={1} style={styles.nameTxt}>
          {item.day}
        </Text>
        <Text numberOfLines={1} style={styles.nameTxt}>
          {item.place}
        </Text>
        <Text numberOfLines={1} style={styles.subTxt}>
          {item.label}
        </Text>
      </RippleEffect>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={slotData}
        renderItem={renderSlot}
        horizontal={false}
        numColumns={3}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    padding: 10
  },
  storelabel: {
    fontFamily: Constants.fontFamilyMedium,
    fontSize: 25,
    color: Color.Primary
  },
  namelabel: {
    fontFamily: Constants.fontFamilyRegular,
    fontSize: Constants.fontMD,
    color: Color.TextSecondary
  },
  previousStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.Background,
    height: 92,
    width: Styles.width / 3.6,
    margin: 8,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: Color.DivideDark
  },
  upcomingStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.Primary,
    height: 85,
    width: Styles.width / 3.6,
    margin: 8,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: Color.DivideDark
  },
  dateTxt: {
    fontFamily: Constants.fontFamilyMedium,
    fontSize: Constants.fontMDS,
    color: Color.TextSecondary,
    paddingBottom: 1
  },
  nameTxt: {
    fontFamily: Constants.fontFamilyRegular,
    fontSize: Constants.fontMD,
    color: Color.TextTertiary
  },
  subTxt: {
    fontFamily: Constants.fontFamilyMedium,
    fontSize: Constants.fontMDS,
    color: Color.TextBlue,
    paddingTop: 1
  },
  cardStyle: {
    borderRadius: 4,
    padding: 5,
    width: Styles.width / 3 - 26,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    color: Color.Background,
    marginBottom: 15,
    marginRight: 15,
    marginLeft: 2,
    borderWidth: 1,
    borderColor: Color.DivideDark
  },
  headerMain: {
    color: Color.Background,
    fontFamily: Constants.fontFamilyMedium,
    fontSize: Constants.fontXL,
    zIndex: 2
  },
  headerSub: {
    color: Color.Background,
    fontFamily: Constants.fontFamilyMedium,
    fontSize: Constants.fontMD,
    paddingTop: 1,
    zIndex: 2
  },
  overlay: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(185,25,25,0.7)'
  }
})

export default ViewSlot
