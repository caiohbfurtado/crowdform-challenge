/* eslint-disable react/no-unescaped-entities */
import { Center, Heading, Link, Text } from 'native-base'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '../routes/auth.routes'

export function SignIn() {
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>()

  function handleGoToSignUp() {
    navigate('SignUp')
    console.log('go to signup!')
  }

  return (
    <Center backgroundColor="white" flex={1} p={5}>
      <Heading color="black" fontSize="lg" fontFamily="heading" mb={9}>
        Login
      </Heading>
      <Input label="E-mail" placeholder="E-mail" />
      <Input label="Password" placeholder="Password" secureTextEntry />

      <Button title="Login" mt={5} />

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
