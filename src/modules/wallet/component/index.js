import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView, Animated, TouchableOpacity, Alert } from 'react-native'
import { Color, Constants, Device, Images, Styles } from '../../../common'
import { Text, RippleEffect } from '../../../component'
import { useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Wallet = () => {
  const navigation = useNavigation()
  const [balance] = useState(1250.75)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTab, setSelectedTab] = useState('all')
  
  // Animation values
  const fadeAnim = new Animated.Value(0)
  const slideAnim = new Animated.Value(50)
  const scaleAnim = new Animated.Value(0.8)
  const pulseAnim = new Animated.Value(1)

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

    // Pulse animation for balance card
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.02,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start()
  }, [])

  const handleAddMoney = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      Alert.alert('Success', 'Money added successfully!')
    }, 1500)
  }

  const handleWithdraw = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      Alert.alert('Success', 'Withdrawal request submitted!')
    }, 1500)
  }

  const mockTransactions = [
    {
      id: '1',
      type: 'credit',
      amount: 500,
      description: 'Race Winnings',
      date: '2024-01-15',
      time: '14:30',
      icon: 'trophy',
      color: Color.Primary
    },
    {
      id: '2',
      type: 'debit',
      amount: 150,
      description: 'Bet Placed',
      date: '2024-01-14',
      time: '10:15',
      icon: 'horse',
      color: Color.mainPrimary
    },
    {
      id: '3',
      type: 'credit',
      amount: 300,
      description: 'Bonus Credit',
      date: '2024-01-13',
      time: '09:45',
      icon: 'gift',
      color: '#4CAF50'
    },
    {
      id: '4',
      type: 'debit',
      amount: 75,
      description: 'Service Fee',
      date: '2024-01-12',
      time: '16:20',
      icon: 'credit-card',
      color: '#FF9800'
    }
  ]

  const renderTransaction = (item, index) => {
    const isCredit = item.type === 'credit'
    const delay = index * 100

    return (
      <Animated.View
        key={item.id}
        style={[
          styles.transactionCard,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }
        ]}
      >
        <View style={styles.transactionLeft}>
          <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
            <MaterialCommunityIcons
              name={item.icon}
              size={20}
              color={item.color}
            />
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTitle}>{item.description}</Text>
            <Text style={styles.transactionDate}>{item.date} • {item.time}</Text>
          </View>
        </View>
        <View style={styles.transactionRight}>
          <Text style={[styles.transactionAmount, { color: isCredit ? Color.Primary : Color.mainPrimary }]}>
            {isCredit ? '+' : '-'}₹{item.amount.toFixed(2)}
          </Text>
        </View>
      </Animated.View>
    )
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Animated.View style={[styles.headerContent, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.headerTitle}>My Wallet</Text>
          <Text style={styles.headerSubtitle}>Manage your funds</Text>
        </Animated.View>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View 
          style={[
            styles.balanceCard, 
            { 
              opacity: fadeAnim, 
              transform: [{ scale: scaleAnim }, { scale: pulseAnim }] 
            }
          ]}
        >
          <View style={styles.balanceGradient}>
            <View style={styles.balanceHeader}>
              <View style={styles.walletIconContainer}>
                <MaterialCommunityIcons
                  name="wallet"
                  size={24}
                  color={Color.Background}
                />
              </View>
              <Text style={styles.balanceLabel}>Total Balance</Text>
            </View>
            <Text style={styles.balanceAmount}>₹{balance.toFixed(2)}</Text>
            <View style={styles.balanceStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>₹850.50</Text>
                <Text style={styles.statLabel}>This Month</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>₹2,450.25</Text>
                <Text style={styles.statLabel}>Total Won</Text>
              </View>
            </View>
          </View>
        </Animated.View>
        
        <Animated.View style={[styles.actionButtons, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleAddMoney}
            disabled={isLoading}
          >
            <View style={styles.buttonGradient}>
              <MaterialCommunityIcons
                name="plus-circle"
                size={28}
                color={Color.Background}
              />
              <Text style={styles.buttonText}>Add Money</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleWithdraw}
            disabled={isLoading}
          >
            <View style={[styles.buttonGradient, { backgroundColor: Color.mainPrimary }]}>
              <MaterialCommunityIcons
                name="cash-multiple"
                size={28}
                color={Color.Background}
              />
              <Text style={styles.buttonText}>Withdraw</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[styles.tabContainer, { opacity: fadeAnim }]}>
          <View style={styles.tabButtons}>
            {['all', 'credit', 'debit'].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tabButton, selectedTab === tab && styles.activeTabButton]}
                onPress={() => setSelectedTab(tab)}
              >
                <Text style={[styles.tabButtonText, selectedTab === tab && styles.activeTabButtonText]}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
        
        <View style={styles.transactionSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {mockTransactions.length > 0 ? (
            mockTransactions.map((item, index) => renderTransaction(item, index))
          ) : (
            <Animated.View style={[styles.noTransactions, { opacity: fadeAnim }]}>
              <MaterialCommunityIcons
                name="wallet-outline"
                size={64}
                color={Color.TextTertiary}
              />
              <Text style={styles.noTransactionsText}>No transactions yet</Text>
              <Text style={styles.noTransactionsSubtext}>Start betting to see your transaction history</Text>
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
  balanceCard: {
    marginBottom: 25,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: Color.Primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8
  },
  balanceGradient: {
    backgroundColor: Color.Primary,
    padding: 25
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  walletIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Color.Background + '30',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  balanceLabel: {
    fontSize: Constants.fontMD,
    fontFamily: Constants.fontFamilyMedium,
    color: Color.Background + 'CC'
  },
  balanceAmount: {
    fontSize: 36,
    fontFamily: Constants.fontFamilyBold,
    color: Color.Background,
    marginBottom: 20
  },
  balanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  statItem: {
    flex: 1,
    alignItems: 'center'
  },
  statValue: {
    fontSize: Constants.fontLG,
    fontFamily: Constants.fontFamilyBold,
    color: Color.Background,
    marginBottom: 4
  },
  statLabel: {
    fontSize: Constants.fontSM,
    fontFamily: Constants.fontFamilyMedium,
    color: Color.Background + 'CC'
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: Color.Background + '40'
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  buttonGradient: {
    backgroundColor: Color.Primary,
    padding: 20,
    alignItems: 'center',
    borderRadius: 15
  },
  buttonText: {
    fontSize: Constants.fontMD,
    fontFamily: Constants.fontFamilyBold,
    color: Color.Background,
    marginTop: 8
  },
  tabContainer: {
    marginBottom: 20
  },
  tabButtons: {
    flexDirection: 'row',
    backgroundColor: Color.Background,
    borderRadius: 12,
    padding: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8
  },
  activeTabButton: {
    backgroundColor: Color.Primary + '20'
  },
  tabButtonText: {
    fontSize: Constants.fontSM,
    fontFamily: Constants.fontFamilyMedium,
    color: Color.TextTertiary
  },
  activeTabButtonText: {
    color: Color.Primary,
    fontFamily: Constants.fontFamilyBold
  },
  transactionSection: {
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
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Color.Background,
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  transactionDetails: {
    flex: 1
  },
  transactionTitle: {
    fontSize: Constants.fontMD,
    fontFamily: Constants.fontFamilyBold,
    color: Color.TextPrimary,
    marginBottom: 4
  },
  transactionDate: {
    fontSize: Constants.fontSM,
    fontFamily: Constants.fontFamilyMedium,
    color: Color.TextTertiary
  },
  transactionRight: {
    alignItems: 'flex-end'
  },
  transactionAmount: {
    fontSize: Constants.fontMD,
    fontFamily: Constants.fontFamilyBold
  },
  noTransactions: {
    alignItems: 'center',
    paddingVertical: 40
  },
  noTransactionsText: {
    fontSize: Constants.fontLG,
    fontFamily: Constants.fontFamilyBold,
    color: Color.TextTertiary,
    marginTop: 16,
    marginBottom: 8
  },
  noTransactionsSubtext: {
    fontSize: Constants.fontMD,
    fontFamily: Constants.fontFamilyMedium,
    color: Color.TextTertiary,
    textAlign: 'center'
  }
})

export default Wallet
