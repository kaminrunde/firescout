import React from 'react'
import App from './App'
import {mount, getModule, clearMocks} from '@kaminrunde/react-firescout'
import * as rtl from '@testing-library/react';


describe('app', () => {

  beforeEach(clearMocks)

  test('renders learn react link!', async () => {
    const fixture = await getModule('App').fn('fetchData').mock('default', jest.fn)
    

    const f = mount(<App />, rtl)
    const ctx = () => f.context('App')
  
    ctx().shouldNotHaveState('on')
    ctx().shouldNotHaveState('ton')
    ctx().shouldNotHaveState('t2on')
    ctx().shouldNotHaveState('t3on')
    await ctx().handle('btn').nth(0).click(1)
    ctx().shouldHaveState('on')
    ctx().shouldHaveState('ton', 'imp1,imp2')
    ctx().shouldHaveState('t2on')
    ctx().shouldHaveState('t3on')

    // expect(fixture).toBeCalledTimes(1)
  });

  test('foo', () => {
    
  })
})


// function wrap <T>(t:T):Firescout<T> {
//   return {...t, 
//     context: () => wrap(t),
//     handle: () => wrap(t)
//   } as any
// }

// interface IdComponent1Handle1<T> {
//   shouldHaveState(name:'foo'):IdComponent1Handle1<T>
//   root: T
// }

// interface IdComponent1<T> {
//   handle(name:'handle-1'):IdComponent1Handle1<T>
//   root: T
// }

// interface Firescout<T> {
//   context(name:'Component-1'):IdComponent1<T>
//   root: T
// }