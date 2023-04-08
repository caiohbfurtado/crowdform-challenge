import {
  Box,
  Center,
  Divider,
  FlatList,
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
import { FundCard } from '../components/FundCard'

import businessStatistcsImage from '../assets/business-statistcs.png'
import { MainCard } from '../components/MainCard'

export function Home() {
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
              $1,245.23
            </Text>

            <HStack ml={1} alignItems="center" mb={1}>
              <Icon
                as={Feather}
                name="arrow-up-right"
                size={3}
                color="green.500"
                mr={0.5}
              />
              <Text fontSize="md" color="green.500">
                31.82%
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
          <FundCard
            balance={1032.23}
            type="wind"
            variation={3.51}
            yearData={[]}
            status="crescent"
          />
          <FundCard
            balance={1032.23}
            type="solar"
            variation={3.51}
            yearData={[]}
            status="crescent"
          />
          <FundCard
            balance={1032.23}
            type="nature"
            variation={3.51}
            yearData={[]}
            status="crescent"
          />
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
