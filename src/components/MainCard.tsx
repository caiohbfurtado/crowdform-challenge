import { Box, Text } from 'native-base'
import { TouchableOpacity, useWindowDimensions } from 'react-native'

export function MainCard() {
  const { width } = useWindowDimensions()
  return (
    <TouchableOpacity>
      <Box
        h={215}
        w={width / 2 - 32}
        backgroundColor="gray.200"
        borderRadius="md"
        px={3}
        py={5}
      >
        <Text>Why should you invest here?</Text>
      </Box>
    </TouchableOpacity>
  )
}
