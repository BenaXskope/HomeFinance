import { format, parse } from 'date-fns'
import { ru } from 'date-fns/locale'

export const getDateFromString = (date: string, isDay: boolean) => {
  const formatString = isDay ? 'd.M.yyyy' : 'M.yyyy'
  return parse(date, formatString, new Date())
}

export const getStringFromDate = (date: Date, isDay: boolean) => {
  const formatString = isDay ? 'd' : 'LLLL'
  return format(date, formatString, { locale: ru })
}
