import { StyleSheet, Text, View } from 'react-native'
import { NativeBaseProvider } from 'native-base'
import { StatusBar } from 'expo-status-bar'

export default function App() {
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
