import { Box, HStack, Icon, Text, VStack, useTheme } from 'native-base'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Feather, FontAwesome } from '@expo/vector-icons'
import { useMemo } from 'react'
import { getPercentVariation } from '../utils/getPercentVariation'
import { Chart } from './Chart'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '../routes/app.routes'

export type DataMonth = {
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
}

export function FundCard({ type, yearData }: Props) {
  const { space } = useTheme()
  const { navigate } = useNavigation<AppNavigatorRoutesProps>()
  const yearDataIsEmptyOrOneMonth = yearData?.length <= 1

  const lastResult = yearData?.[yearData?.length - 1].result
  const firstResult = yearData?.[0].result

  const resultOfMonths = useMemo(
    () => yearData?.map((item) => item.result),
    [yearData],
  )

  const percent = useMemo(
    () => getPercentVariation(firstResult, lastResult),
    [firstResult, lastResult],
  )

  const isCrescent = lastResult > firstResult

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

  function handleGoToFund() {
    navigate('Trade', { type })
  }

  if (yearDataIsEmptyOrOneMonth) {
    return null
  }

  return (
    <TouchableOpacity
      style={{ marginRight: space[3] }}
      onPress={handleGoToFund}
    >
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

        <Chart data={resultOfMonths} />

        <HStack alignItems="flex-end">
          <Text color="black" fontSize="md">
            ${lastResult}
          </Text>

          <HStack ml={2} alignItems="center">
            <Icon
              as={Feather}
              name={iconAndColor[isCrescent ? 'crescent' : 'decrescent'].icon}
              size={3}
              color={iconAndColor[isCrescent ? 'crescent' : 'decrescent'].color}
            />
            <Text fontSize="md" color={isCrescent ? 'green.500' : 'red.500'}>
              {percent}%
            </Text>
          </HStack>
        </HStack>
      </Box>
    </TouchableOpacity>
  )
}
