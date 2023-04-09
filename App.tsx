/* eslint-disable camelcase */
import { NativeBaseProvider, Stack } from 'native-base'
import {
  useFonts,
  Sora_400Regular,
  Sora_600SemiBold,
} from '@expo-google-fonts/sora'

import { THEME } from './src/theme'
import { Routes } from './src/routes'
import { AuthContextProvider } from './src/contexts/AuthContext'

export default function App() {
  const [fontsLoaded] = useFonts({
    Sora_400Regular,
    Sora_600SemiBold,
  })

  if (!fontsLoaded) {
    return false
  }

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <Stack flex={1} backgroundColor="white">
          <Routes />
        </Stack>
      </AuthContextProvider>
    </NativeBaseProvider>
  )
}
