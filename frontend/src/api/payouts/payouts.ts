import axiosUtils from 'axios'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { AxiosError } from 'axios'
import { left, right } from '@sweet-monads/either'
import type { Either } from '@sweet-monads/either'
import axios from '@/api'
import URL_CONFIG from '@/api/urls.config'

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
    await axios.post<unknown>(`${URL_CONFIG.PAYOUTS.BASE}/`, {
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
