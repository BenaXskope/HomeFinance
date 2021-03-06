import axiosUtils from 'axios'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { AxiosError, AxiosResponse } from 'axios'
import { left, right } from '@sweet-monads/either'
import type { Either } from '@sweet-monads/either'
import type { Static } from 'runtypes'
import { Literal, Union } from 'runtypes'
import axios from '@/api'
import URL_CONFIG from '@/api/urls.config'
import { getErrorsList } from '@/utils/api'

export const WeakPasswordError = Union(
  Literal('This password is too short. It must contain at least 8 characters.'),
  Literal('This password is too common.'),
  Literal('This password is entirely numeric.'),
)

export const IncorrectEmailError = Literal('Enter a valid email address.')
export const EmailAlreadyRegisteredError = Literal('This field must be unique.')

const possibleRegisterErrors = [WeakPasswordError, IncorrectEmailError, EmailAlreadyRegisteredError]

interface RegistrationSuccessDTO {
  email: string
  password: string
}

interface RegisterUserRequestDTO {
  email: string
  password: string
  password2: string
}

export const registerUser = async({
  email,
  password,
  passwordConfirm,
}: {
  email: string
  password: string
  passwordConfirm: string
}): Promise<
Either<
Array<
| Static<typeof WeakPasswordError>
| Static<typeof IncorrectEmailError>
| Static<typeof EmailAlreadyRegisteredError>
>,
RegistrationSuccessDTO
>
> => {
  try {
    const response = await axios.post<
    RegistrationSuccessDTO,
    AxiosResponse<RegistrationSuccessDTO, RegisterUserRequestDTO>,
    RegisterUserRequestDTO
    >(`${URL_CONFIG.AUTH.REGISTER}/`, { email, password, password2: passwordConfirm }, { withCredentials: true })

    return right(response.data)
  }
  catch (error: AxiosError | unknown) {
    if (axiosUtils.isAxiosError(error)) {
      if (error.response)
        return left(getErrorsList(error.response.data as any as Record<string, string[]>, possibleRegisterErrors))
    }

    throw error
  }
}

export const InvalidCredentialsError = Literal('Invalid credentials.')

export const authUser = async(credentials: {
}):
Promise<
Either<
Static<typeof InvalidCredentialsError>,
true
>> => {
  try {
    await axios.post(`${URL_CONFIG.AUTH.LOGIN}/`, credentials)
    return right(true)
  }
  catch (error: AxiosError | unknown) {
    if (axiosUtils.isAxiosError(error)) {
      if (error.response)
        return left(InvalidCredentialsError.value)
    }

    throw error
  }
}

export const checkUserAuth = async():
Promise<
Either<
unknown,
true
>> => {
  try {
    await axios.get(`${URL_CONFIG.AUTH.CHECK}/`)
    return right(true)
  }
  catch (error: AxiosError | unknown) {
    if (axiosUtils.isAxiosError(error)) {
      if (error.response)
        return left(InvalidCredentialsError.value)
    }

    throw error
  }
}

export const getCsrf = async(): Promise<Either<false, true>> => {
  try {
    await axios.get(URL_CONFIG.CSRF)
    return right(true)
  }
  catch {
    return left(false)
  }
}
