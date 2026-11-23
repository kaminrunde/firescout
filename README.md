# firescout

WIP

[![Publish](https://github.com/kaminrunde/firescout/actions/workflows/publish.yml/badge.svg)](https://github.com/kaminrunde/firescout/actions/workflows/publish.yml)

## Packages

All packages are published **publicly on [npmjs.com](https://www.npmjs.com/org/kaminrunde)** (and mirrored to GitHub Packages).

| Package | npm |
| --- | --- |
| `@kaminrunde/firescout-utils` | [![npm](https://img.shields.io/npm/v/@kaminrunde/firescout-utils)](https://www.npmjs.com/package/@kaminrunde/firescout-utils) |
| `@kaminrunde/react-firescout` | [![npm](https://img.shields.io/npm/v/@kaminrunde/react-firescout)](https://www.npmjs.com/package/@kaminrunde/react-firescout) |
| `@kaminrunde/cypress-firescout` | [![npm](https://img.shields.io/npm/v/@kaminrunde/cypress-firescout)](https://www.npmjs.com/package/@kaminrunde/cypress-firescout) |
| `@kaminrunde/eslint-plugin-firescout` | [![npm](https://img.shields.io/npm/v/@kaminrunde/eslint-plugin-firescout)](https://www.npmjs.com/package/@kaminrunde/eslint-plugin-firescout) |
| `@kaminrunde/babel-plugin-firescout-mock` | [![npm](https://img.shields.io/npm/v/@kaminrunde/babel-plugin-firescout-mock)](https://www.npmjs.com/package/@kaminrunde/babel-plugin-firescout-mock) |
| `@kaminrunde/babel-plugin-remove-firescout` | [![npm](https://img.shields.io/npm/v/@kaminrunde/babel-plugin-remove-firescout)](https://www.npmjs.com/package/@kaminrunde/babel-plugin-remove-firescout) |

## Usage

No token and no `.npmrc` configuration needed:

```bash
npm install --save \
  @kaminrunde/babel-plugin-remove-firescout \
  @kaminrunde/cypress-firescout \
  @kaminrunde/eslint-plugin-firescout
```

### Migrating from GitHub Packages

Older setups installed these packages from GitHub Packages and needed a GitHub token plus this line in the project's `.npmrc`:

```
@kaminrunde:registry=https://npm.pkg.github.com
```

Remove that line (and the token) to install from npmjs.com instead.

> **Note:** a registry mapping in `.npmrc` applies to the whole `@kaminrunde` scope. If your project also uses other `@kaminrunde/*` packages that exist **only** on GitHub Packages, keep the line – the firescout packages are still mirrored there, so both setups keep working.

## Lerna

Usage:

```bash
# bootstrap
lerna bootstrap --force-local
```

To publish packages with a scope (e.g., `@kaminrunde/rocks`) publicly, `access` must be set in the packages' `package.json` (all firescout packages already have it):

```
  "publishConfig": {
    "access": "public"
  }
```

Each package defines a `files` list in its `package.json` – only those files end up in the published tarball. Check with `npm pack --dry-run` inside the package folder.

## Releasing

Publishing happens **only in CI** via [`.github/workflows/publish.yml`](.github/workflows/publish.yml). Nobody needs an npm or GitHub token locally, and there are no secrets in this repository or in the GitHub repository settings:

- **npmjs.com** – [npm Trusted Publishing](https://docs.npmjs.com/trusted-publishers) (OIDC). Packages are published with [provenance](https://docs.npmjs.com/generating-provenance-statements).
- **GitHub Packages** – the workflow's automatic `GITHUB_TOKEN`.

### Release flow

The committed `lib/` folders are published as they are – build (`yarn build` in the package) and commit them before releasing.

```bash
# stable release: bump versions, commit, tag (vX.Y.Z) and push
yarn release

# prerelease (e.g. 1.0.2-alpha.0), published with dist-tag `next`
yarn prerelease
```

Pushing the `v*` tag triggers the **Publish** workflow. It publishes every non-private package in `packages/*` whose version is not yet in the target registry, so re-running it is safe.

Install a prerelease with `npm install @kaminrunde/cypress-firescout@next`.

### Choosing the target registry

| Where | How |
| --- | --- |
| Default for tag pushes | repository variable `PUBLISH_TARGET` (*Settings → Secrets and variables → Actions → Variables*): `npm`, `github` or `both`. Unset = `both`. |
| Manual run | *Actions → Publish → Run workflow* and pick `both`, `npm` or `github` |

The workflow can also be used to (re-)publish an existing version, e.g. to fill up a registry that is missing it.

### One-time setup on npmjs.com

npm Trusted Publishing can only be configured for packages that already exist, so the very first version is published once by hand:

1. Log in locally (browser login with 2FA; the session token stays in your `~/.npmrc`, never in this repo):
   ```bash
   npm login
   ```
2. Publish the current versions (dry run first):
   ```bash
   scripts/publish-packages.sh npm --dry-run
   scripts/publish-packages.sh npm
   ```
3. Configure Trusted Publishing for all packages (uses `npm trust`, needs npm ≥ 11.10 and 2FA on your account):
   ```bash
   scripts/setup-trusted-publishing.sh --dry-run
   scripts/setup-trusted-publishing.sh        # 2FA in the browser: tick "skip 2FA for 5 minutes"
   scripts/setup-trusted-publishing.sh --list # verify
   ```
   Run it in a real terminal – without a TTY npm cannot wait for the browser 2FA and fails with `EOTP`.
   With an authenticator app you can pass a code instead: `NPM_OTP=123456 scripts/setup-trusted-publishing.sh`.
   Manual alternative, per package on npmjs.com → *Settings* → *Trusted Publisher* → *GitHub Actions*:
   organization `kaminrunde`, repository `firescout`, workflow `publish.yml`, environment empty.
4. Recommended: for each package set *Publishing access* to **"Require two-factor authentication and disallow tokens"** – then only the workflow can publish.
5. `npm logout`

> `scripts/publish-packages.sh` also overrides `@kaminrunde:registry`, so a GitHub scope mapping in your personal `~/.npmrc` does not redirect the publish to GitHub Packages.

From then on every release goes through the workflow.

### Manual prerelease / forced publish

```bash
# bump all packages even if unchanged
yarn lerna version --force-publish '*'

# release from a branch other than master
yarn lerna version prerelease --preid alpha --allow-branch firescout-jest --force-publish '*'
```

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
