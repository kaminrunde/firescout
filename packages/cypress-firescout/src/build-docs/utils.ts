import {exec} from 'child_process'
import fs from 'fs'

export function executeCmd (cmd:string):Promise<string> {
  return new Promise((resolve,reject) => {
    exec(cmd, (error, stdout) => {
      if(error) resolve('')//reject(error)
      else resolve(stdout)
    })
  })
}

export type File = {
  name: string,
  path: string,
  isFile: boolean,
  isDir: boolean
}

export function readDir (path:string):Promise<File[]> {
  return new Promise((resolve,reject) => {
    fs.readdir(path, (err, filenames) => {
      if (err) return reject(err)
      Promise.all(filenames.map(name => readStats(path+'/'+name, name)))
        .then(resolve)
    })
  })
}

export function readFile (path:string):Promise<string> {
  return new Promise((resolve,reject) => {
    fs.readFile(path, 'utf8', (err, content) => {
      if (err) return reject(err)
      else return resolve(content)
    })
  })
}

export function readStats (path:string, name:string):Promise<File> {
  return new Promise((resolve,reject) => {
    fs.lstat(path, (err,stats) => {
      if(err) return reject(err)
      else return resolve({
        name: name,
        path: path,
        isFile: stats.isFile(),
        isDir: stats.isDirectory()
      })
    })
  })
}

export function normalizeFilePath (file:string):string {
  return file.replace(process.cwd(), '')
}

export function getFileFolder (file:string):string {
  file = normalizeFilePath(file)
  return file.split('/').slice(0,-1).join('/')
}

export function getTypesaveId (id:string):string {
  return (id.charAt(0).toUpperCase() + id.slice(1)).replace(/\//g, '')
}