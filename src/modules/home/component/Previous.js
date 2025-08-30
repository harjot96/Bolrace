import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, Animated, TouchableOpacity } from 'react-native'
import { Color, Constants, Styles } from '../../../common'
import { RippleEffect, Text } from '../../../component'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { getTruncate } from '../../../utils'

const Previous = () => {
  const { previousData } = useSelector(state => state.home)
  const navigation = useNavigation()
  const [fadeAnim] = useState(new Animated.Value(0))
  const [slideAnim] = useState(new Animated.Value(30))

  const previousShortList = previousData?.slice(0, 6)

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
      headerName: 'Previous Race',
      Slot: previousData
    })
  }

  const renderSlot = ({ item, index }) => {
    const delay = index * 100
    const isCancelled = item.cancel === 'c'
    
    return (
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <TouchableOpacity
          onPress={!isCancelled ? () => onSlot(item) : () => null}
          style={[
            styles.cardStyle,
            isCancelled && styles.cancelledCard
          ]}
          activeOpacity={0.8}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.statusIndicator, isCancelled && styles.cancelledIndicator]} />
            <MaterialCommunityIcons
              name={isCancelled ? "close-circle" : "flag-checkered"}
              size={16}
              color={isCancelled ? Color.mainPrimary : Color.TextSecondary}
              style={styles.cardIcon}
            />
          </View>
          
          <View style={styles.cardContent}>
            <Text numberOfLines={1} style={[styles.dateTxt, isCancelled && styles.cancelledText]}>
              {item.racedate}
            </Text>
            <Text numberOfLines={1} style={[styles.nameTxt, isCancelled && styles.cancelledText]}>
              {item.day}
            </Text>
            <Text numberOfLines={1} style={[styles.placeTxt, isCancelled && styles.cancelledText]}>
              {item.place}
            </Text>
            <Text numberOfLines={1} style={[styles.subTxt, isCancelled && styles.cancelledSubText]}>
              {item.label}
            </Text>
          </View>
          
          {isCancelled && (
            <View style={styles.cancelledBadge}>
              <Text style={styles.cancelledBadgeText}>CANCELLED</Text>
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
              name="flag-checkered"
              size={24}
              color={Color.mainPrimary}
            />
          </View>
          <Text style={styles.namelabel}>Previous Race</Text>
        </View>
        <TouchableOpacity onPress={() => onView()} style={styles.viewButton}>
          <Text style={styles.viewlabel}>View all</Text>
          <MaterialCommunityIcons name="chevron-right" size={16} color={Color.mainPrimary} />
        </TouchableOpacity>
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
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    marginHorizontal: 20
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
    backgroundColor: Color.mainPrimary + '20',
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
    borderWidth: 1,
    borderColor: Color.DivideDark + '30',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative'
  },
  cancelledCard: {
    backgroundColor: Color.Background + 'F0',
    borderColor: Color.mainPrimary + '50',
    opacity: 0.7
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
  cancelledIndicator: {
    backgroundColor: Color.mainPrimary
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
    color: Color.TextBlue
  },
  cancelledText: {
    color: Color.TextTertiary,
    textDecorationLine: 'line-through'
  },
  cancelledSubText: {
    color: Color.mainPrimary + '80'
  },
  cancelledBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: Color.mainPrimary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3
  },
  cancelledBadgeText: {
    fontSize: 8,
    fontFamily: Constants.fontFamilyBold,
    color: Color.Background
  }
})

export default Previous
