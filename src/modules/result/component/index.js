import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView, Animated, TouchableOpacity, FlatList } from 'react-native'
import { Color, Constants, Device, Images, Styles } from '../../../common'
import { Text, RippleEffect } from '../../../component'
import { useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Result = () => {
  const navigation = useNavigation()
  const [selectedDate, setSelectedDate] = useState('Today')
  const [selectedFilter, setSelectedFilter] = useState('all')
  
  // Animation values
  const fadeAnim = new Animated.Value(0)
  const slideAnim = new Animated.Value(50)
  const scaleAnim = new Animated.Value(0.8)

  useEffect(() => {
    // Start animations when component mounts
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
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  // Mock data for results
  const mockResults = [
    {
      id: '1',
      raceName: 'Mumbai Derby',
      date: '2024-01-15',
      time: '15:30',
      winner: 'Thunder Bolt',
      jockey: 'Rajesh Kumar',
      trainer: 'Amit Patel',
      time: '1:45.2',
      distance: '1600m',
      prize: '₹50,00,000',
      participants: 12,
      status: 'completed',
      color: Color.Primary
    },
    {
      id: '2',
      raceName: 'Delhi Sprint',
      date: '2024-01-15',
      time: '14:15',
      winner: 'Speed Demon',
      jockey: 'Priya Singh',
      trainer: 'Rahul Sharma',
      time: '2:12.8',
      distance: '2000m',
      prize: '₹35,00,000',
      participants: 8,
      status: 'completed',
      color: '#4CAF50'
    },
    {
      id: '3',
      raceName: 'Chennai Classic',
      date: '2024-01-15',
      time: '13:45',
      winner: 'Royal Star',
      jockey: 'Vikram Malhotra',
      trainer: 'Deepak Verma',
      time: '1:38.5',
      distance: '1400m',
      prize: '₹25,00,000',
      participants: 10,
      status: 'completed',
      color: '#FF9800'
    },
    {
      id: '4',
      raceName: 'Bangalore Cup',
      date: '2024-01-14',
      time: '16:00',
      winner: 'Golden Arrow',
      jockey: 'Suresh Kumar',
      trainer: 'Mohan Das',
      time: '1:52.1',
      distance: '1800m',
      prize: '₹40,00,000',
      participants: 15,
      status: 'completed',
      color: '#9C27B0'
    }
  ]

  const dateOptions = ['Today', 'Yesterday', 'This Week', 'This Month']
  const filterOptions = ['all', 'derby', 'sprint', 'classic']

  const renderResultItem = ({ item, index }) => {
    return (
      <Animated.View
        style={[
          styles.resultCard,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }
        ]}
      >
        <View style={styles.resultHeader}>
          <View style={styles.raceInfo}>
            <Text style={styles.raceName}>{item.raceName}</Text>
            <View style={styles.raceMeta}>
              <MaterialCommunityIcons name="calendar" size={14} color={Color.TextTertiary} />
              <Text style={styles.raceDate}>{item.date}</Text>
              <MaterialCommunityIcons name="clock-outline" size={14} color={Color.TextTertiary} />
              <Text style={styles.raceTime}>{item.time}</Text>
            </View>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: item.color + '20' }]}>
            <Text style={[styles.statusText, { color: item.color }]}>Completed</Text>
          </View>
        </View>
        
        <View style={styles.winnerSection}>
          <View style={styles.winnerHeader}>
            <MaterialCommunityIcons name="trophy" size={20} color={item.color} />
            <Text style={styles.winnerLabel}>Winner</Text>
          </View>
          <Text style={styles.winnerName}>{item.winner}</Text>
        </View>
        
        <View style={styles.resultDetails}>
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <MaterialCommunityIcons name="account" size={16} color={Color.TextTertiary} />
              <Text style={styles.detailLabel}>Jockey</Text>
              <Text style={styles.detailValue}>{item.jockey}</Text>
            </View>
            <View style={styles.detailItem}>
              <MaterialCommunityIcons name="account-tie" size={16} color={Color.TextTertiary} />
              <Text style={styles.detailLabel}>Trainer</Text>
              <Text style={styles.detailValue}>{item.trainer}</Text>
            </View>
          </View>
          
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <MaterialCommunityIcons name="clock-outline" size={16} color={Color.TextTertiary} />
              <Text style={styles.detailLabel}>Time</Text>
              <Text style={styles.detailValue}>{item.time}</Text>
            </View>
            <View style={styles.detailItem}>
              <MaterialCommunityIcons name="map-marker-distance" size={16} color={Color.TextTertiary} />
              <Text style={styles.detailLabel}>Distance</Text>
              <Text style={styles.detailValue}>{item.distance}</Text>
            </View>
          </View>
          
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <MaterialCommunityIcons name="currency-inr" size={16} color={Color.TextTertiary} />
              <Text style={styles.detailLabel}>Prize</Text>
              <Text style={styles.detailValue}>{item.prize}</Text>
            </View>
            <View style={styles.detailItem}>
              <MaterialCommunityIcons name="account-group" size={16} color={Color.TextTertiary} />
              <Text style={styles.detailLabel}>Participants</Text>
              <Text style={styles.detailValue}>{item.participants}</Text>
            </View>
          </View>
        </View>
      </Animated.View>
    )
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Animated.View style={[styles.headerContent, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.headerTitle}>Race Results</Text>
          <Text style={styles.headerSubtitle}>Latest race outcomes</Text>
        </Animated.View>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.filterSection, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateFilter}>
            {dateOptions.map((date) => (
              <TouchableOpacity
                key={date}
                style={[styles.dateButton, selectedDate === date && styles.activeDateButton]}
                onPress={() => setSelectedDate(date)}
              >
                <Text style={[styles.dateButtonText, selectedDate === date && styles.activeDateButtonText]}>
                  {date}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryFilter}>
            {filterOptions.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[styles.categoryButton, selectedFilter === filter && styles.activeCategoryButton]}
                onPress={() => setSelectedFilter(filter)}
              >
                <MaterialCommunityIcons
                  name={filter === 'all' ? 'view-list' : filter === 'derby' ? 'trophy' : filter === 'sprint' ? 'lightning-bolt' : 'star'}
                  size={16}
                  color={selectedFilter === filter ? Color.Background : Color.TextTertiary}
                />
                <Text style={[styles.categoryButtonText, selectedFilter === filter && styles.activeCategoryButtonText]}>
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>
        
        <View style={styles.resultsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Results</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {mockResults.length > 0 ? (
            <FlatList
              data={mockResults}
              renderItem={renderResultItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          ) : (
            <Animated.View style={[styles.noResults, { opacity: fadeAnim }]}>
              <MaterialCommunityIcons
                name="flag-checkered"
                size={64}
                color={Color.TextTertiary}
              />
              <Text style={styles.noResultsText}>No results available</Text>
              <Text style={styles.noResultsSubtext}>Check back later for race results</Text>
            </Animated.View>
          )}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.Background
  },
  header: {
    backgroundColor: Color.mainPrimary,
    paddingTop: Device.isIOS ? 50 : 20,
    paddingBottom: 30,
    paddingHorizontal: 20
  },
  headerContent: {
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: Constants.fontXL,
    fontFamily: Constants.fontFamilyBold,
    color: Color.Background,
    marginBottom: 4
  },
  headerSubtitle: {
    fontSize: Constants.fontMD,
    fontFamily: Constants.fontFamilyMedium,
    color: Color.Background + 'CC'
  },
  content: {
    flex: 1,
    padding: 20
  },
  filterSection: {
    marginBottom: 25
  },
  dateFilter: {
    marginBottom: 15
  },
  dateButton: {
    backgroundColor: Color.Background,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  activeDateButton: {
    backgroundColor: Color.Primary
  },
  dateButtonText: {
    fontSize: Constants.fontSM,
    fontFamily: Constants.fontFamilyMedium,
    color: Color.TextTertiary
  },
  activeDateButtonText: {
    color: Color.Background,
    fontFamily: Constants.fontFamilyBold
  },
  categoryFilter: {
    marginBottom: 10
  },
  categoryButton: {
    backgroundColor: Color.Background,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  activeCategoryButton: {
    backgroundColor: Color.Primary
  },
  categoryButtonText: {
    fontSize: Constants.fontSM,
    fontFamily: Constants.fontFamilyMedium,
    color: Color.TextTertiary,
    marginLeft: 5
  },
  activeCategoryButtonText: {
    color: Color.Background,
    fontFamily: Constants.fontFamilyBold
  },
  resultsSection: {
    flex: 1
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: Constants.fontLG,
    fontFamily: Constants.fontFamilyBold,
    color: Color.TextPrimary
  },
  viewAllText: {
    fontSize: Constants.fontMD,
    fontFamily: Constants.fontFamilyMedium,
    color: Color.Primary
  },
  resultCard: {
    backgroundColor: Color.Background,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: Color.TextTertiary + '20'
  },
  raceInfo: {
    flex: 1
  },
  raceName: {
    fontSize: Constants.fontLG,
    fontFamily: Constants.fontFamilyBold,
    color: Color.TextPrimary,
    marginBottom: 5
  },
  raceMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  raceDate: {
    fontSize: Constants.fontSM,
    fontFamily: Constants.fontFamilyMedium,
    color: Color.TextTertiary,
    marginRight: 10
  },
  raceTime: {
    fontSize: Constants.fontSM,
    fontFamily: Constants.fontFamilyMedium,
    color: Color.TextTertiary
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12
  },
  statusText: {
    fontSize: Constants.fontSM,
    fontFamily: Constants.fontFamilyBold
  },
  winnerSection: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: Color.TextTertiary + '20'
  },
  winnerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  winnerLabel: {
    fontSize: Constants.fontMD,
    fontFamily: Constants.fontFamilyBold,
    color: Color.TextPrimary,
    marginLeft: 8
  },
  winnerName: {
    fontSize: Constants.fontXL,
    fontFamily: Constants.fontFamilyBold,
    color: Color.Primary
  },
  resultDetails: {
    gap: 15
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: Color.Background,
    borderRadius: 8,
    marginHorizontal: 5
  },
  detailLabel: {
    fontSize: Constants.fontSM,
    fontFamily: Constants.fontFamilyMedium,
    color: Color.TextTertiary,
    marginTop: 4,
    marginBottom: 2
  },
  detailValue: {
    fontSize: Constants.fontMD,
    fontFamily: Constants.fontFamilyBold,
    color: Color.TextPrimary
  },
  noResults: {
    alignItems: 'center',
    paddingVertical: 40
  },
  noResultsText: {
    fontSize: Constants.fontLG,
    fontFamily: Constants.fontFamilyBold,
    color: Color.TextTertiary,
    marginTop: 16,
    marginBottom: 8
  },
  noResultsSubtext: {
    fontSize: Constants.fontMD,
    fontFamily: Constants.fontFamilyMedium,
    color: Color.TextTertiary,
    textAlign: 'center'
  }
})

export default Result
