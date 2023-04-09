/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-catch */
import { createContext, ReactNode, useEffect, useState } from 'react'
import { UserDTO } from '../dtos/UserDTO'
import { api } from '../services/api'
import {
  storageUserDelete,
  storageUserGet,
  storageUserSave,
} from '../storage/storageUser'

type SignInProps = {
  email: string
  password: string
}

type SignUpProps = {
  firstName: string
  lastName: string
  email: string
}

export type AuthContextDataProps = {
  user: UserDTO
  signIn: (data: SignInProps) => Promise<void>
  signUp: (data: SignUpProps) => Promise<void>
  signOut: () => void
  isLoadingStoragedUserData: boolean
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingStoragedUserData, setIsLoadingStoragedUserData] =
    useState(true)

  async function getUser() {
    try {
      setIsLoadingStoragedUserData(true)
      const storagedUser = await storageUserGet()

      setUser(storagedUser)
    } catch (error) {
      throw error
    } finally {
      setIsLoadingStoragedUserData(false)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  async function signIn({ email }: SignInProps) {
    try {
      const { data } = await api.get<UserDTO[]>('/users')
      const findByIndex = data.findIndex(
        (userCurrent) => userCurrent.email === email,
      )

      if (findByIndex === -1) {
        throw new Error()
      }

      setIsLoadingStoragedUserData(true)
      await storageUserSave(data[findByIndex])
      setUser(data[findByIndex])
    } catch (error) {
      throw error
    } finally {
      setIsLoadingStoragedUserData(false)
    }
  }

  async function signUp({ email, firstName, lastName }: SignUpProps) {
    try {
      const { data } = await api.get<UserDTO[]>('/users')
      const findByIndex = data.findIndex(
        (userCurrent) => userCurrent.email === email,
      )

      if (findByIndex !== -1) {
        throw new Error()
      }

      await api.post('/users', {
        firstName,
        lastName,
        email,
      })
    } catch (error) {
      throw error
    }
  }

  async function signOut() {
    try {
      setIsLoadingStoragedUserData(true)
      await storageUserDelete()

      setUser({} as UserDTO)
    } catch (error) {
      throw error
    } finally {
      setIsLoadingStoragedUserData(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        isLoadingStoragedUserData,
        signOut,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
