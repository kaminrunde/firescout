#!/usr/bin/env bash
# Publishes all non-private packages in packages/* to the given registry.
# Idempotent: versions that already exist in the registry are skipped.
#
# Usage: scripts/publish-packages.sh <npm|github> [--dry-run]
#
# Authentication is NOT handled here and no tokens live in this repo:
#   - npm:    npm Trusted Publishing (OIDC) from GitHub Actions, or a local `npm login`
#   - github: GITHUB_TOKEN of the workflow run (via actions/setup-node), or a local login
set -euo pipefail

target="${1:-}"
dry_run="${2:-}"

case "$target" in
  npm)    registry="https://registry.npmjs.org" ;;
  github) registry="https://npm.pkg.github.com" ;;
  *) echo "usage: $0 <npm|github> [--dry-run]" >&2; exit 1 ;;
esac

# A scope mapping like `@kaminrunde:registry=...` in a user's ~/.npmrc takes
# precedence over --registry, so the scope registry is overridden explicitly too.
registry_args=(--registry "$registry" "--@kaminrunde:registry=$registry")

root="$(cd "$(dirname "$0")/.." && pwd)"
failed=0

for dir in "$root"/packages/*/; do
  manifest="$dir/package.json"
  [ -f "$manifest" ] || continue

  name="$(node -p "require('$manifest').name")"
  version="$(node -p "require('$manifest').version")"
  private="$(node -p "Boolean(require('$manifest').private)")"

  if [ "$private" = "true" ]; then
    echo "skip  $name (private)"
    continue
  fi

  if npm view "$name@$version" version "${registry_args[@]}" >/dev/null 2>&1; then
    echo "skip  $name@$version (already on $target)"
    continue
  fi

  args=(publish --access public "${registry_args[@]}")
  # prereleases (e.g. 1.2.0-alpha.0) must not become "latest"
  if [[ "$version" == *-* ]]; then
    args+=(--tag next)
  fi
  if [ "$target" = "npm" ] && [ -n "${GITHUB_ACTIONS:-}" ]; then
    args+=(--provenance)
  fi
  if [ "$dry_run" = "--dry-run" ]; then
    args+=(--dry-run)
  fi

  echo "publish $name@$version -> $target"
  if ! (cd "$dir" && npm "${args[@]}"); then
    echo "FAILED $name@$version -> $target" >&2
    failed=1
  fi
done

exit "$failed"
