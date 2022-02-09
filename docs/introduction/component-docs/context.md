# Context

Firescout works really well with extremly large apps. Here are a lot of components you want to document. The `Context` acts like a namespace for your component. But what is a component?

## What is a Firescout-Component

What a firescout-component is, is entirely up to you! You could create a seperate context for each component file, but that would lead to a lot of contexts. I normally break down my application to a handfull of components that can have multiple sub-components (maybe also with sub-components):

```
- src
  - components
    - ProductList
      - index.ts
      - ProductList.tsx
      - README.md
      - Filters.tsx
      - Pagination.tsx
      - Drawer.tsx
      ...
    - ProductWidget
      - index.ts
      - ProductWidget.tsx
      - README.md
    - MyComponent
      - index.ts
      - MyComponent.tsx
      - README.md
      - SubComponent1.tsx
      - SubComponent2.tsx
      - SubComponent3
        - index.ts
        - SubComponent3.tsx
        - SubSubComponent.tsx
        ...
```

For the upper structure I would define three Firescout Contexts (Components):

- ProductList
- ProductWidget
- MyComponent

```javascript
// src/components/ProductList/ProductList.tsx
import * as React from 'react'

export default function ProductList () {
  return (
    <div className='ProductList' data-cy-ctx='ProductList'>
      {/** ... */}
    </div>
  )
}
```

The `data-cy-ctx` attribute should always be attached to the root node. 