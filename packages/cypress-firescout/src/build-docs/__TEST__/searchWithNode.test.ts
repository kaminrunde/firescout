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

    const {tree,content} = await createOutput(files)
  })
  
  test.skip('foo', async () => {
    const files = {
      'widgets/Component1/Component1.ts': `
        data-cy-ctx="c/Component1"
          data-cy-handle="handle-1"
      `,
      'widgets/Component1/Inner1.ts': `
        data-cy-state="state-1"
      `,
      'widgets/Component1/Component1.md': `
        <!-- firescout-component -->
        # c/Component1
        
        ## Handles
        - **handle-1**: foo
        
        ## States
        - **state-1**: foo
      `
    }
    const {tree,docs,modules,content,warnings} = await createOutput(files)
    // console.log(warnings)
  })
})
