import type { Literal, Union } from 'runtypes'

type ErrorsObject<T> = Record<string, Array<T>>

type LiteralError<T extends string> = Literal<T>
type ErrorsUnion<T extends string> = Union<readonly [LiteralError<T>, ...LiteralError<T>[]]>
type TypedErrors<T extends string> = Array<LiteralError<T> | ErrorsUnion<T>>

export const getErrorsList = <T extends string, E extends T | string>(errors: ErrorsObject<E>, knownErrors: TypedErrors<T>): Array<T> => {
  const flatServerErrors: Array<E> = new Array<E>().concat(...Object.values(errors))

  const handledErrors: T[] = flatServerErrors.filter(errMessage => knownErrors.some(err => err.guard(errMessage))) as T[]

  if (handledErrors.length !== flatServerErrors.length)
    throw new Error ('Unhandled errors')

  return handledErrors
}

export const mapDateToDTO = (date: Date) => {
  const [day, month, year] = date.toLocaleDateString().split('.')
  return `${day}/${month}/${year.substring(2)}`
}
