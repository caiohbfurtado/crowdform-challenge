import { Text, VStack } from 'native-base'

type Props = {
  title: string
  value: string
}

export function InfoAndStatus({ title, value }: Props) {
  function renderInfoTitle(title: string) {
    return (
      <Text fontSize="sm" color="gray.500">
        {title}
      </Text>
    )
  }

  function renderInfoValue(value: string) {
    return (
      <Text fontSize="sm" color="black">
        {value}
      </Text>
    )
  }

  return (
    <VStack mb={4}>
      {renderInfoTitle(title)}
      {renderInfoValue(value)}
    </VStack>
  )
}
