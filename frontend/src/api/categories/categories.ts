import axiosUtils from 'axios'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { AxiosError } from 'axios'
import { left, right } from '@sweet-monads/either'
import type { Either } from '@sweet-monads/either'
import axios from '@/api'
import URL_CONFIG from '@/api/urls.config'

export interface CategoryDTO {
  account: number
  color: string
  id: number
  prognosis: string
  title: string
}
export type CategoriesListDTO = Array<CategoryDTO>

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

export interface PatchCategoryParams {
  id: number
  title: string
  prognosis: number
}
export const editCategory = async(data: PatchCategoryParams): Promise<
Either<
unknown,
true
>
> => {
  try {
    const { id, ...bodyParams } = data
    await axios.patch(`${URL_CONFIG.CATEGORIES.BASE}/${id}/`, bodyParams, { withCredentials: true })

    return right(true)
  }
  catch (error: AxiosError | unknown) {
    if (axiosUtils.isAxiosError(error)) {
      if (error.response)
        return left(error)
    }

    throw error
  }
}

export interface PostCategoryParams {
  title: string
  prognosis: number
}
export const createCategory = async(data: PostCategoryParams): Promise<
Either<
unknown,
true
>
> => {
  try {
    await axios.post(`${URL_CONFIG.CATEGORIES.BASE}/`, data, { withCredentials: true })

    return right(true)
  }
  catch (error: AxiosError | unknown) {
    if (axiosUtils.isAxiosError(error)) {
      if (error.response)
        return left(error)
    }

    throw error
  }
}
