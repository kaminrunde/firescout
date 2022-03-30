
// declare module '@kaminrunde/react-firescout' {
//   // static
//   type Func = (...args: any) => any
  
//   // generate for each module fn
//   interface IdModuleAppFetchData {
//     mock<Wrapper extends Func>(name:'default', wrapper?:Wrapper):Promise<ReturnType<Wrapper>>
//     stub<Wrapper extends Func>(wrapper?:Wrapper):Promise<ReturnType<Wrapper>>
//   }


//   // generate for each module
//   interface IdModuleApp {
//     // generate for each module fn
//     fn(name:'fetchData'):IdModuleAppFetchData
//   }

//   // generate for each module
//   export function getModule(name:'App'):IdModuleApp

//   // static
//   interface Interactable<Root> {
//     unwrap():Element
//     nth(n:number):Root
//     click(timeout?:number):Promise<void>
//     type(timeout?:number):Promise<void>
//     simulate(cb:(el:Element) => Promise<void> | void):Promise<void>
//   }

//   // generate for each collection (same add context; i have not created a collection yet. to test this feature you have to)
//   interface IdAppNotImplementedYet extends Interactable<IdAppNotImplementedYet> {
//     // ...
//   }

//   // generate for each context
//   interface IdApp extends Interactable<IdApp> {
//     // generate for each handle
//     handle(name:'btn'):Interactable<IdApp>

//     // generate for each state
//     shouldNotHaveState(name:'on'):IdApp
//     shouldNotHaveState(name:'ton'):IdApp
//     shouldNotHaveState(name:'t2on'):IdApp
//     shouldNotHaveState(name:'t3on'):IdApp
//     shouldHaveState(name:'on'):IdApp
//     shouldHaveState(name:'ton', implemmetations:'imp1,imp2'):IdApp
//     shouldHaveState(name:'t2on'):IdApp
//     shouldHaveState(name:'t3on'):IdApp

//     // generate for each collection
//     collection(name:'not-implemented-yet'):IdAppNotImplementedYet
//   }

//   // static
//   interface Mount {
//     wait(ms:number):Promise<void>
//     unwrap():Element

//     // generate for each context
//     context(name:'App'):IdApp
//   }

//   // static
//   export function mount(el:any, config:any): Mount
//   export function clearMocks(): void
// }