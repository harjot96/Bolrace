import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSelector } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StatusBar } from 'react-native'
import Color from '../common/Color'
import HomeScreen from '../modules/home/container'
import LoginScreen from '../modules/login/container'
import OtpScreen from '../modules/login/component/OTP'
import ForgotScreen from '../modules/login/component/Forgot'

import MainScreen from '../modules/main/container'
import ViewSlot from '../modules/home/component/ViewSlot'
import TabView from '../modules/main/component/TabView'
import WebUrl from '../modules/menu/component/WebUrl'

import WebPage from '../modules/main/component/WebPage'
import News from '../modules/menu/component/News'
import Website from '../modules/menu/component/Website'
import Calander from '../modules/menu/component/Calander'
import EditProfile from '../modules/menu/component/EditProfile'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Constants } from '../common'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const LoginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Color.StatusBar },
        headerTintColor: Color.Background,
        headerTitleStyle: { fontWeight: 'bold' }
      }}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OTP"
        component={OtpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Forgot Password"
        component={ForgotScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Color.StatusBar },
        headerTintColor: Color.Background,
        headerTitleStyle: { fontWeight: 'bold' }
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ViewSlot"
        component={ViewSlot}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="web"
        component={WebPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="News"
        component={News}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="Website"
        component={Website}
        options={{ headerShown: true, title: 'Website' }}
      /> */}
      <Stack.Screen
        name="UIstyle"
        component={Calander}
        options={{ headerShown: true, title: 'UI StyleGuide' }}
      />
      <Stack.Screen
        name="Edit Profile"
        component={EditProfile}
        options={{ headerShown: true, title: 'Edit Profile' }}
      />
      <Stack.Screen
        name="TabView"
        component={TabView}
        options={{ headerShown: false, title: 'TabView' }}
      />
    </Stack.Navigator>
  )
}

// const WebStack = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerStyle: { backgroundColor: Color.StatusBar },
//         headerTintColor: Color.Background,
//         headerTitleStyle: { fontWeight: 'bold' }
//       }}>
//       <Stack.Screen
//         name="Website"
//         component={Website}
//         options={{ headerShown: false, title: 'Website' }}
//       />
//     </Stack.Navigator>
//   )
// }

const CalenderStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Color.StatusBar },
        headerTintColor: Color.Background,
        headerTitleStyle: { fontWeight: 'bold' }
      }}>
      <Stack.Screen
        name="Calander"
        component={Calander}
        options={{ headerShown: false, title: 'Race Calander' }}
      />
    </Stack.Navigator>
  )
}

const AccountStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Color.StatusBar },
        headerTintColor: Color.Background,
        headerTitleStyle: { fontWeight: 'bold' }
      }}>
      <Stack.Screen
        name="Edit Profile"
        component={EditProfile}
        options={{ headerShown: false, title: 'Edit Profile' }}
      />
      <Stack.Screen
        name="WebUrl"
        component={WebUrl}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

const NewsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Color.StatusBar },
        headerTintColor: Color.Background,
        headerTitleStyle: { fontWeight: 'bold' }
      }}>
      <Stack.Screen
        name="News"
        component={News}
        options={{ headerShown: false, title: 'News' }}
      />
    </Stack.Navigator>
  )
}

const App = () => {
  return (
    <>
      <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={{
          activeTintColor: '#42f44b'
        }}>
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            headerShown: false,
            tabBarLabel: 'Home',
            tabBarLabelStyle: {
              fontSize: Constants.fontMD,
              marginBottom: 5,
              justifyContent: 'space-around',
              fontFamily: Constants.fontFamilyMedium
            },
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="home"
                color={Color.TextTertiary}
                size={20}
              />
            )
          }}
        />
        {/* <Tab.Screen
          name="WebStack"
          component={WebStack}
          options={{
            headerShown: false,
            tabBarLabel: 'Website',
            tabBarLabelStyle: {
              fontSize: Constants.fontMD,
              marginBottom: 5,
              justifyContent: 'space-around',
              fontFamily: Constants.fontFamilyMedium
            },
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="web"
                color={Color.TextTertiary}
                size={20}
              />
            )
          }}
        /> */}
        <Tab.Screen
          name="CalenderStack"
          component={CalenderStack}
          options={{
            headerShown: false,
            tabBarLabel: 'Calender',
            tabBarLabelStyle: {
              fontSize: Constants.fontMD,
              marginBottom: 5,
              justifyContent: 'space-around',
              fontFamily: Constants.fontFamilyMedium
            },
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="calendar-month-outline"
                color={Color.TextTertiary}
                size={20}
              />
            )
          }}
        />
        <Tab.Screen
          name="AccountStack"
          component={AccountStack}
          options={{
            headerShown: false,
            tabBarLabel: 'Account',
            tabBarLabelStyle: {
              fontSize: Constants.fontMD,
              marginBottom: 5,
              justifyContent: 'space-around',
              fontFamily: Constants.fontFamilyMedium
            },
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account-outline"
                color={Color.TextTertiary}
                size={20}
              />
            )
          }}
        />
        <Tab.Screen
          name="NewsStack"
          component={NewsStack}
          options={{
            headerShown: false,
            tabBarLabel: 'News',
            tabBarLabelStyle: {
              fontSize: Constants.fontMD,
              marginBottom: 5,
              justifyContent: 'space-around',
              fontFamily: Constants.fontFamilyMedium
            },
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="newspaper-variant-multiple"
                color={Color.TextTertiary}
                size={20}
              />
            )
          }}
        />
      </Tab.Navigator>
    </>
  )
}
const Navigation = () => {
  const { userData, isLoggedIn } = useSelector(state => state.login)
  return (
    <NavigationContainer>
      {userData?.token === undefined && !isLoggedIn ? LoginStack() : App()}
    </NavigationContainer>
  )
}

export default Navigation
