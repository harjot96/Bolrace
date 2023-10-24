import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Color } from '../../../common'
import Name from './Name'
import Previous from './Previous'
import Upcoming from './Upcoming'
import Filter from './Filter'
import Slider from './Slider'

export default function Home() {
  return (
    <View style={styles.mainContainer}>
      <Name />
      <Filter />
      <Upcoming />
      <Previous />
      <Slider />
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.Background,
    position: 'relative'
  },
  container: {
    flex: 0.5
  },
  subContainer: {
    flex: 2
  }
})
