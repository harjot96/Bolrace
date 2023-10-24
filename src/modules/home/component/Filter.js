import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Color, Constants, Styles } from '../../../common'
import { RippleEffect, Text, Modal } from '../../../component'
// import MarqueeText from 'react-native-marquee'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux'
import MarqueeView from 'react-native-marquee-view'

export default function Filter() {
  const { message } = useSelector(state => state.home)
  const [isFilterToggle, setFilterToggle] = useState(false)

  const onFilter = () => {
    setFilterToggle(!isFilterToggle)
  }

  const filterMenu = [
    { key: '1', list: 'BRITISH' },
    { key: '1', list: 'IRELAND' },
    { key: '1', list: 'AUSTRALIA' },
    { key: '1', list: 'SOUTH_KOREA' },
    { key: '1', list: 'UAE' },
    { key: '1', list: 'FRANCE' },
    { key: '1', list: 'SOUTH_AFFRICA' },
    { key: '1', list: 'USA' },
    { key: '1', list: 'HONG_KONG' }
  ]

  const list = filterMenu.map((data, index) => {
    return (
      <View key={index} style={styles.filterMenuWrap}>
        <Text style={styles.filterMenuTxt}>{data.list}</Text>
      </View>
    )
  })

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.txtStyle}>News :</Text>
        </View>
        <View style={styles.subContainer}>
          <MarqueeView style={styles.marqueeWidth}>
            <View style={styles.marqueeWidth}>
              <Text style={styles.txtStyle}>{message}</Text>
            </View>
          </MarqueeView>
        </View>
      </View>
      <View>
        <View
          style={[
            styles.container,
            {
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: Color.GrayLight
            }
          ]}>
          <View>
            <Text style={styles.filterTxt}>Filter Records</Text>
          </View>
          <RippleEffect onPress={() => onFilter()}>
            <Ionicons name="filter-sharp" size={20} color="black" />
          </RippleEffect>
        </View>
      </View>

      <Modal
        isModalVisible={isFilterToggle}
        closeModalLayout={() => setFilterToggle(false)}
        modalBoxWrap={styles.modalBoxInfoWrap}
        wrap={styles.wrap}>
        <View style={{ width: Styles.width, padding: 15 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View></View>
            <View>
              <Ionicons
                name="close"
                size={24}
                color="black"
                onPress={() => setFilterToggle(false)}
              />
            </View>
          </View>

          <View style={{ alignItems: 'center', padding: 15 }}>
            <ScrollView
              contentContainerStyle={{
                width: Styles.width - 60,
                paddingBottom: 40
              }}
              showsVerticalScrollIndicator={false}>
              {list}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  titleContainer: {
    width: '20%',
    padding: 10,
    alignItems: 'center',
    backgroundColor: Color.mainPrimary
  },
  subContainer: {
    width: '100%',
    padding: 10,
    paddingRight: 20,
    backgroundColor: Color.mainPrimaryLight
  },
  txtStyle: {
    fontFamily: Constants.fontFamilyRegular,
    fontSize: Constants.fontLG,
    color: Color.Background
  },
  filterTxt: {
    fontFamily: Constants.fontFamilyMedium,
    fontSize: Constants.fontLG,
    color: Color.TextPrimary
  },
  modalBoxInfoWrap: {
    position: 'absolute',
    backgroundColor: Color.Background,
    zIndex: 900,
    marginLeft: 0,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    bottom: -20,
    height: 350,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  wrap: {
    flex: 1,
    zIndex: 999,
    position: 'relative',
    backgroundColor: 'rgba(255,255,255, 1)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  filterMenuTxt: {
    fontFamily: Constants.fontFamilyRegular,
    fontSize: Constants.fontLG,
    color: Color.TextSecondary
  },
  filterMenuWrap: {
    width: '100%',
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Color.GrayLight,
    alignItems: 'center'
  },
  marqueeWidth: {
    width: Styles.width - 120
  }
})
