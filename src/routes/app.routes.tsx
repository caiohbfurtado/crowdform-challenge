import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { useTheme } from 'native-base'
import { Fragment } from 'react'
import { Platform, TouchableOpacity } from 'react-native'
import { Feather, Octicons } from '@expo/vector-icons'

import { Home } from '../screens/Home'
import { Trade } from '../screens/Trade'
import { useAuth } from '../hooks/useAuth'

const { Navigator, Screen } = createBottomTabNavigator()

type AppRoutesProps = {
  Home: undefined
  Trade: {
    type: 'wind' | 'solar' | 'nature'
  }
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutesProps>

export function AppRoutes() {
  const { colors, sizes, space } = useTheme()
  const { signOut } = useAuth()
  const iconSize = sizes[6]

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.purple[500],
        tabBarInactiveTintColor: colors.black,
        tabBarStyle: {
          backgroundColor: colors.gray[200],
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 106 : 86,
          paddingBottom: Platform.OS === 'ios' ? space[10] : space[6],
          paddingTop: space[6],
        },
      }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="home" color={color} size={iconSize} />
          ),
        }}
      />
      <Screen
        name="Trade"
        component={Trade}
        options={{
          tabBarIcon: ({ color }) => (
            <Octicons name="arrow-switch" color={color} size={iconSize} />
          ),
        }}
      />
      <Screen
        name="SignOut"
        component={Fragment}
        options={{
          tabBarIcon: () => {
            return (
              <Feather name="log-out" color={colors.red[300]} size={iconSize} />
            )
          },
          tabBarButton: (props) => (
            <TouchableOpacity {...props} onPress={signOut} />
          ),
        }}
      />
    </Navigator>
  )
}
