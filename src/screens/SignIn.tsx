/* eslint-disable react/no-unescaped-entities */
import { Center, Heading, Link, Text } from 'native-base'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '../routes/auth.routes'
import { Controller, useForm } from 'react-hook-form'

type SignInForm = {
  email: string
  password: string
}

export function SignIn() {
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({})

  function handleGoToSignUp() {
    navigate('SignUp')
  }

  function handleSignIn(data: SignInForm) {
    console.log(data)
  }

  return (
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
            onChange={onChange}
            errorMessage={errors.email?.message}
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
            onChange={onChange}
            errorMessage={errors.password?.message}
          />
        )}
      />

      <Button title="Login" mt={5} onPress={handleSubmit(handleSignIn)} />

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
  )
}
