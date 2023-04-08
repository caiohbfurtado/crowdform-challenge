/* eslint-disable react/no-unescaped-entities */
import { Center, Heading, Link, Text } from 'native-base'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

function handleGoToSignUp() {
  console.log('go to signup!')
}

export function SignIn() {
  return (
    <Center flex={1} p={5}>
      <Heading color="black" fontSize="lg" fontFamily="heading" mb={9}>
        Login
      </Heading>
      <Input label="E-mail" placeholder="E-mail" />
      <Input label="Password" placeholder="Password" secureTextEntry />

      <Button title="Login" mt={5} />

      <Center flexDirection="row" mt={3}>
        <Text color="gray.300" fontFamily="body" fontSize="xs">
          Don't have an account?{' '}
        </Text>
        <Link
          _text={{
            color: 'gray.300',
            fontSize: 'xs',
          }}
          onPress={handleGoToSignUp}
        >
          Sign up
        </Link>
        <Text color="gray.300" fontFamily="body" fontSize="xs">
          {' '}
          here
        </Text>
      </Center>
    </Center>
  )
}
