import {
  Center,
  FormControl,
  IInputProps,
  Icon,
  Input as NativeBaseInput,
  Text,
  useTheme,
} from 'native-base'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

type Props = IInputProps & {
  errorMessage?: string | null
  label?: string
}

export function Input({
  errorMessage = null,
  label,
  isInvalid,
  secureTextEntry,
  ...rest
}: Props) {
  const invalid = !!errorMessage || isInvalid
  const { space } = useTheme()
  const [visiblePassword, setVisiblePassword] = useState(false)

  function handleSetVisiblePassword() {
    setVisiblePassword((prevState) => !prevState)
  }

  function RenderIcon() {
    return !visiblePassword ? (
      <TouchableOpacity
        style={{ position: 'absolute', right: space[3] }}
        onPress={handleSetVisiblePassword}
      >
        <Icon as={Feather} name="eye" size={18} color="gray.300" />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={{ position: 'absolute', right: space[3] }}
        onPress={handleSetVisiblePassword}
      >
        <Icon as={Feather} name="eye-off" size={18} color="gray.300" />
      </TouchableOpacity>
    )
  }

  return (
    <FormControl isInvalid={invalid} marginBottom={4}>
      {label && (
        <Text color="gray.300" fontFamily="body" mb={1}>
          {label}
        </Text>
      )}
      <Center>
        <NativeBaseInput
          bg="gray.200"
          h={14}
          px={4}
          borderWidth={0}
          fontSize="md"
          color="black"
          fontFamily="body"
          placeholderTextColor="gray.400"
          secureTextEntry={secureTextEntry && !visiblePassword}
          isInvalid={invalid}
          _invalid={{
            borderWidth: 1,
            borderColor: 'red.500',
          }}
          _focus={{
            bg: 'gray.200',
            borderWidth: 1,
            borderColor: 'purple.500',
          }}
          {...rest}
        />
        {secureTextEntry && RenderIcon()}
      </Center>
    </FormControl>
  )
}
