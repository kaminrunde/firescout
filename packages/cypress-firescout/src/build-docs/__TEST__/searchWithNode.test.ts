import {setup,createOutput} from './testHelper'


const e:any = expect

function sum(a:any, b:any) {
  return a + b;
}

// test('adds 1 + 2 to equal 3', () => {
//   e(sum(1, 2)).toBe(3)
// });

describe('foo-bar', () => {
  beforeEach(setup)
  
  test('foo', async () => {
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
    try {
      await createOutput(files)
    }
    catch(e){
      console.log(e)
    }
    e(sum(1, 2)).toBe(3)
    // const {tree,docs,modules,file} = await createOutput(files)
  })
})
