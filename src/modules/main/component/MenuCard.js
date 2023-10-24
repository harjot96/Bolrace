import React, { useLayoutEffect } from 'react'
import { FlatList, Image, StyleSheet, View } from 'react-native'
import { Color, Images, Styles } from '../../../common'
import { useNavigation } from '@react-navigation/native'
import { RippleEffect, Text } from '../../../component'

import RaceCard from '../../../assets/image/race.png'
import Track from '../../../assets/image/track.svg'
import Incident from '../../../assets/image/incident.svg'
import Hotline from '../../../assets/image/hotline.svg'
import Swimming from '../../../assets/image/swimming.svg'
import Trainer from '../../../assets/image/trainer.svg'
import Jocky from '../../../assets/image/jocky.svg'
import Commentary from '../../../assets/image/commentary.svg'
import Whistory from '../../../assets/image/line-chart.png'
import Multiselection from '../../../assets/image/multi-selection.svg'
import Cresult from '../../../assets/image/trophy.svg'
import Video from '../../../assets/image/video-svgrepo-com.svg'
import Link from '../../../assets/image/link-alt-1-svgrepo-com.svg'

export default function MenuCard({ onSlot, logo }) {
  const navigation = useNavigation()

  const dataCard = [
    {
      name: 'Race Card',
      image: RaceCard,
      value: 'web_race_reports'
    },
    {
      name: 'Track',
      image: Track,
      value: 'track_reports'
    },
    {
      name: 'Incidents',
      image: Incident,
      value: 'incidence_reports'
    },
    {
      name: 'Hotline',
      image: Hotline,
      value: 'hotline_reports'
    },
    {
      name: 'Swimming',
      image: Swimming,
      value: 'swimming_reports'
    },
    {
      name: 'Trainer Eng.',
      image: Trainer,
      value: 'trainer_reports'
    },
    {
      name: 'Jockey Eng.',
      image: Jocky,
      value: 'Jockey_reports'
    },
    {
      name: 'Commentry',
      image: Commentary,
      value: 'commentary_reports'
    },
    {
      name: 'W History',
      image: Whistory,
      value: 'winninghistoryReports'
    },
    {
      name: 'Multi Selection',
      image: Multiselection,
      value: 'multi_selection'
    },
    {
      name: 'C Result',
      image: Cresult,
      value: 'results_reports'
    },
    {
      name: 'Links',
      image: Link,
      value: 'results_reports'
    },
    {
      name: 'Videos',
      image: Video,
      value: 'results_reports'
    }
  ]

  const renderSlot = ({ item }) => {
    return (
      <RippleEffect onPress={() => onSlot(item)} style={styles.menu}>
        {item.name === 'Race Card' || item.name === 'W History' ? (
          <View>
            <Image
              source={
                item.name === 'Race Card' ? Images.raceP : Images.lineChart
              }
              style={{ height: 30, width: 30 }}
            />
          </View>
        ) : (
          <item.image height={30} width={30} />
        )}
        <Text>{item.name}</Text>
      </RippleEffect>
    )
  }

  return (
    <View style={styles.mainContainer}>
      {logo ? (
        <Image
          source={{ uri: logo }}
          style={{ height: 40, width: 40, margin: 10 }}
        />
      ) : null}
      <FlatList
        data={dataCard}
        renderItem={renderSlot}
        horizontal={false}
        numColumns={3}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.Background,
    position: 'relative',
    padding: 10
  },
  menu: {
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Color.mainSecondary,
    height: 100,
    width: Styles.width / 3.6,
    margin: 8,
    borderRadius: 7,
    padding: 10
  }
})
