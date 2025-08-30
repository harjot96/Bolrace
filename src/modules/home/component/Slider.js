import React, { useState, useEffect, useRef } from 'react'
import { Image, StyleSheet, View, Animated, TouchableOpacity, Dimensions } from 'react-native'
import { Color, Styles, Constants } from '../../../common'
import { useSelector } from 'react-redux'
import Swiper from 'react-native-swiper'
import { Text } from '../../../component'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const { width: screenWidth } = Dimensions.get('window')

export default function Slider() {
  const { sliderData } = useSelector(state => state.home)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fadeAnim] = useState(new Animated.Value(0))
  const [scaleAnim] = useState(new Animated.Value(0.8))
  const swiperRef = useRef(null)

  useEffect(() => {
    // Entry animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const handleIndexChanged = (index) => {
    setCurrentIndex(index)
    // Trigger animation for each slide change
    scaleAnim.setValue(0.95)
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }

  const handleSlidePress = (item, index) => {
    // Add interactive feedback
    console.log('Slide pressed:', item)
  }

  const renderSlide = (list, index) => {
    const isActive = index === currentIndex
    
    return (
      <Animated.View 
        key={index}
        style={[
          styles.slideContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: isActive ? scaleAnim : 0.95 }]
          }
        ]}
      >
        <TouchableOpacity
          style={styles.slideTouchable}
          onPress={() => handleSlidePress(list, index)}
          activeOpacity={0.9}
        >
          <Image source={{ uri: list.sliderimg }} style={styles.image} />
          
          {/* Overlay with gradient effect */}
          <View style={styles.overlay}>
            <View style={styles.overlayGradient} />
          </View>
          
          {/* Content overlay */}
          <View style={styles.contentOverlay}>
            <View style={styles.badgeContainer}>
              <MaterialCommunityIcons 
                name="star" 
                size={16} 
                color={Color.Background} 
              />
              <Text style={styles.badgeText}>Featured</Text>
            </View>
            
            <View style={styles.slideInfo}>
              <Text style={styles.slideTitle} numberOfLines={2}>
                {list.title || 'Exciting Race Event'}
              </Text>
              <Text style={styles.slideSubtitle} numberOfLines={1}>
                {list.subtitle || 'Don\'t miss this amazing opportunity'}
              </Text>
            </View>
          </View>
          
          {/* Interactive indicator */}
          <View style={styles.interactiveIndicator}>
            <MaterialCommunityIcons 
              name="gesture-tap" 
              size={20} 
              color={Color.Background + '80'} 
            />
          </View>
        </TouchableOpacity>
      </Animated.View>
    )
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Header with title */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <MaterialCommunityIcons 
            name="view-carousel" 
            size={24} 
            color={Color.Primary} 
          />
          <Text style={styles.headerTitle}>Featured Events</Text>
        </View>
        <View style={styles.slideCounter}>
          <Text style={styles.counterText}>
            {currentIndex + 1} / {sliderData?.length || 0}
          </Text>
        </View>
      </View>

      {/* Enhanced Swiper */}
      <View style={styles.swiperContainer}>
        <Swiper
          ref={swiperRef}
          key={sliderData?.length - 1}
          loop={true}
          autoplay={true}
          autoplayTimeout={4}
          showsPagination={false}
          showsButtons={false}
          onIndexChanged={handleIndexChanged}
          containerStyle={styles.swiperStyle}
          removeClippedSubviews={false}
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.activeDotStyle}
        >
          {sliderData && sliderData.map((list, index) => renderSlide(list, index))}
        </Swiper>
        
        {/* Custom pagination */}
        <View style={styles.customPagination}>
          {sliderData && sliderData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentIndex && styles.paginationDotActive
              ]}
            />
          ))}
        </View>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Styles.width,
    marginVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: Constants.fontFamilyBold,
    fontSize: Constants.fontLG,
    color: Color.TextPrimary,
    marginLeft: 8,
  },
  slideCounter: {
    backgroundColor: Color.Primary + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  counterText: {
    fontFamily: Constants.fontFamilyMedium,
    fontSize: Constants.fontSM,
    color: Color.Primary,
  },
  swiperContainer: {
    position: 'relative',
  },
  swiperStyle: {
    height: 220,
  },
  slideContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  slideTouchable: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  image: {
    height: 220,
    width: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlayGradient: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  contentOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    justifyContent: 'space-between',
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.Primary + 'CC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontFamily: Constants.fontFamilyMedium,
    fontSize: Constants.fontSM,
    color: Color.Background,
    marginLeft: 4,
  },
  slideInfo: {
    marginBottom: 16,
  },
  slideTitle: {
    fontFamily: Constants.fontFamilyBold,
    fontSize: Constants.fontLG,
    color: Color.Background,
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  slideSubtitle: {
    fontFamily: Constants.fontFamilyRegular,
    fontSize: Constants.fontMD,
    color: Color.Background + 'CC',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  interactiveIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: 8,
  },
  customPagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Color.TextTertiary + '50',
  },
  paginationDotActive: {
    backgroundColor: Color.Primary,
    width: 24,
  },
  dotStyle: {
    backgroundColor: Color.TextTertiary + '30',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activeDotStyle: {
    backgroundColor: Color.Primary,
    width: 24,
    height: 8,
    borderRadius: 4,
  },
})
