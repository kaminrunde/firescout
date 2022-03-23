import React from 'react';
// import { render, screen, fireEvent, act } from '@testing-library/react';
import App from './App';
import {mount} from '@kaminrunde/react-firescout'
import { render, fireEvent, act } from '@testing-library/react';

test('renders learn react link', async () => {
  const f = mount(<App />, {render, fireEvent, act})
  const ctx = () => f.context('App')

  ctx().shouldNotHaveState('on')
  ctx().shouldNotHaveState('ton')
  ctx().shouldNotHaveState('t2on')
  ctx().shouldNotHaveState('t3on')
  await ctx().handle('btn').click(100)
  ctx().shouldHaveState('on')
  ctx().shouldHaveState('ton')
  ctx().shouldHaveState('t2on')
  ctx().shouldHaveState('t3on')
});


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