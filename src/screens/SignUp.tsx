/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  Center,
  Checkbox,
  HStack,
  Heading,
  Link,
  ScrollView,
  Text,
} from 'native-base'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from '../components/Input'
import { Button } from '../components/Button'

import { AuthNavigatorRoutesProps } from '../routes/auth.routes'
import { Controller, useForm } from 'react-hook-form'

const signUpSchema = yup.object({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup
    .string()
    .required('E-mail is required')
    .email('Provide a valid e-mail'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
  confirm_password: yup
    .string()
    .required('Confirmação de senha obrigatória')
    .oneOf([yup.ref('password')], 'A confirmação da senha não confere'),
})

type SignUpForm = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirm_password: string
}

export function SignUp() {
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>()
  const [userAgree, setUserAgree] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: yupResolver(signUpSchema),
  })

  function handleGoToSignUp() {
    navigate('SignIn')
  }

  function handleSignUp(data: SignUpForm) {
    console.log(data)
  }

  return (
    <ScrollView
      flex={1}
      p={5}
      backgroundColor="white"
      _contentContainerStyle={{
        pb: 12,
        alignItems: 'center',
      }}
    >
      <Heading color="black" fontSize="lg" fontFamily="heading" mb={9}>
        Create your account
      </Heading>

      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            label="First Name"
            placeholder="First Name"
            value={value}
            onChangeText={onChange}
            errorMessage={errors.firstName?.message}
          />
        )}
      />
      <Controller
        name="lastName"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            label="Last Name"
            placeholder="Last Name"
            value={value}
            onChangeText={onChange}
            errorMessage={errors.lastName?.message}
          />
        )}
      />
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
      <Controller
        name="confirm_password"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            label="Confirm Password"
            placeholder="Confirm Password"
            secureTextEntry
            value={value}
            onChangeText={onChange}
            errorMessage={errors.confirm_password?.message}
          />
        )}
      />

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

      <Button
        title="Create account"
        mt={5}
        isDisabled={!userAgree}
        onPress={handleSubmit(handleSignUp)}
      />

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
    </ScrollView>
  )
}
