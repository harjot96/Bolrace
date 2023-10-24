import React, { useLayoutEffect } from 'react'
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native'
import { Color, Constants, Device, Images, Styles } from '../../../common'
import { useNavigation } from '@react-navigation/native'
import { RippleEffect, Text } from '../../../component'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Oops from '../../../assets/image/oops.svg'

export default function TabView(props) {
  const dataList = props.route.params?.list
  const Oddslist = props.route.params?.Oddslist
  const label = props.route.params?.label
  const navigation = useNavigation()
  const header = label === 'HOT' ? 'Hot Selection' : 'Odds'

  const onBack = () => {
    navigation.goBack(null)
  }

  const LogoHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          zIndex: 2,
          paddingTop: Device.isIOS ? 50 : 0
        }}>
        <RippleEffect onPress={onBack}>
          <Ionicons
            name="md-arrow-back-outline"
            size={24}
            color={Color.Background}
            style={{ paddingHorizontal: 20 }}
          />
        </RippleEffect>
        <View>
          <Text style={styles.headerMain}>{header}</Text>
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
            justifyContent: 'center'
          }}
          source={Images.upcomingBg}>
          <LogoHeader {...props} />
          <View style={styles.overlay} />
        </ImageBackground>
      )
    })
  }, [navigation])

  const tableList =
    dataList &&
    dataList?.selection.map((data, index) => {
      const alternatingColor = ['#fff', '#fdf3f4']
      return (
        <View key={index} style={styles.mainCard}>
          <View
            style={[
              styles.blockCard,
              {
                backgroundColor:
                  alternatingColor[index % alternatingColor.length]
              }
            ]}>
            <Text style={styles.raceTxt}>{data.race}</Text>
          </View>
          <View style={[styles.blockCard, styles.f1]}>
            <Text style={styles.fieldTxt}>{data.field1}</Text>
          </View>
          <View style={[styles.blockCard, styles.f2]}>
            <Text style={styles.fieldTxt}>{data.field2}</Text>
          </View>
          <View style={[styles.blockCard, styles.f3]}>
            <Text style={styles.fieldTxt}>{data.field3}</Text>
          </View>
        </View>
      )
    })

  const oddList =
    Oddslist &&
    Oddslist?.horse.map((data, index) => {
      const alternatingColor = ['#fff', '#fdf3f4']
      return (
        <View key={index}>
          <View
            style={[
              styles.oodsWrap,
              {
                backgroundColor:
                  alternatingColor[index % alternatingColor.length]
              }
            ]}>
            <View style={{ width: '15%' }}>
              <View style={styles.boxStyle}>
                <Text style={styles.wTxt}>{data.w}</Text>
              </View>
            </View>
            <View style={{ width: '70%' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.posTxt}>{data.e_pos}</Text>
                <Text style={styles.nameTxt}>{data.horse_name}</Text>
              </View>
              <View style={styles.flexrow}>
                <Text style={styles.jkyTxt}>{data.trainer_name}</Text>
                <Text style={styles.jkyTxt}>{data.jockey_name}</Text>
              </View>
            </View>
            <View style={{ width: '15%' }}>
              <View style={styles.boxStyle}>
                <Text style={styles.wTxt}>{data.p}</Text>
              </View>
            </View>
          </View>
        </View>
      )
    })

  return (
    <View style={styles.mainContainer}>
      {label === 'HOT' ? (
        <>
          {dataList?.selection?.length > 0 ? (
            <View style={styles.wrapBorder}>{tableList}</View>
          ) : (
            <View>
              <View style={{ marginVertical: 15 }}>
                <Oops height={150} />
              </View>
              <View style={styles.emptyContainer}>
                <Text style={styles.lablTxt}>
                  No {header} Found Please Try After Some Time !!
                </Text>
              </View>
            </View>
          )}
        </>
      ) : (
        <>
          {Oddslist?.horse?.length > 0 ? (
            <ScrollView
              contentContainerStyle={{ paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}>
              <View style={{ alignItems: 'center', padding: 15 }}>
                <Text style={styles.oddHead}>{Oddslist.center}</Text>
                <Text style={styles.oddSub}>{Oddslist.heading}</Text>
              </View>
              <View style={styles.oddheader}>
                <Text style={styles.wTxt}>W</Text>
                <Text style={styles.wTxt}>P</Text>
              </View>
              {oddList}
            </ScrollView>
          ) : (
            <View>
              <View style={{ marginVertical: 15 }}>
                <Oops height={150} />
              </View>
              <View style={styles.emptyContainer}>
                <Text style={styles.lablTxt}>
                  No {header} Found Please Try After Some Time !!
                </Text>
              </View>
            </View>
          )}
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.Background
  },
  emptyContainer: {
    padding: 15,
    backgroundColor: Color.mainPrimary,
    width: Styles.width - 20,
    margin: 10,
    borderRadius: 10,
    borderWidth: 0.7
  },
  lablTxt: {
    color: Color.Background,
    fontFamily: Constants.fontFamilyMedium,
    fontSize: Constants.fontXL
  },
  blockCard: {
    borderRightWidth: 1,
    borderColor: Color.Background,
    width: '25%',
    padding: 10,
    alignItems: 'center'
  },
  raceTxt: {
    color: Color.mainPrimary,
    fontFamily: Constants.fontFamilyMedium,
    fontSize: Constants.fontXL
  },
  fieldTxt: {
    color: Color.Background,
    fontFamily: Constants.fontFamilyMedium,
    fontSize: Constants.fontXL
  },
  f1: {
    backgroundColor: '#800000'
  },
  f2: {
    backgroundColor: '#d46f73'
  },
  f3: {
    backgroundColor: '#ecbec0'
  },
  mainCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: Color.GrayLight,
    width: Styles.width - 21,
    alignItems: 'center'
  },
  wrapBorder: {
    borderWidth: 1,
    margin: 10,
    borderColor: Color.GrayLight
  },
  oodsWrap: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 1,
    width: '100%'
  },
  wTxt: {
    color: Color.TextSecondary,
    fontFamily: Constants.fontFamilyMedium,
    fontSize: Constants.fontXL
  },
  posTxt: {
    color: Color.mainPrimary,
    fontFamily: Constants.fontFamilyMedium,
    fontSize: Constants.fontXL
  },
  nameTxt: {
    color: Color.TextPrimary,
    fontFamily: Constants.fontFamilyMedium,
    fontSize: Constants.fontXL,
    paddingLeft: 5
  },
  jkyTxt: {
    color: Color.TextTertiary,
    fontFamily: Constants.fontFamilyRegular,
    fontSize: Constants.fontMD
  },
  oddHead: {
    color: Color.mainPrimary,
    fontFamily: Constants.fontFamilyMedium,
    fontSize: Constants.fontBig,
    paddingBottom: 8
  },
  oddSub: {
    color: Color.TextSecondary,
    fontFamily: Constants.fontFamilyRegular,
    fontSize: Constants.fontLG
  },
  oddheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 22,
    backgroundColor: Color.GrayLight
  },
  boxStyle: {
    borderWidth: 1,
    borderColor: Color.GrayLight,
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    marginRight: 15
  },
  flexrow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
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
