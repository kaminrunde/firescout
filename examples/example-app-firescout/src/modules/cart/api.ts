

export type Fetch = string

/** @firescoutMock cart.fetch */
export const fetch = async ():Promise<Fetch> => {
  return Promise.resolve('foo')
}

  