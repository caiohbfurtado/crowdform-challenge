import {
  Box,
  Center,
  Divider,
  HStack,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
} from 'native-base'
import { HeaderHome } from '../components/HeaderHome'
import { Feather, FontAwesome5 } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { DataMonth, FundCard } from '../components/FundCard'

import businessStatistcsImage from '../assets/business-statistcs.png'
import { MainCard } from '../components/MainCard'
import { useEffect, useMemo, useState } from 'react'
import { getPercentVariation } from '../utils/getPercentVariation'
import { api } from '../services/api'

export type Portfolio = {
  wind: DataMonth[]
  solar: DataMonth[]
  nature: DataMonth[]
}

export function Home() {
  const [portfolio, setPortfolio] = useState<Portfolio>({} as Portfolio)
  const [firstPortfolioSumValue, setFirstPortfolioSumValue] = useState(0)
  const [lastPortfolioSumValue, setLastPortfolioSumValue] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  async function getPortfolioData() {
    try {
      setIsLoading(true)

      const { data } = await api.get<Portfolio>('/portfolio')
      setPortfolio(data)

      const windFirstValue = data.wind?.[0].result ?? 0
      const solarFirstValue = data.solar?.[0].result ?? 0
      const natureFirstValue = data.nature?.[0].result ?? 0
      setFirstPortfolioSumValue(
        windFirstValue + solarFirstValue + natureFirstValue,
      )

      const windLastValue = data.wind?.[data.wind?.length - 1].result ?? 0
      const solarLastValue = data.solar?.[data.solar?.length - 1].result ?? 0
      const natureLastValue = data.nature?.[data.nature?.length - 1].result ?? 0
      setLastPortfolioSumValue(windLastValue + solarLastValue + natureLastValue)
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getPortfolioData()
  }, [])

  const percent = useMemo(
    () => getPercentVariation(firstPortfolioSumValue, lastPortfolioSumValue),
    [lastPortfolioSumValue, firstPortfolioSumValue],
  )
  const isCrescent = lastPortfolioSumValue > firstPortfolioSumValue

  if (isLoading) {
    return null
  }

  return (
    <ScrollView
      flex={1}
      backgroundColor="white"
      pt={12}
      scrollEnabled
      showsVerticalScrollIndicator={false}
    >
      <HeaderHome />

      <HStack
        mt={4}
        alignItems="flex-end"
        justifyContent="space-between"
        px={5}
      >
        <VStack>
          <Text color="black" fontSize="xs">
            Portfolio
          </Text>
          <HStack alignItems="flex-end">
            <Text fontFamily="heading" fontSize="2xl">
              ${lastPortfolioSumValue}
            </Text>

            <HStack ml={1} alignItems="center" mb={1}>
              <Icon
                as={Feather}
                name={isCrescent ? 'arrow-up-right' : 'arrow-down-right'}
                size={3}
                color={isCrescent ? 'green.500' : 'red.500'}
                mr={0.5}
              />
              <Text fontSize="md" color={isCrescent ? 'green.500' : 'red.500'}>
                {percent}%
              </Text>
            </HStack>
          </HStack>
        </VStack>

        <TouchableOpacity>
          <Center
            backgroundColor="purple.300"
            h={8}
            px={3}
            borderRadius="md"
            flexDirection="row"
          >
            <Icon
              as={FontAwesome5}
              name="coins"
              size={4}
              color="purple.500"
              mr={1}
            />
            <Text color="purple.500">Earn Rewards</Text>
          </Center>
        </TouchableOpacity>
      </HStack>

      <Divider my={5} />

      <VStack>
        <Text color="black" fontFamily="heading" fontSize="lg" px={5}>
          Funds
        </Text>

        <ScrollView
          nestedScrollEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          my={5}
          ml={5}
        >
          <FundCard type="wind" yearData={portfolio?.wind} />
          <FundCard type="solar" yearData={portfolio?.solar} />
          <FundCard type="nature" yearData={portfolio?.nature} />
        </ScrollView>

        <TouchableOpacity>
          <Box
            backgroundColor="purple.500"
            borderRadius="lg"
            px={5}
            py={2}
            mx={5}
          >
            <HStack alignItems="center" justifyContent="space-between">
              <VStack>
                <Text fontFamily="heading" color="white" fontSize="lg">
                  Learn more about{'\n'}carbon credits
                </Text>
                <Text color="white" fontSize="sm" mt={2}>
                  Check out our top tips!
                </Text>
              </VStack>

              <Image
                source={businessStatistcsImage}
                w={105}
                h={98}
                alt="Image of coins"
              />
            </HStack>
          </Box>
        </TouchableOpacity>

        <HStack
          flexWrap="wrap"
          mt={10}
          justifyContent="space-between"
          mb={20}
          px={5}
        >
          <MainCard />
          <MainCard />
        </HStack>
      </VStack>
    </ScrollView>
  )
}
