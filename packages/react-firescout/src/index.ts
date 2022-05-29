import * as t from './types'
import * as utils from './utils'
import {getConfig} from '@kaminrunde/firescout-utils/lib/build-docs'
import * as matchers from './matchers'

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

export function mount(El: any, ctx: any) {
  const component = ctx.render(El)

  return wrap(
    [
      {
        container: component.container,
        // type: 'root',
        parent: null,
        index: 0,
      },
    ],
    ctx
  )
}

type MockConfig = {
  value?: any
  fixture?: string
  sync?: boolean
  timeout?: number
  transform?: (data: any) => any
}

export function getModule(moduleName: string) {
  const mock_path = getConfig().fixturesFolder
  // const mock_path = "/Users/manueljung/Documents/relax/firescout/examples/jest-example/firescout-mocks"
  return {
    var: (varName:string) => ({
      set(val:any) {
        window.firescoutVars = {
          ...window.firescoutVars,
          [moduleName + '.' + varName]: val
        }
      },
      async fixture(config: string | MockConfig) {
        const c: MockConfig = !config || typeof config === 'string' ? { fixture: config } : config

        let value = c.value
        if (!value) {
          let path = mock_path + '/' + moduleName + '/' + varName
          if (c.fixture && c.fixture !== 'default') path += '.' + c.fixture
          value = (await import(`${path}`)).default
        }

        if(c.transform) {
          const nvalue = c.transform(JSON.parse(JSON.stringify(value)))
          if(typeof value === 'object') for(const key in value) {
            if(typeof value[key] === 'function') nvalue[key] = value[key]
          }
        }

        if(typeof value === 'undefined') {
          utils.bubbleError(1, 'either mock data resolved undefined or you forgot to resolve value in "transform"')
        }

        window.firescoutVars = {
          ...window.firescoutVars,
          [moduleName + '.' + varName]: value
        }
      }
    }),
    fn: (fnName: string) => ({
      stub<Fn extends (...args: any) => any>(wrapper?: Fn) {
        if (!window.cymocks) window.cymocks = {}

        // @ts-expect-error
        if (!wrapper) wrapper = (cb: any): unknown => cb()
        // @ts-expect-error
        const cb = wrapper(() => null)

        window.cymocks[moduleName + '.' + fnName] = {
          cb: cb,
          type: 'stub',
        }
      },
      async mock<Fn extends (...args: any) => any>(config: string | MockConfig, wrapper?: Fn) {
        const c: MockConfig = !config || typeof config === 'string' ? { fixture: config } : config

        let value = c.value
        if (!value) {
          let path = mock_path + '/' + moduleName + '/' + fnName
          if (c.fixture && c.fixture !== 'default') path += '.' + c.fixture
          value = (await import(`${path}`)).default
        }

        if(c.transform) {
          const nvalue = c.transform(JSON.parse(JSON.stringify(value)))
          if(typeof value === 'object') for(const key in value) {
            if(typeof value[key] === 'function') nvalue[key] = value[key]
          }
          value = nvalue
        }

        if(typeof value === 'undefined') {
          utils.bubbleError(1, 'either mock data resolved undefined or you forgot to resolve value in "transform"')
        }

        if(value.__sync) c.sync = true

        if (!window.cymocks) window.cymocks = {}

        // @ts-expect-error
        if (!wrapper) wrapper = (cb: any): unknown => () => cb()

        // @ts-expect-error
        const cb = wrapper(
          c.sync
            ? () => value
            : async () => {
                if (c.timeout) await new Promise((r) => setTimeout(r, c.timeout))
                return value
              }
        )

        window.cymocks[moduleName + '.' + fnName] = {
          cb: cb,
          type: 'mock',
        }

        return cb as ReturnType<Fn>
      },
    }),
  }
}

export function clearMocks() {
  delete window.cymocks
  delete window.firescoutVars
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

interface Wrapped extends Matchers {
  context: (name: string) => Wrapped
  handle: (name: string) => Wrapped
  collection: (name: string) => Wrapped
  shouldHaveState: (name: string, implementations?: string) => Wrapped
  shouldNotHaveState: (name: string) => Wrapped
  nth: (n: number) => Wrapped
  wait: (ms: number) => Promise<void>
  unwrap: () => Element
  query: (s:string) => Wrapped
  click: (timeout?: number) => Promise<Wrapped>
  type: (value: string, timeout?: number) => Promise<Wrapped>
  simulate: (cb: (el: Element) => Promise<void> | void) => Promise<Wrapped>
}

function wrap(elements: t.FirescoutElement[], ctx: any): Wrapped {
  return {
    context: (name) => {
      const targets = utils.query(`[data-cy-ctx="${name}"]`, elements)

      if (targets.length === 0) {
        utils.bubbleError(2, `could not find context "${name}"`)
      }

      return wrap(targets, ctx)
    },

    handle: (name) => {
      const targets = utils.query(`[data-cy-handle="${name}"]`, elements)

      if (targets.length === 0) {
        utils.bubbleError(2, `could not find handle "${name}"`)
      }

      return wrap(targets, ctx)
    },

    collection: (name) => {
      const targets = utils.query(`[data-cy-collection="${name}"]`, elements)

      if (targets.length === 0) {
        utils.bubbleError(2, `could not find collection "${name}"`)
      }

      return wrap(targets, ctx)
    },

    query: (s) => {
      const targets = utils.query(s, elements)

      if (targets.length === 0) {
        utils.bubbleError(2, `could not find elements with selector "${s}"`)
      }

      return wrap(targets, ctx)
    },

    shouldHaveState: (name, implementations) => {
      if (elements.length > 1) {
        utils.bubbleError(2, `found multiple elements to test. please select with "nth(n)"`)
      }
      const imps = implementations ? implementations.split(',') : null
      const container = elements[0].container

      const query = (s:string) => [container, container.querySelector(s)].filter(el => el?.matches(s))[0]

      if (imps) {
        for (const key of imps) {
          const hit = query(`[data-cy-state="${name}:${key}"]`)
          if (!hit) utils.bubbleError(2, `expected to find state "${name}:${key}".`)
        }
      } else {
        const hit = query(`[data-cy-state="${name}"]`)
        if (!hit) utils.bubbleError(2, `expected to find state "${name}".`)
      }

      return wrap(elements, ctx)
    },

    shouldNotHaveState: (name) => {
      if (elements.length > 1) {
        utils.bubbleError(2, `found multiple elements to test. please select with "nth(n)"`)
      }
      const container = elements[0].container
      const query = (s:string) => [container, ...Array.from(container.querySelectorAll(s))].filter(el => el?.matches(s))
      const hits = query(`[data-cy-state]`)
      for (const hit of hits) {
        const state: string = (hit.attributes as any)['data-cy-state'].value
        if (state === name || state.startsWith(name + ':')) {
          utils.bubbleError(2, `expected not to find state "${state}".`)
        }
      }

      return wrap(elements, ctx)
    },

    // utils

    nth: (n) => {
      if (!elements[n]) {
        utils.bubbleError(2, `"nth(${n})" does not work on a list of length ${elements.length}`)
      }
      return wrap([elements[n]], ctx)
    },

    wait: (ms) => {
      return ctx.act(() => new Promise((r) => setTimeout(r, ms)))
    },

    unwrap: () => {
      if (elements.length > 1) {
        utils.bubbleError(2, `found multiple elements to unwrap. please select with "nth(n)"`)
      }
      return elements[0].container
    },

    // events

    click: async (w) => {
      if (elements.length > 1) {
        utils.bubbleError(2, `found multiple elements to click. Please use nth() to select one`)
      }
      ctx.fireEvent.click(elements[0].container)

      if (typeof w !== 'undefined') {
        if (typeof w === 'number') return ctx.act(() => new Promise((r) => setTimeout(r, w)))
      }

      return wrap(elements, ctx)
    },

    type: async (value, w) => {
      if (elements.length > 1) {
        utils.bubbleError(2, `found multiple elements to type. Please use nth() to select one`)
      }
      ctx.fireEvent.change(elements[0].container, { target: { value } })

      if (typeof w !== 'undefined') {
        if (typeof w === 'number') return ctx.act(() => new Promise((r) => setTimeout(r, w)))
      }

      return wrap(elements, ctx)
    },

    simulate: async (cb) => {
      if (elements.length > 1) {
        utils.bubbleError(
          2,
          `found multiple elements to simulate event. Please use nth(n) to select one`
        )
      }

      await cb(elements[0].container)

      return wrap(elements, ctx)
    },

    // MATCHERS

    should(m:string, arg1:any, arg2:any) {
      const node = elements[0].container
      if(m === 'have.length') {
        if(elements.length !== arg1) {
          utils.bubbleError(2, `expected elements to have length "${arg1}" but got "${elements.length}"`)
        }
        return
      }
      if(m === 'not.have.length') {
        if(elements.length === arg1) {
          utils.bubbleError(2, `expected elements not to have length "${arg1}"`)
        }
        return
      }
      if (elements.length > 1) {
        utils.bubbleError(
          2,
          `found multiple elements to test. Please use nth(n) to select one`
        )
      }
      switch(m) {
        case 'contain.text': {
          const e = matchers.containText(node, arg1, false)
          if(e) utils.bubbleError(2, e)
          break
        }
        case 'not.contain.text': {
          const e = matchers.containText(node, arg1, true)
          if(e) utils.bubbleError(2, e)
          break
        }
        case 'have.value': {
          const e = matchers.haveValue(node, arg1, false)
          if(e) utils.bubbleError(2, e)
          break
        }
        case 'not.have.value': {
          const e = matchers.haveValue(node, arg1, true)
          if(e) utils.bubbleError(2, e)
          break
        }
        case 'have.css': {
          const e = matchers.haveCss(node, arg1, arg2 as string, false)
          if(e) utils.bubbleError(2, e)
          break
        }
        case 'not.have.css': {
          const e = matchers.haveCss(node, arg1, arg2 as string, true)
          if(e) utils.bubbleError(2, e)
          break
        }
        default: utils.bubbleError(2, 'unknown matcher')
      }
    }
  }
}
