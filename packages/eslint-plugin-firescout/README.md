# eslint-plugin-firescout

Adds hints for usage with cypress-firescout

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `@kaminrunde/eslint-plugin-firescout`:

```
$ npm install @kaminrunde/eslint-plugin-firescout --save-dev
```

## Usage

Add `@kaminrunde/firescout` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` part of the scoped name:

```json
{
  "plugins": ["@kaminrunde/firescout"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "@kaminrunde/firescout/rule-name": 2
  }
}
```

## Supported Rules

- Fill in provided rules here
