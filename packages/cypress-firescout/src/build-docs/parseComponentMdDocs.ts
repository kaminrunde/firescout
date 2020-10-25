import md from 'markdown-ast'
import * as mdt from 'markdown-ast'
import Visitor from './visitor'
import path from 'path'
import {RawItem as GrepRawItem} from './searchWithGrep'
import {RawItem as NodeRawItem} from './searchWithNode'

type RawItem = GrepRawItem | NodeRawItem

export type Docs = {
  context: string,
  file: string,
  folder: string,
  description: string,
  _description: string,
  handles: ChapterContent,
  states: ChapterContent,
  collections: Record<string,Docs>
}

type Bullet = {
  name: string,
  value: string,
  bullets: Bullet[] | null,
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

export default function parseComponentMdDocs (mdItem:RawItem, allCollections:RawItem[]) {
  const text = mdItem.payload
  const ast = md(text)
  let result:Docs = {
    context: '',
    file: mdItem.file,
    folder: mdItem.folder,
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
    },
    collections: {}
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
  const collections = chapters.find(c => c.title.toLowerCase() === 'collections')

  // chapter content is initially empty
  if(main) buildChapterContent(main)
  if(handles) buildChapterContent(handles)
  if(states) buildChapterContent(states)
  
  if(collections) {
    getCollectionsContent(collections, mdItem, allCollections).forEach(col => {
      result.collections[col.context] = col
    })
  }

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
  let bulletNodesFiltered = []
  let subMap = new Map<mdt.List, mdt.List[]>()
  for(let node of bulletNodes) {
    if(node.indent === '') bulletNodesFiltered.push(node)
    else {
      const parent = bulletNodesFiltered[bulletNodesFiltered.length-1]
      subMap.set(parent, [...(subMap.get(parent)||[]), node])
    }
  }
  
  // parse chapter description
  chapter.content.description = Visitor.getText(descNodes)
  chapter.content._description = Visitor.getMd(descNodes)
  chapter.content.bullets = bulletNodesFiltered.map(node => parseBullet(node))
  
  function parseBullet (node:mdt.List):Bullet {
    const [title, ...rest] = node.block
    let name = Visitor.getText([title])
    let value = Visitor.getText(rest)
    let _name = Visitor.getMd([title])
    let _value = Visitor.getMd(rest)
    let bullets = subMap.get(node)?.map(parseBullet) || null
    if(value.startsWith(': ')) value = value.replace(': ', '')
    return { name, value, _name, _value, bullets }
  }
}

function getCollectionsContent (chapter:Chapter, rootItem:RawItem, allCollections:RawItem[]) {
  let bulletNodes = chapter.contentNodes.filter(node => node.type === 'list') as mdt.List[]

  const list = bulletNodes
    .map(node => parseBullet(node))
    .filter(row => row.name !== 'remove')
    .map(row => {
      const mdFile = allCollections.find(item => item.file === row.path)
      if(!mdFile) return null
      return parseComponentMdDocs(mdFile, allCollections)
    })
    .filter(Boolean) as Docs[]

  return list

  function parseBullet(node:mdt.List):{name:string,path:string} {
    const link = node.block[0]
    if(link.type !== 'link') return {name:'remove',path:''}
    return {
      name: Visitor.getText([link]),
      path: path.resolve(rootItem.folder, link.url)
    }
  }
}