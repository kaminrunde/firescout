import fs from 'fs'
import parse from './parseComponentMdDocs'

const text = fs.readFileSync(__dirname + '/README.md', 'utf8')
 
const result = parse(text)

console.log(JSON.stringify(result,null,2))