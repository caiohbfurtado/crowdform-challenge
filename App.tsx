/* eslint-disable camelcase */
import { NativeBaseProvider, Stack } from 'native-base'
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

  console.log(fontsLoaded)

  if (!fontsLoaded) {
    return false
  }

  return (
    <NativeBaseProvider theme={THEME}>
      <Stack flex={1} backgroundColor="white">
        <SignIn />
      </Stack>
    </NativeBaseProvider>
  )
}
