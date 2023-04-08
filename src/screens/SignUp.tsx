/* eslint-disable react/no-unescaped-entities */
import { Center, Checkbox, HStack, Heading, Link, Text } from 'native-base'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '../routes/auth.routes'
import { useState } from 'react'

export function SignUp() {
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>()
  const [userAgree, setUserAgree] = useState(false)

  function handleGoToSignUp() {
    navigate('SignIn')
  }

  console.log({ userAgree })

  return (
    <Center flex={1} p={5} backgroundColor="white">
      <Heading color="black" fontSize="lg" fontFamily="heading" mb={9}>
        Create your account
      </Heading>

      <Input label="First Name" placeholder="First Name" />
      <Input label="Last Name" placeholder="Last Name" />
      <Input label="E-mail" placeholder="E-mail" />
      <Input label="Password" placeholder="Password" secureTextEntry />

      <HStack p={4}>
        <Checkbox
          value="test"
          accessibilityLabel="This is a dummy checkbox"
          backgroundColor="white"
          borderColor="gray.300"
          _checked={{
            backgroundColor: 'purple.500',
          }}
          justifyContent="flex-start"
          _stack={{
            alignItems: 'flex-start',
          }}
          onChange={(state) => {
            if (state) {
              setUserAgree(true)
            } else {
              setUserAgree(false)
            }
          }}
        >
          <Text color="gray.500" flexShrink={1} ml={1} fontSize="xs">
            I am over 18 years of age and I have read and agree to the{' '}
            <Text color="black">Terms of Service</Text> and{' '}
            <Text color="black">Privacy policy</Text>.
          </Text>
        </Checkbox>
      </HStack>

      <Button title="Create account" mt={5} isDisabled={!userAgree} />

      <Center flexDirection="row" mt={3}>
        <Text color="gray.500" fontFamily="body" fontSize="xs">
          Already have an account?{' '}
        </Text>
        <Link
          _text={{
            color: 'black',
            fontSize: 'xs',
          }}
          onPress={handleGoToSignUp}
        >
          Log in Here
        </Link>
      </Center>
    </Center>
  )
}
