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
import { useMemo } from 'react'
import { getPercentVariation } from '../utils/getPercentVariation'

type Portfolio = {
  wind: DataMonth[]
  solar: DataMonth[]
  nature: DataMonth[]
}

const portfolio: Portfolio = {
  wind: [
    { month: 'january', result: 950.42 },
    { month: 'february', result: 980.17 },
    { month: 'march', result: 844.62 },
    { month: 'may', result: 744.62 },
    { month: 'august', result: 749.62 },
    { month: 'september', result: 790.62 },
    { month: 'october', result: 820.62 },
    { month: 'november', result: 891.41 },
    { month: 'december', result: 1985.47 },
  ],
  solar: [
    { month: 'january', result: 950.42 },
    { month: 'february', result: 980.17 },
    { month: 'march', result: 844.62 },
    { month: 'may', result: 744.62 },
    { month: 'august', result: 749.62 },
    { month: 'september', result: 520.62 },
    { month: 'october', result: 980.62 },
    { month: 'november', result: 752.41 },
    { month: 'december', result: 1230.47 },
  ],
  nature: [
    { month: 'january', result: 950.42 },
    { month: 'february', result: 980.17 },
    { month: 'march', result: 120.62 },
    { month: 'may', result: 178.62 },
    { month: 'august', result: 362.62 },
    { month: 'september', result: 145.62 },
    { month: 'october', result: 852.62 },
    { month: 'november', result: 1980.41 },
    { month: 'december', result: 720.47 },
  ],
}

export function Home() {
  const firstPortfolioValue = useMemo(() => {
    const wind = portfolio.wind[0].result
    const solar = portfolio.solar[0].result
    const nature = portfolio.nature[0].result

    return wind + solar + nature
  }, [])

  const currentPortfolioValue = useMemo(() => {
    const wind = portfolio.wind[portfolio.wind.length - 1].result
    const solar = portfolio.solar[portfolio.solar.length - 1].result
    const nature = portfolio.nature[portfolio.nature.length - 1].result

    return wind + solar + nature
  }, [])

  const percent = useMemo(
    () => getPercentVariation(firstPortfolioValue, currentPortfolioValue),
    [currentPortfolioValue, firstPortfolioValue],
  )
  const isCrescent = currentPortfolioValue > firstPortfolioValue

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
              ${currentPortfolioValue}
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

      <VStack px={5}>
        <Text color="black" fontFamily="heading" fontSize="lg">
          Funds
        </Text>

        <ScrollView
          nestedScrollEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          my={5}
        >
          <FundCard type="wind" yearData={portfolio.wind} />
          <FundCard type="solar" yearData={portfolio.solar} />
          <FundCard type="nature" yearData={portfolio.nature} />
        </ScrollView>

        <TouchableOpacity>
          <Box backgroundColor="purple.500" borderRadius="lg" px={5} py={2}>
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

        <HStack flexWrap="wrap" mt={10} justifyContent="space-between" mb={20}>
          <MainCard />
          <MainCard />
        </HStack>
      </VStack>
    </ScrollView>
  )
}
