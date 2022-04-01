import * as md from 'markdown-ast'

/**
 * Visitor patern implementation
 */
export default class Visitor {
  listeners: any = {}

  static getText(nodes: md.Node[]) {
    const v = new Visitor()
    let text = ''
    v.on('text', (block) => {
      text += block.text
    })
    v.fit(nodes)
    return text
  }

  static getMd(nodes: md.Node[]) {
    let result = ''
    for (let node of nodes) {
      switch (node.type) {
        case 'bold':
        case 'strike':
        case 'italic':
          result += node.style + Visitor.getMd(node.block) + node.style
          break
        case 'text':
        case 'border':
        case 'break':
          result += node.text
          break
        case 'codeBlock':
          result += node.indent + node.syntax + node.code + node.indent
          break
        case 'codeSpan':
          result += '`' + node.code + '`'
          break
        // case 'image': result += node.
        // case 'link': result += node.
        // case 'linkDef':
        // case 'list': result += node.
        // case 'quote':
        case 'title':
          result += Array(node.rank).fill('#').join('') + ' ' + Visitor.getMd(node.block)
          break
      }
    }
    return result
  }

  on<K extends keyof md.NodeTypes>(type: K, cb: (row: md.NodeTypes[K]) => void) {
    if (!this.listeners[type]) this.listeners[type] = []
    this.listeners[type].push(cb)
  }

  fit(rows: md.Node[]) {
    const recursive = (node: md.Node) => {
      if (this.listeners[node.type]) {
        this.listeners[node.type].forEach((l: any) => l(node))
      }
      // @ts-ignore
      if (node.block)
        for (let block of node.block) {
          recursive(block)
        }
    }

    for (let block of rows) recursive(block)
  }
}
