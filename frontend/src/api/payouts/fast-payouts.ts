import axiosUtils from 'axios'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { AxiosError } from 'axios'
import { left, right } from '@sweet-monads/either'
import type { Either } from '@sweet-monads/either'
import type { CategoryDTO } from '@api/categories/categories'
import axios from '@/api'
import URL_CONFIG from '@/api/urls.config'

interface FastPayoutDTO {
  id: number
  account: number
  category: CategoryDTO
  creation_date: string
  description: string
  isExpenditure: boolean
  isFastRecord: boolean
  value: string
}
type FastPayoutListDTO = Array<FastPayoutDTO>

export interface FastPayout {
  id: number
  category: number
  categoryTitle: string
  amount: number
  isExpense: boolean
}
export type FastPayoutsList = Array<FastPayout>

export const getFastPayouts = async(): Promise<
Either<
unknown,
FastPayoutsList
>
> => {
  try {
    const response = await axios.get<FastPayoutListDTO>(`${URL_CONFIG.FAST_PAYOUTS.BASE}?expand=category`, { withCredentials: true })

    return right(response.data.map(fastPayout => ({
      id: fastPayout.id,
      category: fastPayout.category.id,
      categoryTitle: fastPayout.category.title,
      amount: parseInt(fastPayout.value, 10),
      isExpense: fastPayout.isExpenditure,
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
    await axios.post(`${URL_CONFIG.FAST_PAYOUTS.BASE}/`, {
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
