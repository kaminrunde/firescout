# State

A firescout state is a variation within your DOM structure. When some div is sometimes visible and sometimes not, you should add a firescout state. That way any possible DOM strukture can be documented.

## JSX

```javascript
function MyComponent () {
  const [showSecret, setShowSecret] = React.useState()

  const toggleSecret = () => setShowSecret(!showSecret)

  return (
    <div data-cy-ctx='MyComponent'>
      <button onClick={toggleSecret} data-cy-handle='toggle-secret'>
        Show Secret
      </button>

      {showSecret && (
        <div data-cy-state='secret-visible'>
          Secret is visbile
        </div>
      )}
    </div>
  )
}
```

Each DOM variation needs a state. Later in the tests we can test on absence/presence of this state

## Readme

```markdown
<!-- firescout-component -->

# MyComponent

## Handles

- **toggle-secret**: Shows/Hides the secret on click

## States

- **secret-visible**: Oh no! the secret is visible
```

Each state has to be registered within the h2 "States". The should be key is bold. Please follow this structure.

When you defined a state 