import md from 'markdown-ast'
import * as mdt from 'markdown-ast'
import Visitor from './visitor'

type Docs = {
  context: string,
  description: string,
  _description: string,
  handles: ChapterContent,
  states: ChapterContent
}

type Bullet = {
  name: string,
  value: string,
  _name: string,
  _value: string
}

type ChapterContent = {
  description: string,
  _description: string,
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
    _description: '',
    handles: {
      description: '',
      _description: '',
      bullets: []
    },
    states: {
      description: '',
      _description: '',
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
            _description: '',
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
  const handles = chapters.find(c => c.title.toLowerCase() === 'handles')
  const states = chapters.find(c => c.title.toLowerCase() === 'states')

  // chapter content is initially empty
  if(main) buildChapterContent(main)
  if(handles) buildChapterContent(handles)
  if(states) buildChapterContent(states)

  if(main) {
    result.context = main.title
    result.description = main.content.description
    result._description = main.content._description
  }

  if(handles){
    result.handles = handles.content
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
  chapter.content._description = Visitor.getMd(descNodes)
  chapter.content.bullets = bulletNodes.map(node => parseBullet(node))
}

function parseBullet (node:mdt.List):Bullet {
  const [title, ...rest] = node.block
  let name = Visitor.getText([title])
  let value = Visitor.getText(rest)
  let _name = Visitor.getMd([title])
  let _value = Visitor.getMd(rest)
  if(value.startsWith(': ')) value = value.replace(': ', '')
  return { name, value, _name, _value }
}