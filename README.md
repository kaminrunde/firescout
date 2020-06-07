# firescout
WIP

## Lerna

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
 - example-app: 1.0.0 => 1.0.1-alpha.0 (private)
 - babel-plugin-remove-firescout: 1.0.0 => 1.0.1-alpha.0
 - cypress-firescout: 1.0.0 => 1.0.1-alpha.0
 - eslint-plugin-firescout: 1.0.0 => 1.0.1-alpha.0

? Are you sure you want to publish these packages? (ynH)
```