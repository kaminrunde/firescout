import md from 'markdown-ast'
import * as mdt from 'markdown-ast'
import Visitor from './visitor'

type Docs = {
  context: string,
  description: string,
  triggers: ChapterContent,
  states: ChapterContent
}

type Bullet = {
  name: string,
  value: string
}

type ChapterContent = {
  description: string,
  bullets: Bullet[]
}


type Chapter = {
  title: string,
  rank: number,
  contentNodes: mdt.Node[],
  content: ChapterContent
}

export default function parseComponentMdDocs (text:string) {
  const ast = md(text)
  let result:Docs = {
    context: '',
    description: '',
    triggers: {
      description: '',
      bullets: []
    },
    states: {
      description: '',
      bullets: []
    }
  }
  let chapters:Chapter[] = []
  
  // create chapters. A chapter has title and content (until next title starts)
  for(let node of ast) {
    switch(node.type) {
      case 'title': {
        chapters.push({
          title: Visitor.getText([node]),
          rank: node.rank,
          contentNodes: [],
          content: {
            description: '',
            bullets: []
          }
        })
        break
      }
      default: {
        if(!chapters.length) break
        chapters[chapters.length-1].contentNodes.push(node)
      }
    }
  }

  // find sections by title
  const main = chapters.find(c => c.rank === 1)
  const triggers = chapters.find(c => c.title === 'Triggers')
  const states = chapters.find(c => c.title === 'States')

  // chapter content is initially empty
  if(main) buildChapterContent(main)
  if(triggers) buildChapterContent(triggers)
  if(states) buildChapterContent(states)

  if(main) {
    result.context = main.title
    result.description = main.content.description
  }

  if(triggers){
    result.triggers = triggers.content
  }

  if(states){
    result.states = states.content
  }


  return result
}

function buildChapterContent (chapter:Chapter) {
  let descNodes = chapter.contentNodes.filter(node => node.type !== 'list')
  let bulletNodes = chapter.contentNodes.filter(node => node.type === 'list') as mdt.List[]
  
  // parse chapter description
  chapter.content.description = Visitor.getText(descNodes)
  chapter.content.bullets = bulletNodes.map(node => parseBullet(node))
}

function parseBullet (node:mdt.List):Bullet {
  const [title, ...rest] = node.block
  return {
    name: Visitor.getText([title]),
    value: Visitor.getText(rest)
  }
}