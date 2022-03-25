
declare module '@kaminrunde/react-firescout' {
  interface IdModuleFoo {
    fn(name:'fn-1'):any
    fn(name:'fn-2'):any
  }
  export function getModule(name:'foo'):IdModuleFoo
  export function getModule(name:'foo2'):any
}