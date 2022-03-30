
  type Func = (...args: any) => any

  export function getModule (name: 'App'):IdApp

  interface IdAppfetchData {
    mock<Wrapper extends Func>(name: 'default', wrapper?: Wrapper): Promise<ReturnType<Wrapper>>
    stub<Wrapper extends Func>(wrapper?: Wrapper): Promise<ReturnType<Wrapper>>
  }

  export function getModule (name: 'App'):IdApp

  interface Interactable<Root> {
    unwrap():Element
    nth(n:number):Root
    click(timeout?:number):Promise<void>
    type(timeout?:number):Promise<void>
    simulate(cb:(el:Element) => Promise<void> | void):Promise<void>
  }

  
  

  interface IdApp extends Interactable<IdApp> {
  
  /** 
  * test
  * @name btn
  * @file [/src/App.tsx](/Users/paul/Desktop/firescout/examples/jest-example/src/App.tsx)
  */
  handle(name:'btn', index?:number|string): Interactable<IdApp>
  

    /** 
  * test
  * @name on
  * @file [/src/App.tsx](/Users/paul/Desktop/firescout/examples/jest-example/src/App.tsx) 
  */
  shouldHaveState( name:'on' ): IdApp
  
  /** 
  * test
  * @name on
  * @file [/src/App.tsx](/Users/paul/Desktop/firescout/examples/jest-example/src/App.tsx)
  */
  shouldNotHaveState(name:'on'): IdApp
  
  /** 
  * test
  * @name ton
  * @file [null](/Users/paul/Desktop/firescout/examples/jest-examplenull) 
  * @implementations 
  * - imp1 [(/src/App.tsx)](/Users/paul/Desktop/firescout/examples/jest-example/src/App.tsx): undefined
  * - imp2 [(/src/App.tsx)](/Users/paul/Desktop/firescout/examples/jest-example/src/App.tsx): undefined
  */
  shouldHaveState( name:'ton' , implementations: 'imp1,imp2'): IdApp
  
  /** 
  * test
  * @name ton
  * @file [null](/Users/paul/Desktop/firescout/examples/jest-examplenull)
  */
  shouldNotHaveState(name:'ton'): IdApp
  
  /** 
  * test
  * @name t2on
  * @file [/src/App.tsx](/Users/paul/Desktop/firescout/examples/jest-example/src/App.tsx) 
  */
  shouldHaveState( name:'t2on' ): IdApp
  
  /** 
  * test
  * @name t2on
  * @file [/src/App.tsx](/Users/paul/Desktop/firescout/examples/jest-example/src/App.tsx)
  */
  shouldNotHaveState(name:'t2on'): IdApp
  
  /** 
  * test
  * @name t3on
  * @file [/src/App.tsx](/Users/paul/Desktop/firescout/examples/jest-example/src/App.tsx) 
  */
  shouldHaveState( name:'t3on' ): IdApp
  
  /** 
  * test
  * @name t3on
  * @file [/src/App.tsx](/Users/paul/Desktop/firescout/examples/jest-example/src/App.tsx)
  */
  shouldNotHaveState(name:'t3on'): IdApp
  
  }
  
  
  interface Mount {
    wait(ms:number):Promise<void>
    unwrap():Element

  }

  export function mount(el:any, config:any): Mount
  export function clearMocks(): void

