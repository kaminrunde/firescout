import * as t from './types'

export function query(query: string, elements: t.FirescoutElement[]) {
  const targets: t.FirescoutElement[] = []

  for (const el of elements)
    targets.push(
      ...Array.from(el.container.querySelectorAll(query)).map((container, index) => ({
        container,
        parent: el,
        index,
      }))
    )

  return targets
}

export function bubbleError(size: number, msg: string) {
  const e = new Error(msg)
  if (e.stack) {
    const lines = e.stack.split('\n')
    const combined = [lines.shift()]
    for (let i = 0; i < size; i++) lines.shift()

    e.stack = combined.concat(lines).join('\n')
  }
  throw e
}
