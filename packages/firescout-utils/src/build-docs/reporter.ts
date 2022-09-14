import { RawItem } from './searchWithNode'
import colors from 'colors/safe'

export const codes = {
  // HANDLE_WITHOUT_PARENT: (item:RawItem) => `You declared a "data-cy-handle='${item.payload}'" `
  // + `in "${item.file}" but there was no parent found. You have define a "data-cy-ctx" in `
  // + `either the same file or `,
  HANDLE_WITHOUT_PARENT: (item: RawItem) => [item.payload, item.file],
  STATE_WITHOUT_PARENT: (item: RawItem) => [item.payload, item.file],
  COLLECTION_WITHOUT_PARENT: (item: RawItem) => [item.payload, item.file],
  HANDLE_HAS_NO_DOCS: (item: { name: string; file: string }) => [item.name, item.file],
  STATE_HAS_NO_DOCS: (item: { name: string; file: string }) => [item.name, item.file],
  HANDLE_HAS_NO_REF: (item: { name: string; file: string }) => [item.name, item.file],
  STATE_HAS_NO_REF: (item: { name: string; file: string }) => [item.name, item.file],
  NO_DOCS: (item: { name: string; file: string }) => [item.name, item.file],
  COLLECTION_HAS_NO_REF: (item: { name: string; file: string }) => [item.name, item.file],
  COLLECTION_HAS_NO_DOCS: (item: { name: string; file: string }) => [item.name, item.file],
  NO_CTX_REF: (item: { name: string; file: string }) => [item.name, item.file],
  STATE_IMPLEMENTATION_HAS_NO_REF: (item: { name: string; file: string }) => [item.name, item.file],
  STATE_IMPLEMENTATION_HAS_NO_DOCS: (item: { name: string; file: string }) => [
    item.name,
    item.file,
  ],
  MIXED_STATES_AND_IMPLEMENTATIONS: (item: { name: string; file: string }) => [
    item.name,
    item.file,
  ],
}

export function report(code: 'HANDLE_WITHOUT_PARENT', item: RawItem): void
export function report(code: 'STATE_WITHOUT_PARENT', item: RawItem): void
export function report(code: 'COLLECTION_WITHOUT_PARENT', item: RawItem): void
export function report(code: 'HANDLE_HAS_NO_DOCS', item: { name: string; file: string }): void
export function report(code: 'STATE_HAS_NO_DOCS', item: { name: string; file: string }): void
export function report(code: 'HANDLE_HAS_NO_REF', item: { name: string; file: string }): void
export function report(code: 'STATE_HAS_NO_REF', item: { name: string; file: string }): void
export function report(code: 'NO_DOCS', item: { name: string; file: string }): void
export function report(code: 'NO_CTX_REF', item: { name: string; file: string }): void
export function report(code: 'COLLECTION_HAS_NO_REF', item: { name: string; file: string }): void
export function report(code: 'COLLECTION_HAS_NO_DOCS', item: { name: string; file: string }): void
export function report(
  code: 'STATE_IMPLEMENTATION_HAS_NO_REF',
  item: { name: string; file: string }
): void
export function report(
  code: 'STATE_IMPLEMENTATION_HAS_NO_DOCS',
  item: { name: string; file: string }
): void
export function report(
  code: 'MIXED_STATES_AND_IMPLEMENTATIONS',
  item: { name: string; file: string }
): void
export function report(code: keyof typeof codes, ctx: any) {
  const [name, file] = codes[code](ctx)
  console.log(colors.yellow(code), colors.green(name), colors.grey(file.slice(1)))
}
