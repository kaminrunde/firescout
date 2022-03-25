// <reference path="Firescout.d.ts"/>

import React from 'react';
// import { render, screen, fireEvent, act } from '@testing-library/react';
import App from './App';
import {mount, getModule, clearMocks} from '@kaminrunde/react-firescout'
import * as rtl from '@testing-library/react';


describe('app', () => {

  beforeEach(clearMocks)

  test('renders learn react link!', async () => {
    const fixture = getModule('App').fn('my-fn').mock('my-fixture', jest.fn)
    

    const f = mount(<App />, rtl)
    const ctx = () => f.context('App')

    const el = ctx().unwrap()
    
  
    // console.log(JSON.stringify(expect.getState(), null, 2))
  
    ctx().shouldNotHaveState('on')
    ctx().shouldNotHaveState('ton')
    ctx().shouldNotHaveState('t2on')
    ctx().shouldNotHaveState('t3on')
    await ctx().handle('btn').nth(0).click(10)
    ctx().shouldHaveState('on')
    ctx().shouldHaveState('ton')
    ctx().shouldHaveState('t2on')
    ctx().shouldHaveState('t3on')
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