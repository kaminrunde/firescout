import md from 'markdown-ast'
import * as mdt from 'markdown-ast'
import Visitor from './visitor'

type Chapter = {
  title: string,
  rank: number,
  content: mdt.Node[]
}

export default function parseComponentMdDocs (text:string) {
  const ast = md(text)
  let result = {
    context: '',
    description: '',
    triggers: [],
    states: [],
    collections: []
  }
  let chapters:Chapter[] = []
  
  for(let node of ast) {
    switch(node.type) {
      case 'title': {
        chapters.push({
          title: Visitor.getText([node]),
          rank: node.rank,
          content: []
        })
        break
      }
      default: {
        if(!chapters.length) break
        chapters[chapters.length-1].content.push(node)
      }
    }
  }

  const main = chapters.find(c => c.rank === 1)
  const triggers = chapters.find(c => c.title === 'Triggers')
  const states = chapters.find(c => c.title === 'States')

  return main
}