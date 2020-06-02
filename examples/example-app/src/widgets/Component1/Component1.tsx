import * as React from 'react'
import * as api from '../../modules/cart/api'

export default function Component1 () {
  React.useEffect(() => {
    api.fetch().then(console.log)
  })
  return (
    <div data-cy-ctx='Component1'>Component1</div>
  )
}