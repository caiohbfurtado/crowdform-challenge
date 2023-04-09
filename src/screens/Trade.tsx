import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import {
  Box,
  Center,
  Divider,
  HStack,
  Heading,
  Icon,
  Link,
  ScrollView,
  Stack,
  Text,
  VStack,
} from 'native-base'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { AppNavigatorRoutesProps } from '../routes/app.routes'
import { api } from '../services/api'
import { useCallback, useState } from 'react'
import { DataMonth } from '../components/FundCard'
import { Portfolio } from './Home'
import { getPercentVariation } from '../utils/getPercentVariation'
import { Chart } from '../components/Chart'
import { InfoAndStatus } from '../components/InfoAndStatus'
import { InfoAndStatsCard } from '../components/InfoAndStatsCard'
import { Button } from '../components/Button'

type Params = {
  type: 'wind' | 'solar' | 'nature'
}

const fundBreakDownTypes = ['highlighted', 'value', 'vintage', 'registry']

export function Trade() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>()
  const route = useRoute()
  const params = route.params as Params
  const [isLoading, setIsLoading] = useState(true)
  const [isCrescent, setIsCrescent] = useState(false)
  const [dataByType, setDataByType] = useState<DataMonth[]>()
  const [balance, setBalance] = useState(0)
  const [difference, setDifference] = useState(0)
  const [percent, setPercent] = useState('0')
  const [fundBreakdownSelected, setFundBreakdownSelected] =
    useState('highlighted')

  const type = params?.type ?? 'wind'

  useFocusEffect(
    useCallback(() => {
      async function getDataByType() {
        try {
          setIsLoading(true)
          const { data } = await api.get<Portfolio>('portfolio')
          setDataByType(data[type])
          const valuesByType = data[type].reduce(
            (prev, curr) => prev + curr.result,
            0,
          )
          setBalance(valuesByType)

          const firstValue = data[type][0].result
          const lastValue = data[type][data[type].length - 1].result
          setIsCrescent(lastValue > firstValue)
          setDifference(firstValue - lastValue)
          setPercent(getPercentVariation(firstValue, lastValue))
        } catch (error) {
        } finally {
          setIsLoading(false)
        }
      }

      getDataByType()
    }, [type]),
  )

  const colorByStatus = isCrescent ? 'green.500' : 'red.500'

  function handleGoHome() {
    navigate('Home')
  }

  function handleChangeFundBreakdownSelected(value: string) {
    setFundBreakdownSelected(value)
  }

  if (isLoading) {
    return null
  }

  return (
    <VStack flex={1} backgroundColor="white" pt={12}>
      <Center flexDirection="row" px={5}>
        <TouchableOpacity onPress={handleGoHome} style={styles.backButton}>
          <Icon as={Feather} name="arrow-left" size={6} color="black" />
        </TouchableOpacity>

        <VStack alignItems="center">
          <Text
            color="black"
            fontFamily="heading"
            fontSize="lg"
            textTransform="capitalize"
          >
            {type} fund
          </Text>
          <Text color="gray.600" fontSize="sm" textTransform="uppercase">
            {type.split('')[0]}FND
          </Text>
        </VStack>
      </Center>

      <Divider mt={3} />

      <ScrollView
        flex={1}
        pt={3}
        _contentContainerStyle={{
          pb: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        <HStack justifyContent="space-between" px={5}>
          <VStack>
            <Text color="black" fontFamily="heading" fontSize="2xl">
              ${balance}
            </Text>
            <HStack alignItems="center">
              <Icon
                as={Feather}
                name={isCrescent ? 'arrow-up-right' : 'arrow-down-right'}
                color={colorByStatus}
              />
              <Text fontSize="sm" color={colorByStatus}>
                {percent}% (${Math.abs(difference).toFixed(2)})
              </Text>
            </HStack>
          </VStack>

          <Text color="black" fontFamily="heading" fontSize="2xl">
            2022
          </Text>
        </HStack>

        <Chart
          data={dataByType?.map((item) => item.result) ?? []}
          height={40}
        />

        <VStack mt={20} mb={6} px={5}>
          <Heading fontFamily="heading" fontSize="lg" color="black">
            Info & Stats
          </Heading>

          <HStack justifyContent="space-between" mt={5}>
            <VStack w="45%">
              <InfoAndStatus title="AUM" value="$430.88m" />
              <InfoAndStatus title="Vintage Range" value="2022-2022" />
              <InfoAndStatus title="Price at close" value="$17.68" />
            </VStack>

            <VStack w="45%">
              <InfoAndStatus title="Issue Date" value="09/04/2023" />
              <InfoAndStatus title="TER" value="0.15%" />
              <InfoAndStatus title="Price at open" value="$17.74" />
            </VStack>
          </HStack>
        </VStack>

        <Heading fontFamily="heading" fontSize="lg" color="black" px={5}>
          Fund Breakdown
        </Heading>

        <HStack mt={3} px={5}>
          {fundBreakDownTypes.map((fund, index) => (
            <Link
              key={String(index)}
              _text={{
                color: fundBreakdownSelected === fund ? 'black' : 'gray.500',
                textTransform: 'capitalize',
              }}
              isUnderlined={false}
              mr={4}
              pb={1}
              {...(fundBreakdownSelected === fund && {
                borderBottomWidth: 2,
                borderBottomColor: 'purple.500',
              })}
              onPress={() => handleChangeFundBreakdownSelected(fund)}
            >
              {fund}
            </Link>
          ))}
        </HStack>

        <ScrollView
          nestedScrollEnabled
          horizontal
          mt={5}
          showsHorizontalScrollIndicator={false}
          ml={5}
        >
          <InfoAndStatsCard />
          <InfoAndStatsCard />
          <InfoAndStatsCard />
        </ScrollView>

        <HStack mt={8} alignItems="center" px={5}>
          <Icon as={Feather} name="pie-chart" color="black" size={6} mr={1} />
          <Heading fontFamily="heading" fontSize="lg" color="black">
            Your Portfolio
          </Heading>
        </HStack>

        <HStack justifyContent="space-between" mt={5} px={5}>
          <VStack>
            <Text color="black" fontSize="2xl" fontFamily="heading">
              18 credits
            </Text>
            <HStack alignItems="center">
              <Icon
                as={Feather}
                name="arrow-up-right"
                color="green.500"
                size={3}
              />
              <Text color="green.500" fontSize="sm">
                8.41%
              </Text>
            </HStack>
          </VStack>

          <VStack alignItems="flex-end">
            <Text color="black" fontSize="2xl" fontFamily="heading">
              $328.14
            </Text>
            <Text color="gray.500" fontSize="sm">
              Last purchased 28d ago
            </Text>
          </VStack>
        </HStack>

        <HStack justifyContent="space-between" mt={5} px={5}>
          <VStack w="48%">
            <Button title="Sell" variant="outlined" />
          </VStack>
          <VStack w="48%">
            <Button title="Retire credits" variant="success" />
          </VStack>
        </HStack>

        <Text mt={4} color="gray.500" fontSize="xs" px={5}>
          You’ve previously retired 28 credits of this asset
        </Text>

        <Box backgroundColor="gray.200" p={3} borderRadius="md" mt={10} mx={5}>
          <Text color="gray.500" fontSize="sm" fontFamily="body">
            Please note that prices are for reference only and may vary at the
            time of excecuting a buy or sell order. The information provided is
            not investment advice, and should not be used as a recommendation to
            buy or sell assets.
          </Text>
        </Box>
      </ScrollView>

      <Stack mx={5} pb={5}>
        <Button title="Buy" />
      </Stack>
    </VStack>
  )
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    left: 16,
  },
})
