---
phase: 09-extension-release
plan: 01
subsystem: extension-config, backend-cors
tags: [extension, wxt, cors, firefox, production-build]
dependency_graph:
  requires: []
  provides: [production-extension-zips, firefox-cors-support, env-driven-api-url]
  affects: [extension-v2, quikadmin/src/index.ts]
tech_stack:
  added: []
  patterns: [wxt-env-vars, mode-based-manifest, cors-regex-anchoring]
key_files:
  created:
    - extension-v2/.env.production
  modified:
    - extension-v2/.env.example
    - extension-v2/shared/constants.ts
    - extension-v2/shared/types/settings.ts
    - extension-v2/entrypoints/background.ts
    - extension-v2/wxt.config.ts
    - extension-v2/tests/background.test.ts
    - quikadmin/src/index.ts
    - extension-v2/.output/chrome-mv3/manifest.json
    - extension-v2/.output/firefox-mv2/manifest.json
    - extension-v2/.output/intellifill-extension-2.0.0-chrome.zip
    - extension-v2/.output/intellifill-extension-2.0.0-firefox.zip
decisions:
  - WXT_API_URL env var with production fallback avoids test-environment breakage
  - .env.production force-added to git (contains only public URL, not a secret)
  - .env kept gitignored (dev-only localhost value)
  - background.test.ts assertion updated to expect production fallback URL
metrics:
  duration: 6 min
  completed: 2026-04-05T11:22:00Z
  tasks_completed: 3
  files_changed: 11
---

# Phase 9 Plan 1: Production API Config & Firefox CORS Summary

**One-liner:** WXT env-var-driven API URL replaces 4 hardcoded localhost references; Firefox moz-extension UUID CORS pattern added to backend; production zips rebuilt with zero localhost in manifests.

## Tasks Completed

| Task | Name                                                      | Commit  | Files                                                                                                      |
| ---- | --------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------- |
| 1    | Replace hardcoded localhost with WXT env vars             | d2d9388 | constants.ts, settings.ts, background.ts, wxt.config.ts, .env.production, .env.example, background.test.ts |
| 2    | Add Firefox moz-extension CORS pattern to backend         | bebf9a8 | quikadmin/src/index.ts                                                                                     |
| 3    | Rebuild production extension zips and verify no localhost | 8069d0a | .output/chrome-mv3/manifest.json, .output/firefox-mv2/manifest.json, \*.zip                                |

## Verification Results

| Check                                                | Result |
| ---------------------------------------------------- | ------ |
| All 263 extension tests pass                         | PASS   |
| Chrome manifest has zero localhost references        | PASS   |
| Firefox manifest has zero localhost references       | PASS   |
| Chrome manifest has app.intellifill.com              | PASS   |
| Firefox manifest has app.intellifill.com             | PASS   |
| Chrome manifest has all_urls content script (D-04)   | PASS   |
| moz-extension UUID pattern in quikadmin/src/index.ts | PASS   |
| import.meta.env.WXT_API_URL in shared/constants.ts   | PASS   |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed stale localhost assertion in background.test.ts**

- **Found during:** Task 1 — `npm test` showed 1 failing test
- **Issue:** `tests/background.test.ts` line 107 asserted `DEFAULT_SETTINGS.apiEndpoint` equals `'http://localhost:3002/api'`. After the env-var change, the fallback in test environment (where `import.meta.env.WXT_API_URL` is undefined) resolves to `'https://app.intellifill.com/api'`
- **Fix:** Updated assertion to `'https://app.intellifill.com/api'` — tests went from 262 passing / 1 failing to 263 passing / 0 failing
- **Files modified:** `extension-v2/tests/background.test.ts`
- **Commit:** d2d9388

## Known Stubs

None — all production URLs are fully wired. The `.env.production` file provides `WXT_API_URL=https://app.intellifill.com/api` which is resolved at WXT build time into the manifest and bundled JS.

## Threat Flags

None — no new network endpoints, auth paths, or schema changes introduced beyond what was planned. The moz-extension CORS regex (T-09-02) is strictly anchored as required.

## Self-Check: PASSED

- extension-v2/.env.production: FOUND
- extension-v2/shared/constants.ts contains import.meta.env.WXT_API_URL: FOUND
- quikadmin/src/index.ts contains moz-extension: FOUND
- Commit d2d9388: FOUND
- Commit bebf9a8: FOUND
- Commit 8069d0a: FOUND
