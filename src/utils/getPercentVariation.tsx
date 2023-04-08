export function getPercentVariation(firstlValue: number, lastValue: number) {
  return Math.abs((lastValue * 100) / firstlValue - 100).toFixed(2)
}
