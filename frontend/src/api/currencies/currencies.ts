import axiosUtils from 'axios'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { AxiosError } from 'axios'
import { left, right } from '@sweet-monads/either'
import type { Either } from '@sweet-monads/either'
import axios from '@/api'
import URL_CONFIG from '@/api/urls.config'

interface CurrencyDTO {
  id: number
  let_code: string
  name: string
  num_code: number
  rate: string
  units: number
}
type CurrenciesListDTO = Array<CurrencyDTO>

export interface Currency {
  id: number
  code: string
  rate: number
}
export type CurrenciesList = Array<Currency>

export const getCurrencies = async(): Promise<
Either<
unknown,
CurrenciesList
>
> => {
  try {
    const response = await axios.get<CurrenciesListDTO>(`${URL_CONFIG.CURRENCIES.BASE}/`, { withCredentials: true })

    return right(response.data.map(currency => ({
      id: currency.id,
      code: currency.let_code,
      rate: Number(parseFloat(currency.rate).toFixed(2)),
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
