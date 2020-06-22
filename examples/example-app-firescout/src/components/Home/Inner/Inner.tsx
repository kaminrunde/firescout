import * as React from "react"

export default function Inner () {
  const [open,setOpen] = React.useState(false)
  return (
    <div data-cy-collection='inner'>
      <p>
        <button data-cy-handle='inner-modal' onClick={() => setOpen(!open)}>click me</button>
        {open && <span data-cy-state="inner-modal-open">invisible text</span>}
      </p>
    </div>

  )
}