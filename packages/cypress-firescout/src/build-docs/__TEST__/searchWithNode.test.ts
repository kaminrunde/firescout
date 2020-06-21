import {createOutput} from './testHelper'


const e:any = expect

describe('tree', () => {

  test('all contexts should be added', async () => {
    const files = {
      'widgets/Component1/Component1.ts': `
        data-cy-ctx="c/Component1"
      `,
      'widgets/Component2/Component2.ts': `
        data-cy-ctx="c/Component2",
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

  
})
