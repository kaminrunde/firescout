# Handle

A handle is a DOM node, where you can interact with. Every input field, every button an anything that has a `on` listener (e.g onClick):

```javascript
function MyComponent () {
  return (
    <div data-cy-cty='MyComponent'>
      <h2>Headline</h2>

      <button onClick={handleClick} data-cy-handle='my-button'>
        Click me
      </button>

      <div onClick={doSomething} data-cy-handle='do-something'>
        content
      </div>
    </div>
  )
}
```

When any interactable element in your application has a `data-cy-handle` ...