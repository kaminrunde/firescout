# firescout
WIP

## Lerna

Usage:

```bash
# bootstrap
lerna bootstrap --force-local
```

Add `"private": true` to package's `package.json` for package to remain private.

To publish packages with a scope (e.g., `@kaminrunde/rocks`), [you must set `access`](https://github.com/lerna/lerna/tree/master/commands/publish#per-package-configuration) in packages' `package.json`: 

```
  "publishConfig": {
    "access": "public"
  }
```

Lerna copies root license (`LICENSE`) into package location, no need to do this manually (of via symlink for that matter).

### manual prerelease `lerna publish prerelease`

```bash
❯ yarn run prerelease
lerna notice cli v3.22.0
lerna info current version 1.0.0
lerna info Assuming all packages changed

Changes:
 - `@kaminrunde/example-app-firescout`: 1.0.0 => 1.0.1-alpha.0 (private)
 - `@kaminrunde/babel-plugin-remove-firescout`: 1.0.0 => 1.0.1-alpha.0
 - `@kaminrunde/cypress-firescou`: 1.0.0 => 1.0.1-alpha.0
 - `@kaminrunde/eslint-plugin-firescout`: 1.0.0 => 1.0.1-alpha.0

? Are you sure you want to publish these packages? (ynH)
```