import * as md from 'markdown-ast'


/**
 * Visitor patern implementation
 */
export default class Visitor {
  listeners:any = {}

  static getText (nodes:md.Node[]) {
    const v = new Visitor()
    let text = ''
    v.on('text',block => {
      text += block.text
    })
    v.fit(nodes)
    return text
  }

  on<K extends keyof md.NodeTypes>(
    type:K, 
    cb:(row:md.NodeTypes[K])=> void
  ){
    if(!this.listeners[type]) this.listeners[type] = []
    this.listeners[type].push(cb)
  }

  fit(rows:md.Node[]){
    const recursive = (node:md.Node) => {
      if(this.listeners[node.type]){
        this.listeners[node.type].forEach((l:any) => l(node))
      }
      // @ts-ignore
      if(node.block) for(let block of node.block) {
        recursive(block)
      }
    }

    for(let block of rows) recursive(block)
  }
}
