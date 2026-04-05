---
phase: 09-extension-release
plan: '03'
subsystem: extension-store-submission
tags: [extension, store-submission, screenshots, chrome-web-store, firefox-amo, checklist]
dependency_graph:
  requires: [09-01, 09-02]
  provides: [screenshot-guide, submission-checklists, store-readiness]
  affects: [extension-v2/store-listing]
tech_stack:
  added: []
  patterns: [markdown-submission-checklist, screenshot-capture-guide]
key_files:
  created:
    - extension-v2/store-listing/screenshots/README.md
  modified: []
decisions:
  - Firefox AMO source zip requirement documented with reviewer build notes (npm install && npm run build:firefox)
  - Quick readiness check section added with curl/grep commands for pre-submission verification
  - Single screenshots directory serves both Chrome and Firefox stores (same PNG files accepted by both)
metrics:
  duration: ~2 min
  completed: 2026-04-05T11:27:00Z
  tasks_completed: 1
  tasks_total: 2
  files_created: 1
  files_modified: 0
---

# Phase 9 Plan 03: Screenshot Guide & Submission Checklists Summary

**One-liner:** Screenshot capture guide and complete store submission checklists for Chrome Web Store and Firefox AMO created with step-by-step instructions, pre-submission verification commands, and all required content pointers.

## Tasks Completed

| Task | Name                                              | Commit  | Files                                            |
| ---- | ------------------------------------------------- | ------- | ------------------------------------------------ |
| 1    | Create screenshot guide and submission checklists | bfe121d | extension-v2/store-listing/screenshots/README.md |

## Tasks Awaiting Human Action

| Task | Name                                                 | Status                  |
| ---- | ---------------------------------------------------- | ----------------------- |
| 2    | Verify privacy policy deployment and store readiness | checkpoint:human-verify |

## What Was Built

### Task 1: Screenshot Guide and Submission Checklists

Created `extension-v2/store-listing/screenshots/README.md` with three major sections:

**Screenshot Capture Instructions:**

- Recommended 3 screenshots with suggested filenames and content descriptions
- Chrome: step-by-step via `chrome://extensions` > Developer Mode > Load Unpacked
- Firefox: step-by-step via `about:debugging` > This Firefox > Load Temporary Add-on
- All three captures documented: popup (logged-in), autocomplete dropdown, filled form

**Chrome Web Store Submission Checklist:**

- 5 pre-submission checkboxes with verification commands
- 5-step submission walkthrough covering Store Listing tab and Privacy tab
- Content pointers: where to copy-paste text from existing store-listing/ files
- Data use disclosure mapping: exactly which checkboxes to tick in the Chrome Privacy tab
- Host permissions justification: pointer to permission-justification.md

**Firefox AMO Submission Checklist:**

- 5 pre-submission checkboxes including source zip requirement explained
- 6-step submission walkthrough with reviewer notes copy-paste block
- Build commands for generating sources zip if missing
- Reviewer notes formatted for AMO source code submission form

**Quick Readiness Check section:** 5 bash commands for pre-submission self-verification (privacy policy, localhost-free manifest, zip existence, screenshot existence).

## Deviations from Plan

None — plan executed exactly as written.

## Checkpoint: Task 2 — Human Verification Required

**Status:** Awaiting user action before store submission can proceed.

The following must be verified before submitting to either store:

1. **Privacy policy deployment** — Push marketing site changes to main (or run `cd marketing && vercel --prod`). Visit https://intellifill.com/privacy and confirm Section 6 "Browser Extension Data Practices" is visible.

2. **Production extension verification** — Load `extension-v2/.output/chrome-mv3/` in Chrome via `chrome://extensions` (Developer Mode > Load Unpacked). Confirm popup connects to `app.intellifill.com` (not localhost). Check browser console for errors.

3. **Firefox CORS verification** (optional) — Load `extension-v2/.output/firefox-mv2/` via `about:debugging`. Log in. Confirm no CORS errors in developer console.

4. **Screenshot capture** — Follow guide in `extension-v2/store-listing/screenshots/README.md`. Capture at least 1 screenshot (3 recommended) at 1280x800.

5. **Store listing review** — Read descriptions in `extension-v2/store-listing/`. Confirm content is accurate.

6. **Developer accounts** — Ensure Chrome Web Store ($5) and Firefox AMO (free) accounts are registered.

**Automated readiness check:**

```bash
# Run from project root
curl -s -o /dev/null -w "%{http_code}" https://intellifill.com/privacy
# Expected: 200

curl -s https://intellifill.com/privacy | grep -c "Browser Extension Data Practices"
# Expected: 1 or more

grep -r "localhost" extension-v2/.output/chrome-mv3/manifest.json
# Expected: no output (empty means PASS)
```

**Resume signal:** Type "approved" if privacy policy is live and extension works against production, or describe any issues found.

## Known Stubs

None — all content is substantive and references actual build artifacts from Plans 01 and 02.

## Threat Flags

None — this plan creates only documentation files. No new network endpoints, auth paths, or schema changes introduced. Threat T-09-07 (privacy policy deployment verification) is addressed by the checkpoint task which explicitly requires the user to confirm the privacy policy is live before proceeding.

## Self-Check: PASSED

- extension-v2/store-listing/screenshots/README.md: FOUND
- File contains "1280x800": 3 matches
- File contains "chrome.google.com/webstore/devconsole": 2 matches
- File contains "addons.mozilla.org/developers": 2 matches
- File contains "intellifill-extension-2.0.0-sources.zip": 3 matches
- File contains "https://intellifill.com/privacy": 5 matches
- File contains "- [ ]" checklist items: 10 matches
- Commit bfe121d: FOUND
