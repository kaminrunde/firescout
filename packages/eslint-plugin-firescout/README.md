# eslint-plugin-firescout

Adds hints for usage with cypress-firescout

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-firescout`:

```
$ npm install eslint-plugin-firescout --save-dev
```

## Usage

Add `firescout` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["firescout"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "firescout/rule-name": 2
  }
}
```

## Supported Rules

- Fill in provided rules here
