
/* eslint-disable */
declare module '@kaminrunde/react-firescout' {

type Func = (...args: any) => any
type MockConfig = {
  value?: any
  fixture?: string
  sync?: boolean
  timeout?: number
  transform?: (data: any) => any
}

interface Matchers {
  should(m:'contain.text', s:string, x?:never):void
  should(m:'not.contain.text', s:string, x?:never):void
  should(m:'have.value', s:string, x?:never):void
  should(m:'not.have.value', s:string, x?:never):void
  should(m:'have.css', key:string, val:string):void
  should(m:'not.have.css', key:string, val:string):void
  should(m:'have.length', n:number, x?:never):void
  should(m:'not.have.length', n:number, x?:never):void
}

interface IdAppfetchData {
    
      mock<Wrapper extends Func>(config: MockConfig, wrapper?: Wrapper): Promise<ReturnType<Wrapper>>
      stub<Wrapper extends Func>(wrapper?: Wrapper): Promise<ReturnType<Wrapper>>
  }
  
  interface IdApp {
    
    /**
     * @name fetchData
     * @file [/src/App.tsx](/Users/manueljung/Documents/kaminrunde/firescout/examples/jest-example/src/App.tsx)
     */
    fn(name:'fetchData'):IdAppfetchData
  
}


  interface IdApp {
    
  }




export function getModule (name: 'App'):IdApp


interface Interactable<Root> extends Matchers {
  unwrap():Element
  nth(n:number):Root
  click(timeout?:number):Promise<void>
  type(val:string, timeout?:number):Promise<void>
  simulate(cb:(el:Element) => Promise<void> | void):Promise<void>
  query: (s:string) => Interactable<unknown>
}

interface IdAppIdInner extends Interactable<IdAppIdInner> {
       /** 
        * Click on it and see the secret text
        * @name open-inner-secret
        * @file [/src/Inner/Inner.tsx](/Users/manueljung/Documents/kaminrunde/firescout/examples/jest-example/src/Inner/Inner.tsx)
        */
        handle(name:'open-inner-secret', index?:number|string): Interactable<IdAppIdInner>

      /** 
        * Oops! the secret is visible!
        * @name inner-secret-visible
        * @file [/src/Inner/Inner.tsx](/Users/manueljung/Documents/kaminrunde/firescout/examples/jest-example/src/Inner/Inner.tsx)
        */
        shouldHaveState( name:'inner-secret-visible' ): IdAppIdInner
          
        /** 
        * Oops! the secret is visible!
        * @name inner-secret-visible
        * @file [/src/Inner/Inner.tsx](/Users/manueljung/Documents/kaminrunde/firescout/examples/jest-example/src/Inner/Inner.tsx)
        */
        shouldNotHaveState(name:'inner-secret-visible'): IdAppIdInner

        
          collection(name:"InnerInner"):IdInnerIdInnerInner
        
    }

    interface IdApp extends Interactable<IdApp> {
      /**
      * 
Just a another small component to test firescout
      * @name Inner
      * @file [/src/Inner/Inner.tsx](/Users/manueljung/Documents/kaminrunde/firescout/examples/jest-example/src/Inner/Inner.tsx)
      * @docs_file [/src/README.md](/Users/manueljung/Documents/kaminrunde/firescout/examples/jest-example/src/README.md)
      */
      collection(name:'Inner', index?:number|string): IdAppIdInner
      

    /** 
        * test
        * @name btn
        * @file [/src/App.tsx](/Users/manueljung/Documents/kaminrunde/firescout/examples/jest-example/src/App.tsx)
        */
        handle(name:'btn', index?:number|string): Interactable<IdApp>
    

      /** 
        * test
        * @name on
        * @file [/src/App.tsx](/Users/manueljung/Documents/kaminrunde/firescout/examples/jest-example/src/App.tsx) 
        */
        shouldHaveState( name:'on' ): IdApp

    /** 
    * test
    * @name on
    * @file [/src/App.tsx](/Users/manueljung/Documents/kaminrunde/firescout/examples/jest-example/src/App.tsx)
    */
    shouldNotHaveState(name:'on'): IdApp
    ,  /** 
        * test
        * @name ton
        * @file [null](/Users/manueljung/Documents/kaminrunde/firescout/examples/jest-examplenull) 
        * @implementations 
        * - imp1 [(/src/App.tsx)](/Users/manueljung/Documents/kaminrunde/firescout/examples/jest-example/src/App.tsx): test
        * - imp2 [(/src/App.tsx)](/Users/manueljung/Documents/kaminrunde/firescout/examples/jest-example/src/App.tsx): test
        */
        shouldHaveState( name:'ton' , implementations: 'imp1,imp2'): IdApp

    /** 
    * test
    * @name ton
    * @file [null](/Users/manueljung/Documents/kaminrunde/firescout/examples/jest-examplenull)
    */
    shouldNotHaveState(name:'ton'): IdApp
    ,  /** 
        * test
        * @name t2on
        * @file [/src/App.tsx](/Users/manueljung/Documents/kaminrunde/firescout/examples/jest-example/src/App.tsx) 
        */
        shouldHaveState( name:'t2on' ): IdApp

    /** 
    * test
    * @name t2on
    * @file [/src/App.tsx](/Users/manueljung/Documents/kaminrunde/firescout/examples/jest-example/src/App.tsx)
    */
    shouldNotHaveState(name:'t2on'): IdApp
    ,  /** 
        * test
        * @name t3on
        * @file [/src/App.tsx](/Users/manueljung/Documents/kaminrunde/firescout/examples/jest-example/src/App.tsx) 
        */
        shouldHaveState( name:'t3on' ): IdApp

    /** 
    * test
    * @name t3on
    * @file [/src/App.tsx](/Users/manueljung/Documents/kaminrunde/firescout/examples/jest-example/src/App.tsx)
    */
    shouldNotHaveState(name:'t3on'): IdApp
    }
    interface IdInnerIdInnerInner extends Interactable<IdInnerIdInnerInner> {
       /** 
        * 
        * @name open-inner-secret
        * @file [/src/Inner/InnerInner/InnerInner.tsx](/Users/manueljung/Documents/kaminrunde/firescout/examples/jest-example/src/Inner/InnerInner/InnerInner.tsx)
        */
        handle(name:'open-inner-secret', index?:number|string): Interactable<IdInnerIdInnerInner>

      /** 
        * 
        * @name inner-secret-visible
        * @file [/src/Inner/InnerInner/InnerInner.tsx](/Users/manueljung/Documents/kaminrunde/firescout/examples/jest-example/src/Inner/InnerInner/InnerInner.tsx)
        */
        shouldHaveState( name:'inner-secret-visible' ): IdInnerIdInnerInner
          
        /** 
        * 
        * @name inner-secret-visible
        * @file [/src/Inner/InnerInner/InnerInner.tsx](/Users/manueljung/Documents/kaminrunde/firescout/examples/jest-example/src/Inner/InnerInner/InnerInner.tsx)
        */
        shouldNotHaveState(name:'inner-secret-visible'): IdInnerIdInnerInner

        
    }

    interface IdInner extends Interactable<IdInner> {
      /**
      * ...
      * @name InnerInner
      * @file [/src/Inner/InnerInner/InnerInner.tsx](/Users/manueljung/Documents/kaminrunde/firescout/examples/jest-example/src/Inner/InnerInner/InnerInner.tsx)
      * @docs_file -
      */
      collection(name:'InnerInner', index?:number|string): IdInnerIdInnerInner
      

    /** 
        * 
        * @name open-inner-secret
        * @file [/src/Inner/Inner.tsx](/Users/manueljung/Documents/kaminrunde/firescout/examples/jest-example/src/Inner/Inner.tsx)
        */
        handle(name:'open-inner-secret', index?:number|string): Interactable<IdInner>
    

      /** 
        * 
        * @name inner-secret-visible
        * @file [/src/Inner/Inner.tsx](/Users/manueljung/Documents/kaminrunde/firescout/examples/jest-example/src/Inner/Inner.tsx) 
        */
        shouldHaveState( name:'inner-secret-visible' ): IdInner

    /** 
    * 
    * @name inner-secret-visible
    * @file [/src/Inner/Inner.tsx](/Users/manueljung/Documents/kaminrunde/firescout/examples/jest-example/src/Inner/Inner.tsx)
    */
    shouldNotHaveState(name:'inner-secret-visible'): IdInner
    }
    

    interface IdInnerInner extends Interactable<IdInnerInner> {
    

    /** 
        * 
        * @name open-inner-secret
        * @file [/src/Inner/InnerInner/InnerInner.tsx](/Users/manueljung/Documents/kaminrunde/firescout/examples/jest-example/src/Inner/InnerInner/InnerInner.tsx)
        */
        handle(name:'open-inner-secret', index?:number|string): Interactable<IdInnerInner>
    

      /** 
        * 
        * @name inner-secret-visible
        * @file [/src/Inner/InnerInner/InnerInner.tsx](/Users/manueljung/Documents/kaminrunde/firescout/examples/jest-example/src/Inner/InnerInner/InnerInner.tsx) 
        */
        shouldHaveState( name:'inner-secret-visible' ): IdInnerInner

    /** 
    * 
    * @name inner-secret-visible
    * @file [/src/Inner/InnerInner/InnerInner.tsx](/Users/manueljung/Documents/kaminrunde/firescout/examples/jest-example/src/Inner/InnerInner/InnerInner.tsx)
    */
    shouldNotHaveState(name:'inner-secret-visible'): IdInnerInner
    }
    
    
    
    

interface Mount {
  wait(ms:number):Promise<void>
  unwrap():Element

   
    /**
    * 
  * @name App
    * @file [/src](/Users/manueljung/Documents/kaminrunde/firescout/examples/jest-example/src/App.tsx)
    * @docs_file [/src/README.md](/Users/manueljung/Documents/kaminrunde/firescout/examples/jest-example/src/README.md)
    */
    context (name:'App'):IdApp
  
  }

  export function mount(el:any, config:any): Mount
  export function clearMocks(): void

  export type Context = "App"
  }