import React, { useEffect, useState } from 'react'
import {
  Alert,
  BackHandler,
  Image,
  Linking,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View
} from 'react-native'
import { Modal, RippleEffect, Spinner, Text } from '../../../component'
import Color from '../../../common/Color'
import Home from '../component'
import { useDispatch, useSelector } from 'react-redux'
import { Config, Constants, Images, Styles } from '../../../common'
import { getRaceData, getSliderData } from '../action'
import { dateFormat } from '../../../utils'
import Swiper from 'react-native-swiper'
import HTML from 'react-native-render-html'
import { useFocusEffect } from '@react-navigation/native'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.login)
  const { updateApp } = useSelector(state => state.home)
  const [isLoading, setLoading] = useState(false)
  const [isAdvertise, setAdvertise] = useState(false)
  const [isUpdateModel, setUpdateModel] = useState(false)
  const [isUpdateTime, setUpdateTime] = useState(false)
  const [addvertiseData, setAdvertiseData] = useState({})
  const [backClickCount, setBackClickCount] = useState(0)

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', onBackPress)
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress)
      }
    }, [backClickCount])
  )

  const onBackPress = () => {
    if (backClickCount > 0) {
      setBackClickCount(0)
      BackHandler.exitApp()
      return false
    } else {
      setTimeout(function () {
        setBackClickCount(0)
      }, 1000)
      setBackClickCount(backClickCount + 1)
      Alert.alert(
        'App Close !',
        'Do you want to close the app !',
        [
          { text: 'STAY' },
          {
            text: 'EXIT',
            onPress: () => BackHandler.exitApp()
          }
        ],
        { cancelable: false }
      )
      return true
    }
  }

  useEffect(() => {
    fetchSliderData()
    getInitialData()
  }, [])

  const advertiseModel = () => {
    setTimeout(() => {
      setAdvertise(false)
      setUpdateTime(true)
    }, 7000)
  }

  const getInitialData = () => {
    const date = dateFormat(new Date(), 'yyyy-MM-dd')
    fetchData(date)
  }

  const fetchData = date => {
    var bodyFormData = new FormData()
    bodyFormData.append('date', date)
    bodyFormData.append('authToken', userData.token)
    bodyFormData.append('updateToken', Config.APIConfig.apiVersion)
    bodyFormData.append('token', 'horseridingv1')
    bodyFormData.append('user', userData.user)
    dispatch(getRaceData(bodyFormData))
      .then(res => {
        if (res.value.data?.statuscode === 200) {
          setLoading(false)
          if (res.value.data?.data.update?.status === 1) {
            setUpdateModel(true)
          }
        } else {
          setLoading(false)
        }
      })
      .catch(err => {
        setLoading(false)
      })
  }

  const fetchSliderData = () => {
    setLoading(true)
    var bodyFormData = new FormData()
    bodyFormData.append('token', 'horseridingv1')
    bodyFormData.append('user', userData.user)
    dispatch(getSliderData(bodyFormData))
      .then(res => {
        if (res.value.data?.statuscode === 200) {
          setLoading(false)
          setAdvertiseData(res.value.data?.advertisement)
          setAdvertise(true)
          advertiseModel()
        } else {
          setLoading(false)
        }
      })
      .catch(err => {
        setLoading(false)
      })
  }

  const onRefreshData = () => {
    getInitialData()
  }

  const onUpdateApp = () => {
    Linking.canOpenURL(updateApp?.link)
      .then(() => {
        Linking.openURL(updateApp?.link)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <View style={styles.container}>
      {isLoading ? <Spinner /> : null}
      <ScrollView
        contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefreshData} />
        }>
        <Home />
      </ScrollView>
      {isAdvertise ? (
        <Modal
          isModalVisible={isAdvertise}
          modalBoxWrap={styles.modalBoxInfoWrap}
          wrap={styles.wrap}
          disableOnBackDropPress={true}>
          <View style={styles.swiperWrap}>
            <Swiper
              key={addvertiseData?.lists?.length - 1}
              loop={true}
              autoplay={true}
              showsPagination
              showsButtons={false}
              containerStyle={{
                flex: 0.9
              }}
              removeClippedSubviews={false}>
              {addvertiseData &&
                addvertiseData?.lists.map((list, index) => {
                  return (
                    <View key={index} style={styles.imageWrap}>
                      <Image
                        source={{ uri: list.image }}
                        style={styles.image}
                      />
                    </View>
                  )
                })}
            </Swiper>
          </View>
        </Modal>
      ) : null}

      <Modal
        isModalVisible={isUpdateModel && isUpdateTime}
        modalBoxWrap={styles.modalBoxInfoWrap}
        wrap={styles.wrap}
        disableOnBackDropPress={true}>
        <View style={styles.swiperWrap}>
          <View
            style={{
              flex: 1
            }}>
            <View style={{ marginTop: 30, flex: 2 }}>
              <Image
                source={Images.update}
                style={{
                  width: Styles.width - 10,
                  height: Styles.width - 10,
                  resizeMode: 'contain'
                }}
              />
            </View>

            <View
              style={{
                flex: 2,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <Text style={styles.mainTxt}>{updateApp.header}</Text>
              <HTML
                source={{ html: updateApp.message }}
                contentWidth={Styles.width}
              />
              <RippleEffect onPress={onUpdateApp} style={styles.button}>
                <Text style={{ color: Color.Background }}>Update</Text>
              </RippleEffect>
              <RippleEffect
                onPress={() => {
                  setUpdateModel(false), setUpdateTime(false)
                }}>
                <Text>Cancel</Text>
              </RippleEffect>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.Background },
  modalBoxInfoWrap: {
    position: 'absolute',
    backgroundColor: Color.Background,
    zIndex: 900,
    marginLeft: 0,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    bottom: -20,
    height: '100%',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
  },
  wrap: {
    flex: 1,
    zIndex: 999,
    position: 'relative',
    backgroundColor: 'rgba(255,255,255, 1)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  image: {
    height: Styles.height - 160,
    width: Styles.width,
    resizeMode: 'contain'
    // resizeMode: 'cover' //"stretch" | "cover" | "contain"
  },
  swiperWrap: {
    flex: 1,
    width: Styles.width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: Color.mainPrimary,
    padding: 12,
    borderRadius: 6,
    width: '50%',
    marginVertical: 30,
    marginBottom: 20,
    zIndex: 1,
    elevation: 4
  },
  mainTxt: {
    fontFamily: Constants.fontFamilyMedium,
    fontSize: Constants.fontBig,
    color: Color.TextPrimary,
    marginBottom: 15
  },
  subTxt: {
    fontFamily: Constants.fontFamilyRegular,
    fontSize: Constants.fontLG,
    color: Color.TextSecondary
  }
})

export default HomeScreen
