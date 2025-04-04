import * as React from "react"
import {fetch} from '../../../modules/cart/api'

export default function Inner ():JSX.Element {
  const [open,setOpen] = React.useState(false)
  const [data,setData] = React.useState('')

  React.useEffect(() => {
    fetch().then(setData)
  }, [])
  return (
    <div data-cy-collection='Inner'>
      <p>
        <button data-cy-handle='open-inner-secret' onClick={() => setOpen(!open)}>click me</button>
        {open && <span data-cy-state="inner-secret-visible">{data || '...'}</span>}
      </p>
    </div>

  )
}