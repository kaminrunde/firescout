import {createOutput} from './testHelper'


const e:any = expect

describe('tree', () => {

  test('all contexts should be added', async () => {
    const files = {
      'widgets/Component1/Component1.ts': `
        data-cy-ctx="c/Component1"
      `,
      'widgets/Component2/Component2.ts': `
        data-cy-ctx="c/Component2"
      `,
    }

    const {tree} = await createOutput(files)

    e(tree.length).toBe(2)

    e(tree[0]).toEqual({
      context: 'c/Component1',
      typesaveContext: 'CComponent1',
      file: 'widgets/Component1/Component1.ts',
      folder: 'widgets/Component1',
      handles: [],
      states: [],
      collections: []
    })

    e(tree[1]).toEqual({
      context: 'c/Component2',
      typesaveContext: 'CComponent2',
      file: 'widgets/Component2/Component2.ts',
      folder: 'widgets/Component2',
      handles: [],
      states: [],
      collections: []
    })
  })

  test('handles are added to correct context', async () => {
    const files = {
      'widgets/Component1/Component1.ts': `
        data-cy-ctx="c/Component1"
          data-cy-handle='handle-1'
      `,
      'widgets/Component2/Component2.ts': `
        data-cy-ctx="c/Component2"
          data-cy-handle='handle-2'
      `,
    }

    const {tree} = await createOutput(files)

    e(tree[0].handles).toEqual([{
      name: 'handle-1', 
      file: 'widgets/Component1/Component1.ts'
    }])

    e(tree[1].handles).toEqual([{
      name: 'handle-2', 
      file: 'widgets/Component2/Component2.ts'
    }])
  })

  test('handles do not have to be in the same file', async () => {
    const files = {
      'widgets/Component1/Component1.ts': `
        data-cy-ctx="c/Component1"
          data-cy-handle='handle-1'
      `,
      'widgets/Component1/Component2.ts': `
        data-cy-handle='handle-2'
      `,
      'widgets/Component1/Component3/Component3.ts': `
        data-cy-handle='handle-3'
      `,
      'widgets/Component2/Component2.ts': `
        data-cy-handle='handle-4'
      `,
    }

    const {tree} = await createOutput(files)

    e(tree[0].handles[0]).toEqual({
      name: 'handle-1', 
      file: 'widgets/Component1/Component1.ts'
    })
    e(tree[0].handles[1]).toEqual({
      name: 'handle-2', 
      file: 'widgets/Component1/Component2.ts'
    })
    e(tree[0].handles[2]).toEqual({
      name: 'handle-3', 
      file: 'widgets/Component1/Component3/Component3.ts'
    })
  })

  test('handle is added to collection', async () => {
    const files = {
      'widgets/Component1/Component1.ts': `
        data-cy-ctx="c/Component1"
      `,
      'widgets/Component1/Inner.ts': `
        data-cy-collection="Inner"
          data-cy-handle='handle-1'
      `,
    }

    const {tree} = await createOutput(files)

    e(tree[0].handles.length).toBe(0)
    e(tree[0].collections[0]).toBeDefined()
    e(tree[0].collections[0].handles[0]).toEqual({
      name: 'handle-1', 
      file: 'widgets/Component1/Inner.ts'
    })
  })

  test('can have multiple nested collections', async () => {
    const files = {
      'widgets/Component1/Component1.ts': `
        data-cy-ctx="c/Component1"
      `,
      'widgets/Component1/A/A.ts': `
        data-cy-collection="A"
          data-cy-state='state-1'
      `,
      'widgets/Component1/A/B/B.ts': `
        data-cy-collection="B"
          data-cy-state='state-2'
      `,
    }

    const {tree} = await createOutput(files)

    console.log(tree[0].collections)

    e(tree[0].collections.length).toBe(1)
    e(tree[0].collections[0].collections.length).toBe(1)
    e(tree[0].collections[0].states.length).toBe(1)
    e(tree[0].collections[0].collections[0].states.length).toBe(1)
    e(tree[0].collections[0].states[0]).toEqual({
      name: 'state-1', 
      file: 'widgets/Component1/A/A.ts'
    })
    e(tree[0].collections[0].collections[0].states[0]).toEqual({
      name: 'state-2', 
      file: 'widgets/Component1/A/B/B.ts'
    })
  })
})
