type ArgumentTypes<T> = T extends (...args: infer A) => any ? A : any

declare global {
  interface Window {
    cymocks?: {
      [name: string]: {
        type: 'stub' | 'mock'
        cb: Function
      }
    }
    firescoutVars?: { [name: string]: any }
  }
}

export function firescoutMockFn<CB extends (...args: any) => any>(
  name: string,
  cb: CB
): (...args: ArgumentTypes<CB>) => ReturnType<CB> {
  return (...args) => {
    if (typeof window !== 'undefined') {
      if (window.cymocks && window.cymocks[name]) {
        const { type, cb } = window.cymocks[name]
        if (type === 'mock') {
          return window.cymocks[name].cb(...args)
        }
        if (type === 'stub') {
          cb(...args)
        }
      }
    }
    return cb(...args)
  }
}

export function firescoutMockVar<Val>(name: string, val: Val): Val {
  if (typeof window !== 'undefined') {
    if (window.firescoutVars && window.firescoutVars[name]) {
      return window.firescoutVars[name]
    }
  }
  return val
}
