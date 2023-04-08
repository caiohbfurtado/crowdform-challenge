import { Box, useTheme } from 'native-base'
import { Defs, LinearGradient, Stop } from 'react-native-svg'
import { LineChart } from 'react-native-svg-charts'

type Props = {
  data: number[]
}

export function Chart({ data }: Props) {
  const { colors } = useTheme()

  const lastResult = data[data.length - 1]
  const firstResult = data[0]

  const isCrescent = lastResult > firstResult

  const Gradient = () => (
    <Defs key={'gradient'}>
      <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
        <Stop
          offset={'0%'}
          stopColor={isCrescent ? colors.green[500] : colors.red[500]}
        />
        <Stop
          offset={'100%'}
          stopColor={isCrescent ? colors.green[500] : colors.red[500]}
        />
      </LinearGradient>
    </Defs>
  )

  return (
    <Box width="full" h={20} backgroundColor="white">
      <LineChart
        style={{ height: 80 }}
        data={data}
        contentInset={{ top: 20, bottom: 20 }}
        svg={{
          strokeWidth: 2,
          stroke: 'url(#gradient)',
        }}
      >
        <Gradient />
      </LineChart>
    </Box>
  )
}
