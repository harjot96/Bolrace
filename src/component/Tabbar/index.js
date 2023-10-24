/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Device, Color, withTheme, Styles } from '@common'
import { StackActions, NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

@withTheme
class TabBar extends PureComponent {
  onPress = (index, route) => {
    this.refs[`tabItem${index}`].flipInY(900)
    if (index === 0) {
    } else if (index === 1) {
    } else if (index === 3) {
    } else if (index === 1) {
    } else if (index === 4) {
      this.props.navigation.navigate('Search')
    }
    this.props.jumpTo(route.key)
  }

  render() {
    const { navigation, renderIcon, activeTintColor, inactiveTintColor } =
      this.props
    const {
      theme: {
        colors: { background }
      }
    } = this.props
    const { routes } = navigation.state

    const ignoreScreen = ['RewardScreen', 'SearchScreen', 'Detail']

    return (
      <View style={styles(background).tabbar}>
        {routes &&
          routes.map((route, index) => {
            const focused = index === navigation.state.index
            const tintColor = focused ? activeTintColor : inactiveTintColor

            if (ignoreScreen.indexOf(route.key) > -1) {
              return <View key={route.key} />
            }

            return (
              <TouchableWithoutFeedback
                key={route.key}
                style={styles().tab}
                onPress={() => this.onPress(index, route)}>
                <Animatable.View ref={`tabItem${index}`} style={styles().tab}>
                  {renderIcon({
                    route,
                    index,
                    focused,
                    tintColor
                  })}
                </Animatable.View>
              </TouchableWithoutFeedback>
            )
          })}
      </View>
    )
  }
}

TabBar.propTypes = {
  user: PropTypes.object,
  navigation: PropTypes.object,
  renderIcon: PropTypes.any,
  activeTintColor: PropTypes.string,
  inactiveTintColor: PropTypes.string,
  jumpTo: PropTypes.func
}

function select(store) {
  return {
    userData: store.login.userData,
    parameter: store.distribution.parameter
  }
}

const styles = color =>
  StyleSheet.create({
    tabbar: {
      height: Device.isIphoneX ? 70 : 55,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: Color.blackDivide,
      backgroundColor: color,
      ...Styles.elevation
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      ...Platform.select({
        ios: {
          justifyContent: Device.isIphoneX ? 'flex-start' : 'center',
          paddingTop: Device.isIphoneX ? 12 : 0
        },
        android: {
          justifyContent: 'center'
        }
      })
    }
  })
export default connect(select)(TabBar)
