# Overview

View components can differ in a lot of ways from each other. In order to create a living documentation we need to reduce them to generalizing concepts. So a clever algorithm can pick up these concepts and check them.


No matter what your component does and how complex it is. We can reduce it to three concepts:

- **Handles**: Interactable DOM-Elements like buttons, inputs and anything that has a `on*` (e.g onClick) method are handles. 

- **States**: The data-variation of your component. If a button is under some condition visible and under another not it is a state. Each possible DOM-Structure should be considered a state

- **Events**: Our component can communicate with the outside word. It can fetch data, update your state... In fireside we call this an event. We won't explain events in this section. Read more about events in the section [Mocking](.../cypress/mocking.md)


## firescout in 5 minutes

### add refs to the ccomponent

Each `handle` and `state` needs a reference in the DOM:

```javascript
const MyComponent = ({ showSecret, onClick }) => (
  <div className='MyComponent' data-cy-ctx='MyComponent'>
    <button onClick={onClick} data-cy-handle='toggle-secret'>
      show secret
    </button>
    {showSecret && (
      <div data-cy-state='secret-visible'>here is the secret</div>
    )}
  </div>
)
```

Our button gets the attribute `data-cy-handle="toggle-secret"`. That tells firescout that this is a interactable element with the name `toggle-secret`.

If the secret is visible or not depends on the prop `showSecret`. This is a variation of our component what means, that we need a state here. With `data-cy-state="secret-visible"` we define out `secret-visible` state

You may also have noticed the attribute `data-cy-ctx="Component"`. Every state and handle needs a context. Think about this as a namespace for your states and handles. More about this in the following section.

> Don't worry about all these `data-cy-*` attributes blowing up your js-bundle size. We have a babel plugin that removes them during production

### create documentation

Next let's create our documentation. Each `data-cy-ctx` needs a Markdown file. You can create the file anywhere you want. So it is your choice if you want to have a seperate `docs` folder or place it directly next to your component (as a `README.md`):

```markdown
<!-- firescout-component -->

# MyComponent

Can show a super magic secret if you click the button

## Handles

- **toggle-secret**: Triggers the onClick prop that will show/hide our secret

## States

- **secret-visible**: oh no! now everyone can see the secret

```

The first comment line `<!-- firescout-component -->` gives firescout the hint that this file has a firescout-valid documentation. This is needed so the firescout command can find this file. The headline (h1) has to be the same name as the `data-cy-ctx` in your component. That way firescout can connect both files. If there is a `data-cy-ctx` without a matching docs file, firescout will throw an error. Same for the other way round.

Each handle and state needs also to be documented. firescout will throw an error if there is a handle or state either in the component or the docs that has no counterpart. Handles need to be documented in the h2 `Handles`. States in the h2 `States`. 

### check documentation

Now let's check if we documented correctly. First install firescout:

`npm i -D @kaminrunde/cypress-firescout`

and create a script in package.json:

```javascript
"scripts": {
  //...
  "firescout": "firescout-build"
  //...
}
```

Additionally we need a `firescout.json` in our root folder (where package.json is defined):

```javascript
{
  "widgetFolders": ["src"],
  "extensions": "tsx|ts|js",
  "outPath": null,
  "fixturesFolder": null,
  "tsFixtures": false
}
```

If your app does not live in the `src` folder define another one. If you have a docs-folder and this folder is outside of your widget-folder then you have to add it too. `firescout.json` will be explained in more detail later, so let's skip this for now. 

Now run `npm run firescout`. There should be no output. That's good! That means there are no errors. Now let's remove the states section from our `README.md`. When you run `npm run firescout` again you should see the colored error 

`STATE_HAS_NO_DOCS MyComponent -> secret-visible src/components/MyComponent/MyComponent.tsx`

If you remove the `data-cy-state` from your component and re-add the state section to your `README.md` you will see the error

`STATE_HAS_NO_REF MyComponent -> secret-visible src/components/MyComponent/README.md`

### Conclusion

Firescout is a technique that can document your DOM-Structure (or JSX). You will add `data-cy-*` attributes and firescout forces you to create a documentation for them. We have a eslint-plugin that will tell you what part of your code needs documentation (JSX-only). 

Since dom-refs and documentation are two-way binded you cannot change one side without being forced to change the other side. In practive this works extremly well and is one part of the living-documentation technique. Whenever you update your component and add/remove/change a behaviour (what firescout considers a state) you will be forced to invalidate your documentation. That is a bit complex to understand now, but I will explain it in a later section.