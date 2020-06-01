

const firescoutMockFn:any = () => null

export function fetch () {
  return firescoutMockFn('cart.fetch', arguments, () => {
    return null
  })
}