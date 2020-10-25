import * as React from "react"
import Inner from './Inner'

export default function Home ():JSX.Element {
  const [open,setOpen] = React.useState(false)
  return (
    <div data-cy-ctx={
      'components/Home'}>
      <p>
        <button data-cy-handle={true && "open-secret"} onClick={() => setOpen(!open)}>click me</button>
        {open && <span data-cy-state="secret-visible:text-1">invisible text1</span>}
        {open && <span data-cy-state="secret-visible:text-2">invisible text2</span>}
      </p>
      <Inner/>
      <Inner/>
    </div>

  )
}