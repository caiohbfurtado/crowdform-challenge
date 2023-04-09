import { extendTheme } from 'native-base'

export const THEME = extendTheme({
  colors: {
    purple: {
      300: '#F7EFFF',
      500: '#770FDF',
    },
    gray: {
      100: '#f5f5f5',
      200: '#f4f4f4',
      300: '#e6e6e6',
      400: '#cfcfcf',
      500: '#A0A0A0',
      600: '#808080',
    },
    green: {
      500: '#0FDF8F',
    },
    blue: {
      500: '#4A88D0',
    },
    yellow: {
      500: '#F0A719',
    },
    red: {
      300: '#EE8688',
    },
    white: '#FFFFFF',
    black: '#000000',
  },
  fonts: {
    body: 'Sora_400Regular',
    heading: 'Sora_600SemiBold',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
  },
  sizes: {
    11: 42,
    14: 56,
    33: 148,
  },
})
