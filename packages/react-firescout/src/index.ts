
declare namespace Firescout {
  export interface FireModule {
    getModule(name:unknown):any
  }
}


type FirescoutElement = {
  parent: null | FirescoutElement
  container: Element
  type: 'context' | 'handle' | 'collection' | 'root'
  index: number
}

declare global {
  interface Window {
    cymocks?: {[name:string]: {
      type: 'stub' | 'mock',
      cb: Function,
    }},
    firescoutVars?: {[name:string]: any}
  }
}

export function mount (El:any, ctx:any) {
  const component = ctx.render(El)

  return wrap([{
    container: component.container,
    type: 'root',
    parent: null,
    index: 0
  }], ctx)
}

export const fn:Firescout.FireModule['getModule'] = name => {

}

export function getModule (name:string) {
  return {
    fn: (name:string) => ({
      stub() {

      },
      mock(config: string | {
        value?: any
        fixture?: string
        sync?: boolean
        timeout?: number
      }) {

      }
    }),
  }
}

export function clearMocks () {
  delete window.cymocks
  delete window.firescoutVars
}

function wrap (elements:FirescoutElement[], ctx:any) {
  return {
    context: (name:string) => {
      const targets:FirescoutElement[] = []
      for(const el of elements) targets.push(
        ...Array.from(el.container.querySelectorAll(`[data-cy-ctx="${name}"]`))
          .map((container, index) => ({container, parent: el, type: 'context' as 'context', index}))
      )

      if(targets.length === 0) {
        throw new Error(`could not find context "${name}"`)
      }

      return wrap(targets, ctx) as ReturnType<typeof wrap>
    },
    
    handle: (name:string) => {
      const targets:FirescoutElement[] = []
      for(const el of elements) targets.push(
        ...Array.from(el.container.querySelectorAll(`[data-cy-handle="${name}"]`))
          .map((container, index) => ({container, parent: el, type: 'handle' as 'handle', index}))
      )

      if(targets.length === 0) {
        throw new Error(`could not find handle "${name}"`)
      }

      return wrap(targets, ctx)
    },

    collection: (name:string) => {
      const targets:FirescoutElement[] = []
      for(const el of elements) targets.push(
        ...Array.from(el.container.querySelectorAll(`[data-cy-collection="${name}"]`))
          .map((container, index) => ({container, parent: el, type: 'collection' as 'collection', index}))
      )

      if(targets.length === 0) {
        throw new Error(`could not find collection "${name}"`)
      }

      return wrap(targets, ctx)
    },

    shouldHaveState: (name:string) => {
      let target = null
      for(const el of elements) {
        const hit = el.container.querySelector(`[data-cy-state="${name}"]`)
        if(!hit) continue
        target = hit
        break
      }
      if(!target) throw new Error(`expected to find state "${name}".`)
    },

    shouldNotHaveState: (name:string) => {
      let target = null
      for(const el of elements) {
        const hit = el.container.querySelector(`[data-cy-state="${name}"]`)
        if(!hit) continue
        target = hit
        break
      }
      if(target) throw new Error(`expected not to find state "${name}".`)
    },

    // utils

    nth(n:number) {
      if(!elements[n]) throw new Error(`"nth(${n})" does not work on a list of length ${elements.length}`)
      return wrap([elements[n]], ctx)
    },

    wait: (ms:number) => {
      return ctx.act(() => new Promise(r => setTimeout(r, ms)))
    },

    unwrap: () => {
      if(elements.length > 1) {
        throw new Error(`found multiple elements to unwrap.`)
      }
      return elements[0].container
    },

    // events

    click: async (w?:number|string) => {
      if(elements.length > 1) {
        throw new Error(`found multiple elements to click. Please use nth() to select one`)
      }
      ctx.fireEvent.click(elements[0].container)

      if(typeof w !== 'undefined') {
        if(typeof w === 'number') return ctx.act(() => new Promise(r => setTimeout(r, w)))
      }

      return wrap(elements, ctx)
    },

    simulate: async (cb:(el:Element) => Promise<void> | void) => {
      if(elements.length > 1) {
        throw new Error(`found multiple elements to simulate event. Please use nth() to select one`)
      }

      await cb(elements[0].container)

      return wrap(elements, ctx)
    }
  }
}
