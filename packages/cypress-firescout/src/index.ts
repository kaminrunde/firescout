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
        const {type,cb} = window.cymocks[name]
        if(type === 'mock'){
          return window.cymocks[name].cb(...args)
        }
        if(type === 'stub'){
          cb(...args)
        }
      }
    }
    return cb(...args)
  }
}