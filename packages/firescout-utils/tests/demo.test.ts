import * as utils from './test-utils'

describe('test', () => {
  it('works', async () => {
    const t = utils.create()

    t.addMarkdown('src/components/C1/README.md', {
      type: 'component',
      name: 'C1',
    })

    t.addReactComponent('src/components/C1/C1.ts', {
      jsx: ['ctx', 'C2']
    })

    const result = await t.execute()

    expect(result).toContainLog('NO_DOCS', 'C1')
  })
})