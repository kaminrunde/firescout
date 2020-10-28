

export type Fetch = string

/** @firescoutMockFn cart.fetch */
export const fetch = async ():Promise<Fetch> => {
  return Promise.resolve('foo')
}

  