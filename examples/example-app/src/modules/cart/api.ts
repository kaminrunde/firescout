import {firescoutMockFn} from 'cypress-firescout'

export type Fetch = string

export function fetch () {
  return firescoutMockFn<Fetch>('cart.fetch', arguments, async () => {
    return 'foo'
  })
}