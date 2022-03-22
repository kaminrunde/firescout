import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const el = wrap(render(<App />))
  // const inner = el.container.querySelectorAll('.my-class')
  el.context('Component-1').handle('handle-1').shouldHaveState('foo')

  expect(el.context('Component-1').root.container.innerText).toBe('my input')

  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});


function wrap <T>(t:T):Firescout<T> {
  return {...t, 
    context: () => wrap(t),
    handle: () => wrap(t)
  } as any
}

interface IdComponent1Handle1<T> {
  shouldHaveState(name:'foo'):IdComponent1Handle1<T>
  root: T
}

interface IdComponent1<T> {
  handle(name:'handle-1'):IdComponent1Handle1<T>
  root: T
}

interface Firescout<T> {
  context(name:'Component-1'):IdComponent1<T>
  root: T
}