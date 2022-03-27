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

    expect(fixture).toBeCalledTimes(1)
  });

})
