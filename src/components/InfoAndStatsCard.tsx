import { Box, Center, Heading, Link, Text, VStack } from 'native-base'

export function InfoAndStatsCard() {
  return (
    <Box
      w={56}
      h={72}
      borderColor="gray.300"
      borderWidth={1}
      borderRadius="md"
      mr={4}
    >
      <Center w="full" h={24} backgroundColor="gray.200">
        <Text>Image</Text>
      </Center>

      <VStack p={4}>
        <Heading color="black" size="md" fontFamily="heading">
          Title
        </Heading>

        <Text numberOfLines={4} mt={3}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum harum
          magni animi, minima rerum error illo doloribus quidem, quibusdam,
          fugiat quas. Soluta praesentium natus possimus labore earum! Cumque,
          ducimus porro?
        </Text>

        <Link mt={3}>Read more</Link>
      </VStack>
    </Box>
  )
}
