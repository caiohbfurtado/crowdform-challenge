import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import { SignIn } from '../screens/SignIn'
import { SignUp } from '../screens/SignUp'
import { Icon } from 'native-base'
import { HeaderSignUp } from '../components/HeaderSignUp'
import { Platform, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

type AuthRoutesProps = {
  SignIn: undefined
  SignUp: undefined
}

export type AuthNavigatorRoutesProps =
  NativeStackNavigationProp<AuthRoutesProps>

const { Navigator, Screen } = createNativeStackNavigator()

export function AuthRoutes() {
  const { goBack } = useNavigation()

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="SignIn" component={SignIn} />
      <Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: true,
          headerTitle: () => <HeaderSignUp />,
          headerTitleAlign: 'center',
          headerLeft: () =>
            Platform.OS === 'ios' && (
              <TouchableOpacity onPress={goBack}>
                <Icon as={Feather} name="arrow-left" color="black" size={6} />
              </TouchableOpacity>
            ),
        }}
      />
    </Navigator>
  )
}
