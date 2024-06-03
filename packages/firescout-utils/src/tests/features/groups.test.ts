import * as utils from '../test-utils'

describe('(feature) grouped handles/states', () => {
  it.only('can add create a grouped state', async () => {
    const t = utils.create()

    t.addFile('src/components/C1/C1.ts', `
      <div data-cy-ctx='C1'>
        <div data-cy-state='visible:item1'/>
        <div data-cy-state='visible:item2'/>
      </div>
    `)

    const result = await t.execute()
    const c1 = result.getComponent('C1')
    expect(c1.states).toHaveLength(1)
    const visibleState = c1.states[0]

    expect(visibleState.name).toBe('visible')
    expect(visibleState.implementations).toHaveLength(2)
    expect(visibleState.implementations![0]).toEqual({
      name: 'item1',
      file: 'src/components/C1/C1.ts'
    })
  })

  it.todo('can add a prefix like "data-cy-myname-handle"')
})