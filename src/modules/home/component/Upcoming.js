import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, Animated, TouchableOpacity } from 'react-native'
import { Color, Constants, Styles } from '../../../common'
import { RippleEffect, Text } from '../../../component'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { getTruncate } from '../../../utils'

const Upcoming = () => {
  const { upcomingData } = useSelector(state => state.home)
  const navigation = useNavigation()
  const [fadeAnim] = useState(new Animated.Value(0))
  const [slideAnim] = useState(new Animated.Value(30))

  const upcomingShortList = upcomingData?.slice(0, 12)

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

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

  const renderSlot = ({ item, index }) => {
    const delay = index * 100
    const isSpecial = item.result === '1'
    
    return (
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <TouchableOpacity
          onPress={() => onSlot(item)}
          style={[
            styles.cardStyle,
            isSpecial && styles.specialCard
          ]}
          activeOpacity={0.8}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.statusIndicator, isSpecial && styles.specialIndicator]} />
            <MaterialCommunityIcons
              name={isSpecial ? "star" : "calendar-clock"}
              size={16}
              color={isSpecial ? Color.Background : Color.Primary}
              style={styles.cardIcon}
            />
          </View>
          
          <View style={styles.cardContent}>
            <Text numberOfLines={1} style={[styles.dateTxt, isSpecial && styles.specialText]}>
              {item.racedate}
            </Text>
            <Text numberOfLines={1} style={[styles.nameTxt, isSpecial && styles.specialText]}>
              {item.day}
            </Text>
            <Text numberOfLines={1} style={[styles.placeTxt, isSpecial && styles.specialText]}>
              {item.place}
            </Text>
            <Text numberOfLines={1} style={[styles.subTxt, isSpecial && styles.specialSubText]}>
              {item.label}
            </Text>
          </View>
          
          {isSpecial && (
            <View style={styles.specialBadge}>
              <MaterialCommunityIcons name="trophy" size={12} color={Color.Background} />
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    )
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      <View style={[styles.rowFlex, { paddingBottom: 15 }]}>
        <View style={styles.rowFlex}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="calendar-month"
              size={24}
              color={Color.Primary}
            />
          </View>
          <Text style={styles.namelabel}>Upcoming Race</Text>
        </View>
        <TouchableOpacity onPress={() => onView()} style={styles.viewButton}>
          <Text style={styles.viewlabel}>View all</Text>
          <MaterialCommunityIcons name="chevron-right" size={16} color={Color.mainPrimary} />
        </TouchableOpacity>
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
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    marginHorizontal: 20,
    marginBottom: 0
  },
  namelabel: {
    fontFamily: Constants.fontFamilyBold,
    fontSize: Constants.fontLG,
    color: Color.TextPrimary,
    marginLeft: 8
  },
  viewlabel: {
    fontFamily: Constants.fontFamilyMedium,
    fontSize: Constants.fontMD,
    color: Color.mainPrimary,
    marginRight: 4
  },
  rowFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Color.Primary + '20',
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.Background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  cardStyle: {
    backgroundColor: Color.Background,
    borderRadius: 12,
    padding: 8,
    width: Styles.width / 3 - 26,
    height: 100,
    marginBottom: 15,
    marginRight: 15,
    marginLeft: 2,
    borderWidth: 1,
    borderColor: Color.DivideDark + '30',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative'
  },
  specialCard: {
    backgroundColor: Color.Primary,
    borderColor: Color.Primary,
    elevation: 6,
    shadowColor: Color.Primary,
    shadowOpacity: 0.3
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4
  },
  statusIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Color.TextTertiary
  },
  specialIndicator: {
    backgroundColor: Color.Background
  },
  cardIcon: {
    marginRight: 2
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dateTxt: {
    fontFamily: Constants.fontFamilyBold,
    fontSize: Constants.fontSM,
    color: Color.TextSecondary,
    marginBottom: 2
  },
  nameTxt: {
    fontFamily: Constants.fontFamilyMedium,
    fontSize: Constants.fontMD,
    color: Color.TextPrimary,
    marginBottom: 2
  },
  placeTxt: {
    fontFamily: Constants.fontFamilyRegular,
    fontSize: Constants.fontSM,
    color: Color.TextTertiary,
    marginBottom: 2
  },
  subTxt: {
    fontFamily: Constants.fontFamilyBold,
    fontSize: Constants.fontSM,
    color: Color.Primary
  },
  specialText: {
    color: Color.Background
  },
  specialSubText: {
    color: Color.Background + 'CC'
  },
  specialBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Color.Background,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3
  }
})

export default Upcoming
