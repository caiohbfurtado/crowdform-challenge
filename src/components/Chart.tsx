import { Box, useTheme } from 'native-base'
import { Defs, LinearGradient, Stop } from 'react-native-svg'
import { LineChart } from 'react-native-svg-charts'

type Props = {
  data: number[]
  height?: number
}

export function Chart({ height = 20, data }: Props) {
  const { colors, space } = useTheme()

  const lastResult = data?.[data?.length - 1]
  const firstResult = data?.[0]

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

  if (!data || data.length === 0) {
    return null
  }

  return (
    <Box width="full" h={height} backgroundColor="white">
      <LineChart
        style={{ height: space[height] }}
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
