import axiosUtils from 'axios'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { AxiosError } from 'axios'
import { left, right } from '@sweet-monads/either'
import type { Either } from '@sweet-monads/either'
import axios from '@/api'
import URL_CONFIG from '@/api/urls.config'

interface CategoriesListDTO {
  email: string
  password: string
}

export const getCategories = async(): Promise<
Either<
unknown,
CategoriesListDTO
>
> => {
  try {
    const response = await axios.get<CategoriesListDTO>(`${URL_CONFIG.CATEGORIES.ALL}/`, { withCredentials: true })

    return right(response.data)
  }
  catch (error: AxiosError | unknown) {
    if (axiosUtils.isAxiosError(error)) {
      if (error.response)
        return left(error)
    }

    throw error
  }
}
