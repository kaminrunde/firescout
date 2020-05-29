import {exec} from 'child_process'

export default function executeCmd (cmd:string):Promise<string> {
  return new Promise((resolve,reject) => {
    exec(cmd, (error, stdout) => {
      if(error) resolve('')//reject(error)
      else resolve(stdout)
    })
  })
}