/* eslint-disable react/no-unescaped-entities */
import {
  Center,
  Heading,
  KeyboardAvoidingView,
  Link,
  Text,
  useToast,
} from 'native-base'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '../routes/auth.routes'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native'

const signInSchema = yup.object({
  email: yup
    .string()
    .required('E-mail is required')
    .email('Provide a valid e-mail'),
  password: yup.string().required('Password is required'),
})

type SignInForm = {
  email: string
  password: string
}

export function SignIn() {
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>()
  const { signIn } = useAuth()
  const toast = useToast()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: yupResolver(signInSchema),
  })
  const [isLoading, setIsLoading] = useState(false)

  function handleGoToSignUp() {
    navigate('SignUp')
  }

  async function handleSignIn(data: SignInForm) {
    try {
      setIsLoading(true)
      await signIn(data)
    } catch (error) {
      toast.show({
        title: 'Não foi possível fazer o login. Tente novamente mais tarde.',
        placement: 'top',
        bgColor: 'red.500',
        _title: {
          textAlign: 'center',
        },
        mx: 2,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Center backgroundColor="white" flex={1} p={5}>
          <Heading color="black" fontSize="lg" fontFamily="heading" mb={9}>
            Login
          </Heading>

          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                label="E-mail"
                placeholder="E-mail"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.email?.message}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Password"
                placeholder="Password"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button
            title="Login"
            mt={5}
            onPress={handleSubmit(handleSignIn)}
            isLoading={isLoading}
          />

          <Center flexDirection="row" mt={3}>
            <Text color="gray.500" fontFamily="body" fontSize="xs">
              Don't have an account?{' '}
            </Text>
            <Link
              _text={{
                color: 'black',
                fontSize: 'xs',
              }}
              onPress={handleGoToSignUp}
            >
              Sign up Here
            </Link>
          </Center>
        </Center>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
