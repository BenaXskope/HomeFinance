import axiosUtils from 'axios'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { AxiosError } from 'axios'
import { left, right } from '@sweet-monads/either'
import type { Either } from '@sweet-monads/either'
import { addDays, endOfMonth, startOfMonth } from 'date-fns'
import axios from '@/api'
import URL_CONFIG from '@/api/urls.config'
import { mapDateToDTO } from '@/utils/api'
import { getDateFromString, getStringFromDate } from '@/utils/date'

export interface GraphPointsDTO {
  earned: Record<string, string>
  spent: Record<string, string>
}
export interface GraphPoints {
  dates: string[]
  earned: number[]
  spent: number[]
}

export interface GetGraphPointsParams {
  isDaily: boolean
  startDate: Date
  endDate: Date
}
export const getGraphPoints = async({ isDaily, startDate, endDate }: GetGraphPointsParams): Promise<
Either<
unknown,
GraphPoints
>
> => {
  try {
    const response = await axios.get<GraphPointsDTO>(`${URL_CONFIG.GRAPH_POINTS.BASE}`, {
      withCredentials: true,
      params: {
        isDaily: +isDaily,
        date_from: mapDateToDTO(startOfMonth(startDate)),
        date_to: mapDateToDTO(addDays(endOfMonth(endDate), 1)),
      },
    })

    const dates = Object.keys(response.data.earned).map(date => getStringFromDate(getDateFromString(date, isDaily), isDaily))
    const transformedResponse = {
      dates,
      earned: Object.values(response.data.earned).map(amount => parseInt(amount, 10)),
      spent: Object.values(response.data.spent).map(amount => parseInt(amount, 10)),
    }
    return right(transformedResponse)
  }
  catch (error: AxiosError | unknown) {
    if (axiosUtils.isAxiosError(error)) {
      if (error.response)
        return left(error)
    }

    throw error
  }
}
