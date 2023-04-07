/* eslint-disable camelcase */
import { NativeBaseProvider } from 'native-base'
import {
  useFonts,
  Sora_400Regular,
  Sora_600SemiBold,
} from '@expo-google-fonts/sora'

import { THEME } from './src/theme'
import { SignIn } from './src/screens/SignIn'

export default function App() {
  const [fontsLoaded] = useFonts({
    Sora_400Regular,
    Sora_600SemiBold,
  })

  return (
    <NativeBaseProvider theme={THEME}>
      {fontsLoaded ? <SignIn /> : null}
    </NativeBaseProvider>
  )
}
