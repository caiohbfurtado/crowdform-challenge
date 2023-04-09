import { Button as NativeBaseButton, IButtonProps, Text } from 'native-base'
import { ColorType } from 'native-base/lib/typescript/components/types'
import { useMemo } from 'react'

type Props = IButtonProps & {
  title: string
  variant?: 'primary' | 'outlined' | 'success'
  full?: boolean
}

export function Button({
  title,
  full = true,
  variant = 'primary',
  ...rest
}: Props) {
  const bgColor: ColorType = useMemo(() => {
    switch (variant) {
      case 'primary':
        return 'purple.500'
      case 'success':
        return 'green.500'
      default:
        return 'transparent'
    }
  }, [variant])

  const textColor: ColorType = useMemo(() => {
    switch (variant) {
      case 'primary':
      case 'success':
        return 'white'
      default:
        return 'purple.500'
    }
  }, [variant])

  return (
    <NativeBaseButton
      {...(full && { w: 'full' })}
      h={14}
      rounded="sm"
      backgroundColor={bgColor}
      {...(variant === 'outlined' && {
        borderWidth: 1,
        borderColor: 'purple.500',
      })}
      {...rest}
    >
      <Text color={textColor} fontFamily="heading" fontSize={'sm'}>
        {title}
      </Text>
    </NativeBaseButton>
  )
}
