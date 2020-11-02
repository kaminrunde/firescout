import {RawItem} from './searchWithNode'
import Visitor from './visitor'
import md from 'markdown-ast'
import * as mdt from 'markdown-ast'
import path from 'path'

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

type Structure = {
  name: string,
  item: RawItem,
  indent: number,
  content: string,
  children: Structure[]
}

export default function createDocs (item:RawItem, allCollections:RawItem[]):Docs|null {
  const structure = createStructure(item, allCollections)
  if(!structure) return null
  return structureToDocs(structure)
}

function structureToDocs (structure:Structure):Docs {
  const ast = md(structure.content)
  const result:Docs = {
    context: structure.name,
    file: structure.item.file,
    folder: structure.item.folder,
    description: Visitor.getText(ast),
    _description: Visitor.getMd(ast),
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

  const states = structure.children.find(c => c.name.toLowerCase() === 'states')
  const handles = structure.children.find(c => c.name.toLowerCase() === 'handles')
  const collections = structure.children.find(c => c.name.toLowerCase() === 'collections')

  if(states) {
    const ast = md(states.content)
    let descNodes = ast.filter(node => node.type !== 'list')
    result.states.description = Visitor.getText(descNodes)
    result.states._description = Visitor.getMd(descNodes)
    result.states.bullets = getBullets(ast)
  }

  if(handles) {
    const ast = md(handles.content)
    let descNodes = ast.filter(node => node.type !== 'list')
    result.handles.description = Visitor.getText(descNodes)
    result.handles._description = Visitor.getMd(descNodes)
    result.handles.bullets = getBullets(ast)
  }

  if(collections) {
    for (let coll of collections.children) {
      const collDocs = structureToDocs(coll)
      result.collections[collDocs.context] = collDocs
    }
  }

  return result
}

function getBullets (nodes:mdt.Node[]):Bullet[] {
  let bulletNodes = nodes.filter(node => node.type === 'list') as mdt.List[]
  let bulletNodesFiltered = []
  let subMap = new Map<mdt.List, mdt.List[]>()
  for(let node of bulletNodes) {
    if(node.indent.replace(/[\n\r]/, '') === '') bulletNodesFiltered.push(node)
    else {
      const parent = bulletNodesFiltered[bulletNodesFiltered.length-1]
      subMap.set(parent, [...(subMap.get(parent)||[]), node])
    }
  }

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

  return bulletNodesFiltered.map(node => parseBullet(node))
}

function createStructure (item:RawItem, collections:RawItem[]):Structure|null {
  const content = item.payload
  const lines = content.split('\n')
  const sections:Structure[] = []

  // strip until context headline
  while(lines.length > 0) {
    if(!lines[0].startsWith('#')) lines.shift()
    else break
  }

  // create sections
  for(let line of lines) {
    if(line.startsWith('#')) {
      sections.push({
        item: item,
        name: line.replace(/#* */, '').trim(),
        indent: line.replace(/[^#]/g, '').length,
        content: '',
        children: []
      })
    }
    else {
      sections[sections.length-1].content += line + '\n'
    }
  }

  // fetch referenced collections
  sections.filter(s => s.name.toLowerCase() === 'collections').map(section => {
    const ast = md(section.content)
    let bulletNodes = ast.filter(node => node.type === 'list') as mdt.List[]
    bulletNodes.map(node => {
      const link = node.block[0]
      if(link.type !== 'link') return
      const dest = path.resolve(item.folder, link.url)
      const childItem = collections.find(item => item.file === dest)
      if(!childItem) return
      const structure = createStructure(childItem, collections)
      if(!structure) return
      section.children.push(structure)
    })
  })

  let target = sections.shift()
  if(!target || target.indent !== 1) return null

  const structure:Structure = { ...target }
  let chain = [structure]

  for(let section of sections) {
    const structure = { ...section }
    let parent = chain[chain.length-1]
    if(section.indent === parent.indent) {
      chain.pop()
      parent = chain[chain.length-1]
    }
    if(section.indent < parent.indent) {
      chain.pop()
      chain.pop()
      parent = chain[chain.length-1]
    }
    if(!parent) break
    parent.children.push(structure)
    chain.push(structure)
  }

  return structure
}