import {firescoutMockFn} from '@kaminrunde/cypress-firescout'

export type Fetch = string

export const fetch = firescoutMockFn('cart.fetch', 
async ():Promise<Fetch> => {
  return 'foo'
})
