import { Button as NativeBaseButton, IButtonProps, Text } from 'native-base'

type Props = IButtonProps & {
  title: string
  variant?: 'primary'
  size?: 'full'
}

export function Button({
  title,
  size = 'full',
  variant = 'primary',
  ...rest
}: Props) {
  return (
    <NativeBaseButton
      {...(size === 'full' && { w: 'full' })}
      h={14}
      rounded="sm"
      backgroundColor={variant === 'primary' ? 'purple.500' : 'green.700'}
      {...rest}
    >
      <Text color="white" fontFamily="heading" fontSize={'sm'}>
        {title}
      </Text>
    </NativeBaseButton>
  )
}
