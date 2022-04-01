import * as React from "react";

/** @firescoutMockFn App.fetchInner */
function fetchInner() {
  return "foos";
}

export default function Inner(): JSX.Element {
  const [open, setOpen] = React.useState(false);

  const inner = fetchInner();

  return (
    <div data-cy-collection="Inner">
      <p>
        <button
          data-cy-handle="open-inner-secret"
          onClick={() => setOpen(!open)}
        >
          click me
        </button>
        {open && <span data-cy-state="inner-secret-visible">Hello</span>}
      </p>
    </div>
  );
}
