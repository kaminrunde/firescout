import * as t from './types'
import * as utils from './utils'

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


type MockConfig = {
  value?: any
  fixture?: string
  sync?: boolean
  timeout?: number
  transform?: (data:any) => any
}

export function getModule (moduleName:string) {
  const mock_path = "/Users/manueljung/Documents/relax/firescout/examples/jest-example/firescout-mocks"
  return {
    fn: (fnName:string) => ({
      stub<Fn extends (...args: any) => any>(wrapper?:Fn) {
        if(!window.cymocks) window.cymocks = {}

        // @ts-expect-error
        if(!wrapper) wrapper = (cb:any):unknown => cb()
        // @ts-expect-error
        const cb = wrapper(() => null)
        
        window.cymocks[moduleName + '.' + fnName] = {
          cb: cb,
          type: 'stub'
        }
      },
      async mock<Fn extends (...args: any) => any>(config: string | MockConfig, wrapper?:Fn) {
        const c:MockConfig = (!config || typeof config === 'string')
          ? {fixture:config}
          : config
          
        let value = c.value
        if(!value) {
          let path = mock_path + '/' + moduleName + '/' + fnName
          if(c.fixture && c.fixture !== 'default') path += '.' + c.fixture
          value = (await import(`${path}`)).default
        }
        
        if(!window.cymocks) window.cymocks = {}

        // @ts-expect-error
        if(!wrapper) wrapper = (cb:any):unknown => cb()

        // @ts-expect-error
        const cb = wrapper(c.sync 
          ? () => value
          : async () => {
            if(c.timeout) await new Promise(r => setTimeout(r,c.timeout))
            return value
          })
        
        window.cymocks[moduleName + '.' + fnName] = {
          cb: cb,
          type: 'mock'
        }

        return cb as ReturnType<Fn>
      }
    }),
  }
}

export function clearMocks () {
  delete window.cymocks
  delete window.firescoutVars
}

function wrap (elements:t.FirescoutElement[], ctx:any) {
  return {
    context: (name:string) => {
      const targets = utils.query(`[data-cy-ctx="${name}"]`, elements)

      if(targets.length === 0) {
        utils.bubbleError(2, `could not find context "${name}"`)
      }

      return wrap(targets, ctx)
    },
    
    handle: (name:string) => {
      const targets = utils.query(`[data-cy-handle="${name}"]`, elements)

      if(targets.length === 0) {
        utils.bubbleError(2, `could not find handle "${name}"`)
      }

      return wrap(targets, ctx)
    },

    collection: (name:string) => {
      const targets:t.FirescoutElement[] = []
      for(const el of elements) targets.push(
        ...Array.from(el.container.querySelectorAll(`[data-cy-collection="${name}"]`))
          .map((container, index) => ({container, parent: el, type: 'collection' as 'collection', index}))
      )

      if(targets.length === 0) {
        utils.bubbleError(2, `could not find collection "${name}"`)
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
      if(!target) {
        utils.bubbleError(2, `expected to find state "${name}".`)
      }
    },

    shouldNotHaveState: (name:string) => {
      let target = null
      for(const el of elements) {
        const hit = el.container.querySelector(`[data-cy-state="${name}"]`)
        if(!hit) continue
        target = hit
        break
      }
      if(target) {
        utils.bubbleError(2, `expected not to find state "${name}".`)
      }
    },

    // utils

    nth(n:number) {
      if(!elements[n]) {
        utils.bubbleError(2, `"nth(${n})" does not work on a list of length ${elements.length}`)
      }
      return wrap([elements[n]], ctx)
    },

    wait: (ms:number) => {
      return ctx.act(() => new Promise(r => setTimeout(r, ms)))
    },

    unwrap: () => {
      if(elements.length > 1) {
        utils.bubbleError(2, `found multiple elements to unwrap.`)
      }
      return elements[0].container
    },

    // events

    click: async (w?:number) => {
      if(elements.length > 1) {
        utils.bubbleError(2, `found multiple elements to click. Please use nth() to select one`)
      }
      ctx.fireEvent.click(elements[0].container)

      if(typeof w !== 'undefined') {
        if(typeof w === 'number') return ctx.act(() => new Promise(r => setTimeout(r, w)))
      }

      return wrap(elements, ctx)
    },

    simulate: async (cb:(el:Element) => Promise<void> | void) => {
      if(elements.length > 1) {
        utils.bubbleError(2, `found multiple elements to simulate event. Please use nth() to select one`)
      }

      await cb(elements[0].container)

      return wrap(elements, ctx)
    }
  }
}
