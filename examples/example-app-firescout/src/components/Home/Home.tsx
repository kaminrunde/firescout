import * as React from "react"
import Inner from './Inner'

export default function Home () {
  const [open,setOpen] = React.useState(false)
  return (
    <div data-cy-ctx='pages/Index'>
      <p>
        <button onClick={() => setOpen(!open)}>click me</button>
        {open && <span data-cy-state="modal-open">invisible text</span>}
      </p>
      <Inner/>
      <Inner/>
    </div>

  )
}