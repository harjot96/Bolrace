import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Color, Constants, Styles } from '../../../common'
import { RippleEffect, Text } from '../../../component'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { getTruncate } from '../../../utils'

const Previous = () => {
  const { previousData } = useSelector(state => state.home)
  const navigation = useNavigation()

  const previousShortList = previousData?.slice(0, 6)

  const onSlot = item => {
    navigation.navigate('Main', {
      Slot: item
    })
  }

  const onView = () => {
    navigation.navigate('ViewSlot', {
      headerName: 'Previous Race',
      Slot: previousData
    })
  }

  const renderSlot = ({ item }) => {
    return (
      <RippleEffect
        onPress={item.cancel !== 'c' ? () => onSlot(item) : () => null}
        style={[
          styles.cardStyle,
          item.cancel !== 'c' ? null : { borderColor: Color.mainPrimary }
        ]}>
        <Text style={styles.dateTxt} numberOfLines={1}>
          {item.racedate}
        </Text>
        <Text style={styles.nameTxt} numberOfLines={1}>
          {item.day}
        </Text>
        <Text style={styles.nameTxt} numberOfLines={1}>
          {item.place}
        </Text>
        <Text style={styles.subTxt} numberOfLines={1}>
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
            style={{ paddingRight: 5 }}
            color={Color.TextSecondary}
          />
          <Text style={styles.namelabel}>Previous Race</Text>
        </View>
        <RippleEffect onPress={() => onView()}>
          <Text style={styles.viewlabel}>View all</Text>
        </RippleEffect>
      </View>

      <View>
        <View>
          <FlatList
            data={previousShortList}
            renderItem={renderSlot}
            horizontal={false}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            contentContainerStyle={{ paddingBottom: 10 }}
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
    marginHorizontal: 20
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
    backgroundColor: Color.Background,
    padding: 5,
    borderRadius: 4,
    // width: 110,
    width: Styles.width / 3 - 26,
    height: 85,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.DivideDark,
    marginBottom: 15
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
  }
})

export default Previous
