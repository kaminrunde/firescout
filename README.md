# firescout

WIP

## Install GitHub Private Package

In order to use the currently (still) private packages from firescout's GitHub repo you wants to apply the following approach to the project to require any firescout artifact:

Create or edit file  `.npmrc` in project root dir w/ following contents:

```bash
registry=https://registry.npmjs.org/
@kaminrunde:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=ef23d5132868664608943b05063a6dd5d191d3f0
```

The trick here is to indicate the default registry (`registry.npmjs.org`) for all other public packages you want to use.

NOTE: the `authToken` is limited to scope `read:packages` and will be deleted once will become public.

With the above setup 

```bash
npm install --save \
  @kaminrunde/babel-plugin-remove-firescout \
  @kaminrunde/cypress-firescout \
  @kaminrunde/eslint-plugin-firescout
```

## Lerna

Usage:

```bash
# bootstrap
# !!! NOTE comment out registry=... in .npmrc
lerna bootstrap --force-local
# !!! NOTE comment in registry=... in .npmrc
```

Add `"private": true` to package's `package.json` for package to remain private.

To publish packages with a scope (e.g., `@kaminrunde/rocks`), [you must set `access`](https://github.com/lerna/lerna/tree/master/commands/publish#per-package-configuration) in packages' `package.json`: 

```
  "publishConfig": {
    "access": "public"
  }
```

Lerna copies root license (`LICENSE`) into package location, no need to do this manually (of via symlink for that matter).

## Configuring npm for use with GitHub Packages

<https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages>

<https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line>

> To authenticate by logging in to npm, use the npm login command, replacing USERNAME with your GitHub username, TOKEN with your [personal access token](https://github.com/settings/tokens), and PUBLIC-EMAIL-ADDRESS with your email address.

```bash
npm login --registry=https://npm.pkg.github.com --scope=@kaminrunde
> Username: USERNAME
> Password: TOKEN
> Email: PUBLIC-EMAIL-ADDRESS
```

Publishing a package using a local `.npmrc` file

<https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages#publishing-a-package-using-a-local-npmrc-file>

### manual prerelease `lerna publish prerelease`

```bash
❯ yarn run prerelease
yarn run v1.22.4
$ lerna publish prerelease
lerna notice cli v3.22.0
lerna info current version 1.0.0
lerna info Assuming all packages changed

Changes:
 - @kaminrunde/example-app-firescout: 1.0.0 => 1.0.1-alpha.0 (private)
 - @kaminrunde/babel-plugin-remove-firescout: 1.0.0 => 1.0.1-alpha.0
 - @kaminrunde/cypress-firescout: 1.0.0 => 1.0.1-alpha.0
 - @kaminrunde/eslint-plugin-firescout: 1.0.0 => 1.0.1-alpha.0

? Are you sure you want to publish these packages? (ynH)
```

### forced manual prelrelease from branch other than `master`

`yarn run publish --allow-branch firescout-jest --force-publish '*'`

## Dev Setup

- Install lerna global: `npm i -g lerna`
- Install all packages and create symlinks for local packages: `lerna bootstrap`

### Test-Setup

You need to reopen vs-code directly in the specific package. outherise the vs-code test-debug extension does not work

### create new example app

- go to examples `cd examples`
- install your project. eg. `npx create-react-app my-app --template typescript`
- install your packages.
- `lerna bootstrap` after each install to symlink