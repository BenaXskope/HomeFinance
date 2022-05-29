import axiosUtils from 'axios'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { AxiosError } from 'axios'
import { left, right } from '@sweet-monads/either'
import type { Either } from '@sweet-monads/either'
import { endOfMonth, startOfMonth } from 'date-fns'
import axios from '@/api'
import URL_CONFIG from '@/api/urls.config'
import { mapDateToDTO } from '@/utils/api'

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

export interface GetCategoriesWithStatsParams {
  month: Date
  isDaily?: boolean
}
export interface CategoryWithStatsDTO {
  category: CategoryDTO
  spentTotal: number
  earnedTotal: number
}
export type CategoriesWithStatsDTO = Array<CategoryWithStatsDTO>

export interface CategoryWithStats extends Category{
  spentTotal: number
  earnedTotal: number
}
export type CategoriesWithStats = Array<CategoryWithStats>
export const getCategoriesWithStats = async({ month, isDaily = false }: GetCategoriesWithStatsParams): Promise<
Either<
unknown,
CategoriesWithStats
>> => {
  try {
    const response = await axios.get<CategoriesWithStatsDTO>(`${URL_CONFIG.CATEGORIES.STATISTICS}`, {
      withCredentials: true,
      params: {
        date_from: mapDateToDTO(startOfMonth(month)),
        date_to: mapDateToDTO(endOfMonth(month)),
        isDaily,
      },
    })
    return right(response.data.map(categoryDTO => ({
      id: categoryDTO.category.id,
      title: categoryDTO.category.title,
      prognosis: parseFloat(categoryDTO.category.prognosis),
      spentTotal: categoryDTO.spentTotal,
      earnedTotal: categoryDTO.earnedTotal,
    })))
  }
  catch (e) {
    return left(e)
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
