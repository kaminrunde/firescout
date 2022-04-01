var { transformSync } = require('@babel/core')
var plugin = require('.')

const transform = (code) =>
  transformSync(code, {
    presets: ['@babel/preset-react'],
    plugins: [plugin],
  }).code

describe('firescoutMockFn', () => {
  test('transforms declared arrow functions', () => {
    const output = transform(`
      /** @firescoutMockFn Config.config */
      const xy = test => { return test }
    `)
    expect(output).toMatchSnapshot()
  })

  test('transforms declared exported arrow functions', () => {
    const output = transform(`
      /** @firescoutMockFn Config.config */
      export const xy = test => { return test }
    `)
    expect(output).toMatchSnapshot()
  })

  test('transforms default exported arrow functions', () => {
    const output = transform(`
      /** @firescoutMockFn Config.config */
      export default test => { return test }
    `)
    expect(output).toMatchSnapshot()
  })

  test('transforms declared async arrow functions', () => {
    const output = transform(`
      /** @firescoutMockFn Config.config */
      const xy = async test => { return test }
    `)
    expect(output).toMatchSnapshot()
  })

  test('transforms arrow functions with non-block body', () => {
    const output = transform(`
      /** @firescoutMockFn Config.config */
      const xy = async test => 'foo'
    `)
    expect(output).toMatchSnapshot()
  })

  test('transforms functions', () => {
    const output = transform(`
      /** @firescoutMockFn Config.config */
      function xy (test) { return test }
    `)
    expect(output).toMatchSnapshot()
  })

  test('transforms exported functions', () => {
    const output = transform(`
      /** @firescoutMockFn Config.config */
      export function xy (test) { return test }
    `)
    expect(output).toMatchSnapshot()
  })

  test('transforms default exported functions', () => {
    const output = transform(`
      /** @firescoutMockFn Config.config */
      export default function xy (test) { return test }
    `)
    expect(output).toMatchSnapshot()
  })

  test('transforms default exported anonym functions', () => {
    const output = transform(`
      /** @firescoutMockFn Config.config */
      export default function (test) { return test }
    `)
    expect(output).toMatchSnapshot()
  })

  test('transforms async functions', () => {
    const output = transform(`
      /** @firescoutMockFn Config.config */
      async function xy (test) { return test }
    `)
    expect(output).toMatchSnapshot()
  })

  test('transforms function expressions', () => {
    const output = transform(`
      /** @firescoutMockFn Config.config */
      const xy = function xy (test) { return test }
    `)
    expect(output).toMatchSnapshot()
  })

  test('transforms function expressions', () => {
    const output = transform(`
      /** @firescoutMockFn Config.config */
      const xy = function (test) { return test }
    `)
    expect(output).toMatchSnapshot()
  })

  test('transforms named function expressions', () => {
    const output = transform(`
      /** @firescoutMockFn Config.config */
      const xy = function xy (test) { return test }
    `)
    expect(output).toMatchSnapshot()
  })

  test('transforms async function expressions', () => {
    const output = transform(`
      /** @firescoutMockFn Config.config */
      const xy = async function (test) { return test }
    `)
    expect(output).toMatchSnapshot()
  })

  test('transforms named exported function expressions', () => {
    const output = transform(`
      /** @firescoutMockFn Config.config */
      export const xy = function (test) { return test }
    `)
    expect(output).toMatchSnapshot()
  })

  test('transforms object properties', () => {
    const output = transform(`
      const xy = {
        /** @firescoutMockFn Config.config */
        fn: function () {return 'foo'}
      }
    `)
    console.log(output)
  })
})

describe('firescoutMockVar', () => {
  test('transforms declared variables', () => {
    const output = transform(`
      /** @firescoutMockVar Config.config */
      const xy = {foo:'bar'}
    `)
    expect(output).toMatchSnapshot()
  })

  test('tranforms object properties', () => {
    const output = transform(`
      const xy = {
        /** @firescoutMockVar Config.config */
        foo: 'bar'
      }
    `)
    expect(output).toMatchSnapshot()
  })
})
