import axiosUtils from 'axios'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { AxiosError } from 'axios'
import { left, right } from '@sweet-monads/either'
import type { Either } from '@sweet-monads/either'
import axios from '@/api'
import URL_CONFIG from '@/api/urls.config'

interface CategoryDTO {
  account: number
  color: string
  id: number
  prognosis: string
  title: string
}
type CategoriesListDTO = Array<CategoryDTO>

export interface Category {
  id: number
  title: string
  prognosis: number
}
export type CategoriesList = Array<Category>

export const getCategories = async(): Promise<
Either<
unknown,
CategoriesList
>
> => {
  try {
    const response = await axios.get<CategoriesListDTO>(`${URL_CONFIG.CATEGORIES.BASE}/`, { withCredentials: true })

    return right(response.data.map(category => ({
      id: category.id,
      title: category.title,
      prognosis: parseFloat(category.prognosis),
    })))
  }
  catch (error: AxiosError | unknown) {
    if (axiosUtils.isAxiosError(error)) {
      if (error.response)
        return left(error)
    }

    throw error
  }
}
