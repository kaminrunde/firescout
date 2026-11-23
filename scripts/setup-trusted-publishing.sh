#!/usr/bin/env bash
# Configures npm Trusted Publishing (GitHub Actions OIDC) for all non-private
# packages in packages/*. One-time setup, run locally by a package owner.
#
# Requirements: npm >= 11.10, `npm login` on npmjs.com with 2FA enabled.
# The first call asks for 2FA in the browser – tick "skip 2FA for the next
# 5 minutes" there, then the remaining packages go through without prompts.
#
# Run it in a real terminal (npm waits there for the browser 2FA confirmation).
# Alternatively pass a one-time password from your authenticator app:
#   NPM_OTP=123456 scripts/setup-trusted-publishing.sh
#
# Usage: scripts/setup-trusted-publishing.sh [--dry-run]
#        scripts/setup-trusted-publishing.sh --list
set -euo pipefail

REPO="kaminrunde/firescout"
WORKFLOW="publish.yml"
registry="https://registry.npmjs.org"
# A GitHub scope mapping in ~/.npmrc would otherwise win over --registry.
# `npm trust` rejects the --@scope:registry flag, so it is passed via env.
registry_args=(--registry "$registry")
npm() { env "npm_config_@kaminrunde:registry=$registry" npm "$@"; }

[ -n "${NPM_OTP:-}" ] && registry_args+=(--otp "$NPM_OTP")

mode="${1:-}"
failed=()
root="$(cd "$(dirname "$0")/.." && pwd)"

for manifest in "$root"/packages/*/package.json; do
  name="$(node -p "require('$manifest').name")"
  [ "$(node -p "Boolean(require('$manifest').private)")" = "true" ] && continue

  if [ "$mode" = "--list" ]; then
    echo "== $name"
    npm trust list "$name" "${registry_args[@]}" || true
    continue
  fi

  echo "== $name -> $REPO ($WORKFLOW)"
  args=(trust github "$name" --repo "$REPO" --file "$WORKFLOW"
        --allow-publish --allow-stage-publish --yes "${registry_args[@]}")
  [ "$mode" = "--dry-run" ] && args+=(--dry-run)
  npm "${args[@]}" || failed+=("$name")
  sleep 2   # recommended by npm to avoid rate limiting
done

if [ ${#failed[@]} -gt 0 ]; then
  echo "FAILED: ${failed[*]}" >&2
  exit 1
fi
