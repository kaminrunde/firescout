// foo


export function firescoutMockFn <Return>(
  name:string,
  args: IArguments,
  cb: () => Promise<Return>
):Promise<Return>{
  if(typeof window !== 'undefined'){
    // @ts-ignore
    if(window.cymocks && window.cymocks[name]){
      // @ts-ignore
      return Promise.resolve(window.cymocks[name](...args))
    }
  }
  return cb()
}