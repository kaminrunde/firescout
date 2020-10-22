import * as React from "react"
import Inner from './Inner'

export default function Home ():JSX.Element {
  const [open,setOpen] = React.useState(false)
  return (
    <div data-cy-ctx='components/Home'>
      <p>
        <button data-cy-handle-foo="open-secret" onClick={() => setOpen(!open)}>click me</button>
        {open && <span data-cy-state="secret-visible">invisible text</span>}
      </p>
      <Inner/>
      <Inner/>
    </div>

  )
}