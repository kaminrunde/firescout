import * as React from "react";
import InnerInner from "./InnerInner";

export default function Inner(): JSX.Element {
  const [open, setOpen] = React.useState(false);

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

      <InnerInner />
    </div>
  );
}
