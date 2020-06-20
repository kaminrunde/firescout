import {RawItem as GrepRawItem} from './searchWithGrep'
import {RawItem as NodeRawItem} from './searchWithNode'

type RawItem = GrepRawItem | NodeRawItem

const codes = {
  // HANDLE_WITHOUT_PARENT: (item:RawItem) => `You declared a "data-cy-handle='${item.payload}'" `
  // + `in "${item.file}" but there was no parent found. You have define a "data-cy-ctx" in `
  // + `either the same file or `,
  HANDLE_WITHOUT_PARENT: (item:RawItem) => item.file,
  STATE_WITHOUT_PARENT: (item:RawItem) => item.file,
  COLLECTION_WITHOUT_PARENT: (item:RawItem) => item.file,
}

export function report(code:'HANDLE_WITHOUT_PARENT', item:RawItem):void
export function report(code:'STATE_WITHOUT_PARENT', item:RawItem):void
export function report(code:'COLLECTION_WITHOUT_PARENT', item:RawItem):void
export function report (code:keyof typeof codes, ctx:any) {
  console.log(code, codes[code](ctx))
}