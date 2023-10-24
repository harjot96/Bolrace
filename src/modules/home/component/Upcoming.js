import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Color, Constants, Styles } from '../../../common'
import { RippleEffect, Text } from '../../../component'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { getTruncate } from '../../../utils'

const Upcoming = () => {
  const { upcomingData } = useSelector(state => state.home)
  const navigation = useNavigation()

  const upcomingShortList = upcomingData?.slice(0, 12)

  const onSlot = item => {
    navigation.navigate('Main', {
      Slot: item
    })
  }

  const onView = () => {
    navigation.navigate('ViewSlot', {
      headerName: 'Upcoming Race',
      Slot: upcomingData
    })
  }

  const renderSlot = ({ item }) => {
    return (
      <RippleEffect
        onPress={() => onSlot(item)}
        style={[
          styles.cardStyle,
          item.result === '1'
            ? { backgroundColor: Color.Primary }
            : { backgroundColor: Color.Background }
        ]}>
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
      <View style={[styles.rowFlex, { paddingBottom: 15 }]}>
        <View style={styles.rowFlex}>
          <MaterialCommunityIcons
            name="calendar-month"
            size={24}
            style={{ paddingRight: 5, left: -2 }}
            color={Color.TextSecondary}
          />
          <Text style={styles.namelabel}>Upcoming Race</Text>
        </View>
        <RippleEffect onPress={() => onView()}>
          <Text style={styles.viewlabel}>View all</Text>
        </RippleEffect>
      </View>

      <View>
        <View>
          <FlatList
            data={upcomingShortList}
            renderItem={renderSlot}
            horizontal={false}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: 'flex-start'
            }}
            contentContainerStyle={{ paddingBottom: 5 }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    marginHorizontal: 20,
    marginBottom: 0
  },
  namelabel: {
    fontFamily: Constants.fontFamilyMedium,
    fontSize: Constants.fontLG,
    color: Color.TextSecondary
  },
  viewlabel: {
    fontFamily: Constants.fontFamilyRegular,
    fontSize: Constants.fontMD,
    color: Color.mainPrimary,
    paddingRight: 3
  },
  rowFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardStyle: {
    borderRadius: 4,
    padding: 5,
    width: Styles.width / 3 - 26,
    height: 85,
    justifyContent: 'center',
    alignItems: 'center',
    color: Color.Background,
    marginBottom: 15,
    marginRight: 15,
    marginLeft: 2,
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
    color: Color.TextPrimary
  },
  subTxt: {
    fontFamily: Constants.fontFamilyMedium,
    fontSize: Constants.fontMDS,
    color: Color.TextBlue,
    paddingTop: 1
  }
})

export default Upcoming
