import * as utils from './test-utils'

describe('logs', () => {
  it('shows NO_DOCS when markdown is missing', async () => {
    const t = utils.create()

    t.addReactComponent('src/components/C1/C1.ts', {
      jsx: ['ctx', 'C1']
    })

    const result = await t.execute()

    expect(result).toContainLog('NO_DOCS', 'C1', 'src/components/C1/C1.ts')
  })

  it('shows NO_CTX_REF when no context was found for markdown', async () => {
    const t = utils.create()

    t.addMarkdown('src/components/C1/README.md', {
      type: 'component',
      name: 'C1',
    })

    const result = await t.execute()

    expect(result).toContainLog('NO_CTX_REF', 'C1', 'src/components/C1/README.md')
  })

  describe('HANDLE_WITHOUT_PARENT', () => {
    it('shows when same file does not have a data-cy-ctx', async () => {
      const t = utils.create()

      t.addReactComponent('src/components/C1/C1.ts', {
        jsx: ['handle', 'handle-1']
      })

      const result = await t.execute()

      expect(result).toContainLog('HANDLE_WITHOUT_PARENT', 'handle-1', 'src/components/C1/C1.ts')
    })

    it('does not show up when sibling file has a data-cy-ctx', async () => {
      const t = utils.create()

      t.addReactComponent('src/components/C1/C1.ts', {
        jsx: ['handle', 'handle-1']
      })

      t.addReactComponent('src/components/C1/Other.ts', {
        jsx: ['ctx', 'C1']
      })

      const result = await t.execute()

      expect(result).not.toContainLog('HANDLE_WITHOUT_PARENT')
    })

    it('does not show up when file has a data-cy-ctx', async () => {
      const t = utils.create()

      t.addReactComponent('src/components/C1/C1.ts', {
        jsx: ['ctx', 'C1', [
          ['handle', 'handle-1']
        ]]
      })

      t.addReactComponent('src/components/C1/Other.ts', {
        jsx: ['ctx', 'C1']
      })

      const result = await t.execute()

      expect(result).not.toContainLog('HANDLE_WITHOUT_PARENT')
    })
  })

  describe('STATE_WITHOUT_PARENT', () => {
    it('shows when same file does not have a data-cy-ctx', async () => {
      const t = utils.create()

      t.addReactComponent('src/components/C1/C1.ts', {
        jsx: ['state', 'state-1']
      })

      const result = await t.execute()

      expect(result).toContainLog('STATE_WITHOUT_PARENT', 'state-1', 'src/components/C1/C1.ts')
    })

    it('does not show up when sibling file has a data-cy-ctx', async () => {
      const t = utils.create()

      t.addReactComponent('src/components/C1/C1.ts', {
        jsx: ['state', 'state-1']
      })

      t.addReactComponent('src/components/C1/Other.ts', {
        jsx: ['ctx', 'C1']
      })

      const result = await t.execute()

      expect(result).not.toContainLog('STATE_WITHOUT_PARENT')
    })
  })

  describe('COLLECTION_WITHOUT_PARENT', () => {
    it('shows when same file does not have a data-cy-ctx', async () => {
      const t = utils.create()

      t.addReactComponent('src/components/C1/C1.ts', {
        jsx: ['col', 'col-1']
      })

      const result = await t.execute()

      expect(result).toContainLog('COLLECTION_WITHOUT_PARENT', 'col-1', 'src/components/C1/C1.ts')
    })

    it('does not show up when sibling file has a data-cy-ctx', async () => {
      const t = utils.create()

      t.addReactComponent('src/components/C1/C1.ts', {
        jsx: ['col', 'col-1']
      })

      t.addReactComponent('src/components/C1/Other.ts', {
        jsx: ['ctx', 'C1']
      })

      const result = await t.execute()

      expect(result).not.toContainLog('COLLECTION_WITHOUT_PARENT')
    })
  })

  describe('HANDLE_HAS_NO_DOCS', () => {
    it('shows when no corresponding README was found', async () => {
      const t = utils.create()

      t.addReactComponent('src/components/C1/C1.ts', {
        jsx: ['ctx', 'C1', [
          ['handle', 'handle-1']
        ]]
      })

      const result = await t.execute()

      expect(result).toContainLog('HANDLE_HAS_NO_DOCS', 'C1 -> handle-1', 'src/components/C1/C1.ts')
    })

    it('does not show up when corresponding README was found', async () => {
      const t = utils.create()
  
        t.addReactComponent('src/components/C1/C1.ts', {
          jsx: ['ctx', 'C1', [
            ['handle', 'handle-1']
          ]]
        })
  
        t.addMarkdown('src/components/C1/README.md', {
          type: 'component',
          name: 'C1',
          handles: [{name:'handle-1', description: ''}]
        })
  
        const result = await t.execute()
  
        expect(result).not.toContainLog('HANDLE_HAS_NO_DOCS')
        expect(result.logs).toHaveLength(0)
    })
  })

  describe('STATE_HAS_NO_DOCS', () => {
    it('shows when no corresponding README was found', async () => {
      const t = utils.create()

      t.addReactComponent('src/components/C1/C1.ts', {
        jsx: ['ctx', 'C1', [
          ['state', 'state-1']
        ]]
      })

      const result = await t.execute()

      expect(result).toContainLog('STATE_HAS_NO_DOCS', 'C1 -> state-1', 'src/components/C1/C1.ts')
    })

    it('does not show up when corresponding README was found', async () => {
      const t = utils.create()
  
        t.addReactComponent('src/components/C1/C1.ts', {
          jsx: ['ctx', 'C1', [
            ['state', 'state-1']
          ]]
        })
  
        t.addMarkdown('src/components/C1/README.md', {
          type: 'component',
          name: 'C1',
          states: [{name:'state-1', description: ''}]
        })
  
        const result = await t.execute()
  
        expect(result).not.toContainLog('STATE_HAS_NO_DOCS')
        expect(result.logs).toHaveLength(0)
    })
  })

  describe('HANDLE_HAS_NO_REF', () => {
    it('shows when only found in README', async () => {
      const t = utils.create()

      t.addMarkdown('src/components/C1/README.md', {
        type: 'component',
        name: 'C1',
        handles: [{name:'handle-1', description: ''}]
      })

      const result = await t.execute()

      expect(result).toContainLog('HANDLE_HAS_NO_REF', 'C1 -> handle-1', 'src/components/C1/README.md')
    })

    it('does not show up when corresponding README and Component was found', async () => {
      const t = utils.create()
  
        t.addReactComponent('src/components/C1/C1.ts', {
          jsx: ['ctx', 'C1', [
            ['handle', 'handle-1']
          ]]
        })
  
        t.addMarkdown('src/components/C1/README.md', {
          type: 'component',
          name: 'C1',
          handles: [{name:'handle-1', description: ''}]
        })
  
        const result = await t.execute()
  
        expect(result).not.toContainLog('HANDLE_HAS_NO_REF')
        expect(result.logs).toHaveLength(0)
    })
  })

  describe('STATE_HAS_NO_REF', () => {
    it('shows when only found in README', async () => {
      const t = utils.create()

      t.addMarkdown('src/components/C1/README.md', {
        type: 'component',
        name: 'C1',
        states: [{name:'state-1', description: ''}]
      })

      const result = await t.execute()

      expect(result).toContainLog('STATE_HAS_NO_REF', 'C1 -> state-1', 'src/components/C1/README.md')
    })

    it('does not show up when corresponding README and Component was found', async () => {
      const t = utils.create()
  
        t.addReactComponent('src/components/C1/C1.ts', {
          jsx: ['ctx', 'C1', [
            ['state', 'state-1']
          ]]
        })
  
        t.addMarkdown('src/components/C1/README.md', {
          type: 'component',
          name: 'C1',
          states: [{name:'state-1', description: ''}]
        })
  
        const result = await t.execute()
  
        expect(result).not.toContainLog('STATE_HAS_NO_REF')
        expect(result.logs).toHaveLength(0)
    })
  })

  describe('COLLECTION_HAS_NO_REF', () => {
    it.skip('shows when collection was only found in README', async () => {
      const t = utils.create()

      t.addReactComponent('src/components/C1/C1.ts', {
        jsx: ['ctx', 'C1']
      })

      t.addMarkdown('src/components/C1/README.md', {
        type: 'component',
        name: 'C1',
        collections: [{name:'collection-1', path: './Inner/README.md'}]
      })

      t.addMarkdown('src/components/C1/Inner/README.md', {
        type: 'collection',
        name: 'Collection-1',
      })

      const result = await t.execute()

      expect(result).toContainLog('COLLECTION_HAS_NO_REF', 'C1 -> collection-1', 'src/components/C1/README.md')
    })

    it('does not show up when corresponding README and Component was found', async () => {
      const t = utils.create()
  
        t.addReactComponent('src/components/C1/C1.ts', {
          jsx: ['ctx', 'C1', [
            ['col', 'col-1']
          ]]
        })
  
        t.addMarkdown('src/components/C1/README.md', {
          type: 'component',
          name: 'C1',
          collections: [{name:'col-1', path: ''}]
        })
  
        const result = await t.execute()
  
        expect(result).not.toContainLog('COLLECTION_HAS_NO_REF')
    })
  })

  describe('COLLECTION_HAS_NO_DOCS', () => {
    it.todo('shows when collection has no corresponding README')

    it.todo('does not show when collection has a corresponding README')
  })

})