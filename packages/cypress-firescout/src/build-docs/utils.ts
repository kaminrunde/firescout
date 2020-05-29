import {exec} from 'child_process'

export function executeCmd (cmd:string):Promise<string> {
  return new Promise((resolve,reject) => {
    exec(cmd, (error, stdout) => {
      if(error) resolve('')//reject(error)
      else resolve(stdout)
    })
  })
}

export function parseFile (file:string):string {
  return file.replace(process.cwd(), '')
}