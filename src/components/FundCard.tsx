import { Box, HStack, Icon, Text, VStack, useTheme } from 'native-base'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Feather, FontAwesome } from '@expo/vector-icons'

type DataMonth = {
  month:
    | 'january'
    | 'february'
    | 'march'
    | 'april'
    | 'may'
    | 'june'
    | 'july'
    | 'august'
    | 'september'
    | 'october'
    | 'november'
    | 'december'
  result: number
}

type Props = TouchableOpacityProps & {
  type: 'wind' | 'solar' | 'nature'
  yearData: DataMonth[]
  balance: number
  variation: number
  status: 'crescent' | 'decrescent'
}

const iconAndColor = {
  wind: {
    icon: 'wind',
    color: 'blue.500',
  },
  solar: {
    icon: 'sun',
    color: 'yellow.500',
  },
  nature: {
    icon: 'leaf',
    color: 'green.500',
  },
  crescent: {
    icon: 'arrow-up-right',
    color: 'green.500',
  },
  decrescent: {
    icon: 'arrow-down-right',
    color: 'red.500',
  },
}

export function FundCard({
  balance,
  type,
  variation,
  status,
  yearData,
}: Props) {
  const { space } = useTheme()

  function RenderIcon() {
    if (type === 'nature') {
      return <Icon as={FontAwesome} name="leaf" color="green.500" size={4} />
    }

    return (
      <Icon
        as={Feather}
        name={iconAndColor[type].icon}
        color={iconAndColor[type].color}
        size={4}
      />
    )
  }

  return (
    <TouchableOpacity style={{ marginRight: space[3] }}>
      <Box borderWidth={1} borderColor="gray.300" borderRadius="md" p={3}>
        <VStack>
          {RenderIcon()}

          <Text
            color="black"
            fontSize="xs"
            fontFamily="heading"
            mt={1}
            textTransform="capitalize"
          >
            {type} Fund
          </Text>
        </VStack>

        <Box width="full" h={10} backgroundColor="error.500" />

        <HStack alignItems="flex-end">
          <Text color="black" fontSize="md">
            ${balance}
          </Text>

          <HStack ml={2} alignItems="center">
            <Icon
              as={Feather}
              name={iconAndColor[status].icon}
              size={3}
              color={iconAndColor[status].color}
            />
            <Text fontSize="md" color="green.500">
              {variation}%
            </Text>
          </HStack>
        </HStack>
      </Box>
    </TouchableOpacity>
  )
}
