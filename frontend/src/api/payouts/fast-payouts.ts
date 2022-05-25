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

export const getFastPayouts = async(): Promise<
Either<
unknown,
CategoriesListDTO
>
> => {
  try {
    const response = await axios.get<CategoriesListDTO>(`${URL_CONFIG.FAST_PAYOUTS.BASE}/`, { withCredentials: true })

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

interface CreateFastPayoutParams {
  category: number
  amount: number
  isExpense: boolean
}
export const createFastPayout = async(data: CreateFastPayoutParams):
Promise<
Either<
unknown,
true
>
> => {
  try {
    await axios.post<CategoriesListDTO>(`${URL_CONFIG.FAST_PAYOUTS.BASE}/`, {
      value: data.amount,
      isExpenditure: data.isExpense,
      category: data.category,
      description: 'FAST_CREATION',
      isFastRecord: true,
    }, { withCredentials: true })

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
