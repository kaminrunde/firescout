// foo


// export function firescoutMockFn <Return>(
//   name:string,
//   args: IArguments,
//   cb: () => Promise<Return>
// ):Promise<Return>{
//   if(typeof window !== 'undefined'){
//     // @ts-ignore
//     if(window.cymocks && window.cymocks[name]){
//       // @ts-ignore
//       return Promise.resolve(window.cymocks[name](...args))
//     }
//   }
//   return cb()
// }

type ArgumentTypes<T> = 
T extends (...args: infer A) => any ? A : any

declare global {
  interface Window {
    cymocks?: {[name:string]: {
      type: 'stub' | 'mock',
      cb: Function,
      options?: {
        sync?: boolean,
        throws?: boolean
      }
    }}
  }
}

export function firescoutMockFn <CB extends (...args: any) => any>(
  name:string,
  cb:CB
):(...args:ArgumentTypes<CB>) => ReturnType<CB>{
  return (...args) => {
    if(typeof window !== 'undefined'){
      if(window.cymocks && window.cymocks[name]){
        const {type,cb,options={}} = window.cymocks[name]
        if(type === 'mock'){
          let resolve = (r:any) => Promise.resolve(r)
          if(options.sync) resolve = (r:any) => r
          if(options.throws) resolve = (r:any) => Promise.reject(r)
          return resolve(window.cymocks[name].cb(...args))
        }
        if(type === 'stub'){
          cb(...args)
        }
      }
    }
    return cb(...args)
  }
}