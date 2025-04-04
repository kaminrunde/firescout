import * as React from "react"
import Inner from "./Inner"

export default function Home(): JSX.Element {
  const [open, setOpen] = React.useState(false)

  /** @firescoutMockVar Home.test */
  const headline = "Default Headline"

  return (
    <div data-cy-ctx={"components/Home"}>
      <h1>{headline}</h1>
      <p>
        <button
          data-cy-handle={true && "open-secret"}
          onClick={() => setOpen(!open)}
        >
          click me
        </button>
        {open && (
          <span data-cy-state="secret-visible:text-1">invisible text1</span>
        )}
        {open && (
          <span data-cy-state="secret-visible:text-2">invisible text2</span>
        )}
      </p>
      <Inner />
      <Inner />
    </div>
  )
}
