import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Center, HStack, Icon, Text } from 'native-base'

export function HeaderHome() {
  return (
    <HStack alignItems="center" justifyContent="space-between" px={5}>
      <TouchableOpacity>
        <Center w={8} h={8} borderRadius="full" backgroundColor="gray.200">
          <Icon as={Feather} name="user" color="black" size={5} />
        </Center>
      </TouchableOpacity>

      <TouchableOpacity>
        <Center flexDirection="row">
          <Text color="black" fontFamily="heading" fontSize="sm">
            Account: $1,457.23
          </Text>
          <Icon as={Feather} name="chevron-down" color="black" size={5} />
        </Center>
      </TouchableOpacity>

      <TouchableOpacity>
        <Icon as={Feather} name="bell" color="black" size={5} />
      </TouchableOpacity>
    </HStack>
  )
}
