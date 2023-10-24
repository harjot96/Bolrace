import React, { useLayoutEffect } from 'react'
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  ImageBackground
} from 'react-native'
import { Constants, Images, Color, Styles, Device } from '../../../common'
import { Text } from '../../../component'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'

export default function News() {
  const navigation = useNavigation()

  const LogoHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          zIndex: 2,
          paddingLeft: 20,
          paddingTop: Device.isIOS ? 50 : 0
        }}>
        <View>
          <Text style={styles.headerMain}>News</Text>
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
          source={Images.termsBg}>
          <LogoHeader />
          <View style={styles.overlay} />
        </ImageBackground>
      )
    })
  }, [navigation])

  const dataList = [
    {
      key: '1',
      image: Images.trainerP,
      message: 'Today Banglore race has been Cancelled',
      date: '2023-05-21 16:16:25',
      subTxt: 'Admin',
      status: 1
    },
    {
      key: '2',
      image: Images.trainerP,
      message: 'Today Banglore race has been Cancelled',
      date: '2023-05-21 16:16:25',
      subTxt: 'Admin',
      status: 0
    },
    {
      key: '3',
      image: Images.trainerP,
      message: 'Today Banglore race has been Cancelled',
      date: '2023-05-21 16:16:25',
      subTxt: 'Admin'
    }
  ]

  const list =
    dataList &&
    dataList.map((item, index) => {
      return (
        <View key={index} style={styles.mainCard}>
          <Image
            source={item.image}
            style={{ height: 100, width: 100, margin: 15 }}
          />
          <View style={styles.messageWrap}>
            <Text style={styles.mainTxt}>{item.message}</Text>
          </View>
          <View
            style={[
              styles.footerCard,
              item.status === 1 ? { backgroundColor: Color.Primary } : {}
            ]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons
                name="time-outline"
                size={15}
                color={Color.TextSecondary}
                style={{ marginRight: 5 }}
              />
              <Text style={styles.subTxt}>{item.date}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AntDesign
                name="message1"
                size={15}
                color={Color.TextSecondary}
                style={{ marginRight: 15 }}
              />
              <Text style={styles.subTxt}>{item.subTxt}</Text>
            </View>
          </View>
        </View>
      )
    })
  return (
    <View style={styles.mainContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          width: Styles.width - 10,
          paddingBottom: 100
        }}>
        {list}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: Color.BackgroundLight
  },
  mainCard: {
    margin: 10,
    height: 220,
    elevation: 2,
    width: Styles.width - 20,
    borderRadius: 6,
    position: 'relative',
    alignItems: 'center',
    backgroundColor: Color.Background
  },
  footerCard: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  mainTxt: {
    fontSize: Constants.fontLG,
    fontFamily: Constants.fontFamilyMedium,
    color: Color.TextPrimary
  },
  subTxt: {
    fontSize: Constants.fontLG,
    fontFamily: Constants.fontFamilyMedium,
    color: Color.TextSecondary
  },
  messageWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    paddingHorizontal: 10
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
