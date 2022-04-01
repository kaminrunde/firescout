type Item = {
  type: 'handle' | 'ctx' | 'collection'
  el: any
  payload: string
  index?: number
}

// @ts-ignore
Cypress.SelectorPlayground.defaults({
  onElement: ($el: any) => {
    let list: Item[] = []
    let $parent = $el
    let max = 500
    while (max--) {
      if ($parent.tagName === 'body') break
      let id = $parent.attr('data-cy-ctx')
      let handle = $parent.attr('data-cy-handle')
      let collection = $parent.attr('data-cy-collection')
      if (handle) list.push({ type: 'handle', el: $parent, payload: handle })
      if (collection) list.push({ type: 'collection', el: $parent, payload: collection })
      if (id) list.push({ type: 'ctx', el: $parent, payload: id })
      $parent = $parent.parent()
    }

    list = list.reverse()

    for (let i = 0; i < list.length; i++) {
      let current = list[i]
      let next = list[i + 1]
      if (!next) continue
      let name = `data-cy-${next.type}`
      let value = next.el.attr(name)
      let items = current.el.find(`[${name}="${value}"]`)
      if (items.length > 1) {
        next.index = items.index(next.el)
      }
    }

    const selector = list
      .map((row) => {
        if (row.type === 'ctx') {
          if (typeof row.index === 'number') {
            return `.context('${row.payload}', ${row.index})`
          } else return `.context('${row.payload}')`
        }
        if (row.type === 'collection') {
          if (typeof row.index === 'number') {
            return `.collection('${row.payload}', ${row.index})`
          } else return `.collection('${row.payload}')`
        }
        if (row.type === 'handle') {
          if (typeof row.index === 'number') {
            return `.handle('${row.payload}', ${row.index})`
          } else return `.handle('${row.payload}')`
        }
      })
      .join('')

    return 'cy' + selector
  },
})
