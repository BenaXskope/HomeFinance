import axiosUtils from 'axios'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { AxiosError } from 'axios'
import { left, right } from '@sweet-monads/either'
import type { Either } from '@sweet-monads/either'
import type { CategoryDTO } from '@api/categories/categories'
import URL_CONFIG from '@api/urls.config'
import axios from '@/api'

interface PayoutDTO {
  id: number
  account: number
  category: CategoryDTO
  creation_date: string
  description: string
  isExpenditure: boolean
  isFastRecord: boolean
  value: string
}
type PayoutListDTO = Array<PayoutDTO>

export interface Payout {
  id: number
  category: number
  categoryTitle: string
  amount: number
  description: string
  isExpense: boolean
  date: string
}
export type PayoutsList = Array<Payout>

export const getPayouts = async(): Promise<
Either<
unknown,
PayoutsList
>
> => {
  try {
    const response = await axios.get<PayoutListDTO>(`${URL_CONFIG.PAYOUTS.BASE}?expand=category`, { withCredentials: true })

    return right(response.data.map(payout => ({
      id: payout.id,
      category: payout.category.id,
      categoryTitle: payout.category.title,
      amount: parseInt(payout.value, 10),
      description: payout.description,
      isExpense: payout.isExpenditure,
      date: new Date(payout.creation_date).toLocaleDateString(),
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

interface CreatePayoutParams {
  category: number
  amount: number
  description?: string
  isExpense: boolean
}
export const createPayout = async(data: CreatePayoutParams):
Promise<
Either<
unknown,
true
>
> => {
  try {
    await axios.post(`${URL_CONFIG.PAYOUTS.BASE}/`, {
      value: data.amount,
      category: data.category,
      description: data.description,
      isExpenditure: data.isExpense,
    },
    { withCredentials: true })

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

interface DeletePayoutParams {
  id: number
}
export const deletePayout = async(data: DeletePayoutParams):
Promise<
Either<
unknown,
true
>
> => {
  try {
    await axios.delete(`${URL_CONFIG.PAYOUTS.BASE}/${data.id}/`, { withCredentials: true })

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
