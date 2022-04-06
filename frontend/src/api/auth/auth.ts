import axios from 'axios'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { AxiosError, AxiosResponse } from 'axios'
import { left, right } from '@sweet-monads/either'
import type { Either } from '@sweet-monads/either'
import type { Static } from 'runtypes'
import { Literal, Union } from 'runtypes'
import URL_CONFIG from '@/api/urls.config'

export const WeakPasswordError = Union(
  Literal('This password is too short. It must contain at least 8 characters.'),
  Literal('This password is too common.'),
)
export const IncorrectEmailError = Literal('Enter a valid email address.')
export const EmailAlreadyRegisteredError = Literal('This field must be unique.')

interface RegistrationSuccessDTO {
  email: string
  password: string
}

interface RegisterUserRequestDTO {
  email: string
  username: string
  password: string
  password2: string
}

export const registerUser = async({
  email,
  username,
  password,
  passwordConfirm,
}: {
  email: string
  username: string
  password: string
  passwordConfirm: string
}): Promise<
Either<
| Static<typeof WeakPasswordError>
| Static<typeof IncorrectEmailError>
| Static<typeof EmailAlreadyRegisteredError>,
RegistrationSuccessDTO
>
> => {
  try {
    const response = await axios.post<
    RegistrationSuccessDTO,
    AxiosResponse<RegistrationSuccessDTO, RegisterUserRequestDTO>,
    RegisterUserRequestDTO
    >(`/api/${URL_CONFIG.AUTH.REGISTER}`, { email, username, password, password2: passwordConfirm })

    return right(response.data)
  }
  catch (error: AxiosError | unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response)
        return left(IncorrectEmailError.value)
    }

    throw error
  }
}
