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

export function firescoutMockFn <CB extends (...args: any) => any>(
  name:string,
  cb:CB
):(...args:ArgumentTypes<CB>) => ReturnType<CB>{
  return (...args) => {
    if(typeof window !== 'undefined'){
      // @ts-ignore
      if(window.cymocks && window.cymocks[name]){
        // @ts-ignore
        return Promise.resolve(window.cymocks[name](...args))
      }
    }
    return cb(...args)
  }
}