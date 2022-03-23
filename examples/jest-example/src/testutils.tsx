// // // testutils.ts
// // import * as enzyme from 'enzyme'
// // import {wrap} from '@kaminrunde/firescout-enzyme'
// // import {Firescout} from './firescout.types.ts'

// // export default wrap<Firescout>(enzyme)


// // // in test
// // import {shallow} from './testutils'

// // const el = shallow(<App/>)

// // el.context('foo').handle('my-handle').shouldHaveState('foo')

// import { render, screen, fireEvent, act } from '@testing-library/react';

// export function mount (El:any, props:any) {
//   const component = render(<El {...props} />)
//   return wrap([component.container])
// }

// export function wrap(elements:Element[]) {
//   return {
//     context: (name:string) => {
//       const targets:Element[] = []
//       for(const el of elements) targets.push(...Array.from(el.querySelectorAll(`[data-cy-ctx="${name}"]`)))

//       if(targets.length === 0) {
//         throw new Error(`could not find context "${name}"`)
//       }

//       return wrap(targets)
//     },
//     handle: (name:string) => {
//       const targets:Element[] = []
//       for(const el of elements) targets.push(...Array.from(el.querySelectorAll(`[data-cy-handle="${name}"]`)))

//       if(targets.length === 0) {
//         throw new Error(`could not find handle "${name}"`)
//       }

//       return wrap(targets)
//     },
//     shouldHaveState: (name:string) => {
//       let target = null
//       for(const el of elements) {
//         const hit = el.querySelector(`[data-cy-state="${name}"]`)
//         if(!hit) continue
//         target = hit
//         break
//       }
//       if(!target) throw new Error(`expected to find state "${name}".`)
//     },
//     shouldNotHaveState: (name:string) => {
//       let target = null
//       for(const el of elements) {
//         const hit = el.querySelector(`[data-cy-state="${name}"]`)
//         if(!hit) continue
//         target = hit
//         break
//       }
//       if(target) throw new Error(`expected not to find state "${name}".`)
//     },
//     nth(n:number) {
//       if(!elements[n]) throw new Error(`"nth(${n})" does not work on a list of length ${elements.length}`)
//       return wrap([elements[n]])
//     },
//     click: (w?:number|string) => {
//       if(elements.length > 1) {
//         throw new Error(`found multiple elements to click.`)
//       }
//       fireEvent.click(elements[0])

//       if(typeof w !== 'undefined') {
//         if(typeof w === 'number') return act(() => new Promise(r => setTimeout(r, w)))
//       }

//       return wrap(elements)
//     },
//     wait: (ms:number) => {
//       return act(() => new Promise(r => setTimeout(r, ms)))
//     },
//     unwrap: () => {
//       if(elements.length > 1) {
//         throw new Error(`found multiple elements to unwrap.`)
//       }
//       return elements[0]
//     }
//   }
// }


// /**
//  * global
//  * - mount
//  * - getModule
//  * - act
//  * 
//  * methods:
//  * - click
//  * - type
//  * - unwrap
//  * - simulate
//  * - nth
//  */