export const exhaustivenessCheck = (x: never) => {
  throw new Error(`Unhandled value ${x}`)
}
