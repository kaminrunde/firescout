var { transformSync } = require('@babel/core')
var plugin = require('.')

const transform = (code) =>
  transformSync(code, {
    presets: ['@babel/preset-react'],
    plugins: [plugin],
  }).code

test('removes "data-cy-ctx"', () => {
  const output = transform(`
    <div data-cy-ctx='organisms/Wishlist'>
      Hello World
    </div>
  `)
  expect(output).not.toContain('organisms/Wishlist')
})

test('removes "data-cy-state"', () => {
  const output = transform(`
    <div data-cy-state='state'>
      Hello World
    </div>
  `)
  expect(output).not.toContain('state')
})

test('removes "data-cy-handle"', () => {
  const output = transform(`
    <div data-cy-handle='handle'>
      Hello World
    </div>
  `)
  expect(output).not.toContain('handle')
})

test('removes "data-cy-collection"', () => {
  const output = transform(`
    <div data-cy-collection='collection'>
      Hello World
    </div>
  `)
  expect(output).not.toContain('collection')
})

test('removes "data-cy-handle-xy"', () => {
  const output = transform(`
    <div data-cy-handle-xy='handle'>
      Hello World
    </div>
  `)
  expect(output).not.toContain('handle')
})

test('removes conditional "data-cy-state"', () => {
  const output = transform(`
    <div data-cy-state={value && 'state'}>
      Hello World
    </div>
  `)
  expect(output).not.toContain('state')
})
