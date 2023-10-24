import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Color, Styles } from '../../../common'
import { useSelector } from 'react-redux'
import Swiper from 'react-native-swiper'

export default function Slider() {
  const { sliderData } = useSelector(state => state.home)

  return (
    <View style={styles.container}>
      <Swiper
        key={sliderData.length - 1}
        loop={true}
        autoplay={true}
        showsPagination
        showsButtons={false}
        containerStyle={{ height: 220 }}
        paginationStyle={{
          bottom: 0
        }}
        removeClippedSubviews={false}>
        {sliderData &&
          sliderData.map((list, index) => {
            return (
              <View key={index}>
                <Image source={{ uri: list.sliderimg }} style={styles.image} />
              </View>
            )
          })}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Styles.width
  },
  image: {
    marginLeft: 7,
    height: Styles.width / 2,
    width: Styles.width - 14,
    resizeMode: 'stretch' //"stretch" | "cover" | "contain"
  }
})
