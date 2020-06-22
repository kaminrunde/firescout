import * as React from 'react'

export default function ColorFilter (): JSX.Element {
  return (
    <div data-cy-collection='ColorFilter'>
      {['red', 'green'].map(color => (
        <button key={color} onClick={console.log} data-cy-handle='color-icon'>{color}</button>
      ))}
      <button onClick={console.log} data-cy-handle='clear-button'>clear</button>
      <span data-cy-state='selected'/>
    </div>
  )
}