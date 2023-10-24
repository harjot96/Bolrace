import React, { useEffect, useLayoutEffect, useState } from 'react'
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native'
import { Constants, Color, Styles, Images, Device } from '../../../common'
import { Text, RippleEffect, Spinner } from '../../../component'
import { useDispatch, useSelector } from 'react-redux'
import { dateFormat } from '../../../utils'
import { getCalanderData } from '../action'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import AntDesign from 'react-native-vector-icons/AntDesign'
import DatePicker from 'react-native-date-picker'

export default function Calander() {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { userData } = useSelector(state => state.login)

  const [isLoading, setLoading] = useState(false)
  const [isOpen, setOpen] = useState(false)
  const [date, setDate] = useState('')
  const [calanderList, setCalanderList] = useState({})

  const onDateChange = dt => {
    const date = dateFormat(dt, 'yyyy-MM-DD')
    fetchData(date)
  }

  const LogoHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 2,
          paddingHorizontal: 20,
          paddingTop: Device.isIOS ? 50 : 0
        }}>
        <View>
          <Text style={styles.headerMain}>Race Calander</Text>
        </View>
        <View>
          <RippleEffect onPress={() => setOpen(true)}>
            <AntDesign name="calendar" size={25} color={Color.Background} />
          </RippleEffect>
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
          <LogoHeader />
          <View style={styles.overlay} />
        </ImageBackground>
      )
    })
  }, [navigation])

  useEffect(() => {
    const date = dateFormat(new Date(), 'yyyy-MM-DD')
    fetchData(date)
  }, [])

  const fetchData = date => {
    setLoading(true)
    setOpen(false)
    var bodyFormData = new FormData()
    bodyFormData.append('token', 'horseridingv1')
    bodyFormData.append('authToken', userData.token)
    bodyFormData.append('date', date)
    dispatch(getCalanderData(bodyFormData))
      .then(res => {
        if (res.value.data?.statuscode === 200) {
          setLoading(false)
          setCalanderList(res.value.data?.data || {})
          Toast.show({
            position: 'bottom',
            text1: res.value.data?.message,
            visibilityTime: 1000
          })
        }
      })
      .catch(err => {
        setLoading(false)
      })
  }

  let list = []
  for (const key in calanderList) {
    if (Object.hasOwnProperty.call(calanderList, key)) {
      const items = calanderList[key]
      items.forEach(data => {
        list.push(
          <View key={Math.random()}>
            <View style={styles.rowFlex}>
              <View style={{ width: '15%', alignItems: 'center' }}>
                <Text style={styles.dtStyle}>{data.fixtureday}</Text>
                <Text style={styles.dayStyle}>{data.fixturedate}</Text>
                <Text style={styles.dtStyle}>{data.fixturemonth}</Text>
              </View>
              <View
                style={[
                  styles.cardStyle,
                  { borderLeftColor: data.color_code }
                ]}>
                <Text style={styles.namelabel}>{data.label}</Text>
                <Text style={styles.sublabel}>{data.title}</Text>
              </View>
            </View>
          </View>
        )
      })
    }
  }

  return (
    <View style={styles.mainContainer}>
      {isLoading ? <Spinner /> : null}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}>
        {list}
        <DatePicker
          mode="date"
          modal
          open={isOpen}
          date={new Date()}
          onConfirm={date => onDateChange(date)}
          onCancel={() => setOpen(false)}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  rowFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5
  },
  namelabel: {
    fontFamily: Constants.fontFamilyMedium,
    fontSize: Constants.fontXL,
    color: Color.TextPrimary
  },
  sublabel: {
    fontFamily: Constants.fontFamilyMedium,
    fontSize: Constants.fontMD,
    color: Color.TextTertiary
  },
  dtStyle: {
    fontFamily: Constants.fontFamilyRegular,
    fontSize: Constants.fontMD,
    color: Color.TextTertiary
  },
  dayStyle: {
    fontFamily: Constants.fontFamilyMedium,
    fontSize: Constants.fontXL,
    color: Color.TextPrimary
  },
  cardStyle: {
    width: '85%',
    backgroundColor: Color.Background,
    height: '100%',
    borderLeftWidth: 5,
    borderLeftColor: Color.Primary,
    padding: 10,
    ...Styles.elevation
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
