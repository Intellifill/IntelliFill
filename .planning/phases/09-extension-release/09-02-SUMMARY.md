---
phase: 09-extension-release
plan: '02'
subsystem: marketing/extension-store
tags: [privacy-policy, store-listing, chrome-web-store, firefox-amo, compliance]
dependency_graph:
  requires: []
  provides:
    [
      privacy-policy-extension-section,
      chrome-store-listing,
      firefox-store-listing,
      permission-justification,
    ]
  affects: [intellifill.com/privacy, extension-v2-submission]
tech_stack:
  added: []
  patterns: [astro-html-section-insert, markdown-store-copy]
key_files:
  created:
    - extension-v2/store-listing/chrome-description.md
    - extension-v2/store-listing/firefox-description.md
    - extension-v2/store-listing/permission-justification.md
  modified:
    - marketing/src/pages/privacy.astro
decisions:
  - 'Privacy policy section 6 covers all 4 D-08 disclosures: form field metadata, auth token storage, infer-fields LLM endpoint, 5-min profile cache'
  - 'Contact Us renumbered to Section 7 to accommodate new extension section at Section 6'
  - 'Last updated date advanced to April 2026'
  - 'Chrome short description kept under 132 chars as required'
  - 'Firefox listing includes Reviewer Notes with WXT build instructions for source code review'
  - 'Permission justification covers single-purpose statement, host permission rationale (4 points), and full data use disclosure table'
metrics:
  duration: '~8 minutes'
  completed_date: '2026-04-05'
  tasks_completed: 2
  tasks_total: 2
  files_modified: 1
  files_created: 3
---

# Phase 9 Plan 02: Store Listing Copy & Privacy Policy Summary

**One-liner:** Privacy policy updated with browser extension disclosures (field metadata, infer-fields endpoint, auth tokens, 5-min cache) and store listing copy created for Chrome Web Store and Firefox AMO with permission justification text.

## Tasks Completed

| Task | Name                                                           | Commit  | Files                                                                                                 |
| ---- | -------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------- |
| 1    | Add browser extension section to privacy policy                | f5f0717 | marketing/src/pages/privacy.astro                                                                     |
| 2    | Create store listing descriptions and permission justification | c26dcc6 | extension-v2/store-listing/chrome-description.md, firefox-description.md, permission-justification.md |

## What Was Built

### Task 1: Privacy Policy Extension Section

Inserted new Section 6 "Browser Extension Data Practices" into `marketing/src/pages/privacy.astro` between the "Third-Party Services" section and "Contact Us" (now renumbered to Section 7). The section covers all four required disclosures from D-08:

- Form field metadata read on all pages (name, label, type, placeholder)
- Data sent to `app.intellifill.com/api/extension/infer-fields` for AI matching
- Auth tokens stored in `browser.storage.local` (not synced, not shared)
- Profile data cached locally for up to 5 minutes

Also updated "Last updated" date from January 2026 to April 2026.

### Task 2: Store Listing Assets

Created `extension-v2/store-listing/` with three ready-to-paste files:

**chrome-description.md:** Short description (112 chars, under 132-char limit), detailed description with 4-step how-it-works, 5 feature bullets including Alt+Shift+F shortcut, permissions paragraph explaining all_urls necessity, privacy policy link.

**firefox-description.md:** Summary, description, features, privacy policy link, and a Reviewer Notes section with WXT build instructions (`npm install && npm run build:firefox`) and framework context for AMO reviewers.

**permission-justification.md:** Three sections — single-purpose statement for Chrome Privacy tab, 4-point explanation of why all_urls is needed for review teams, and a data use disclosure table covering PII, auth, web history, user activity monitoring, financial info, health info, and communications.

## Decisions Made

- Privacy policy section text verified against actual code: `CACHE_DURATION_MS = 5 * 60 * 1000` in constants.ts confirms 5-minute claim; `local:authToken` in storage.ts confirms browser.storage.local claim; `/extension/infer-fields` in extension.routes.ts confirms API endpoint claim.
- Firefox reviewer notes added proactively to help AMO reviewers who must build from source — not required but significantly reduces review friction.
- Data use disclosure table in permission-justification.md structured to map directly to Chrome Web Store Privacy tab checkboxes.

## Deviations from Plan

None — plan executed exactly as written. Prettier reformatted the markdown files on commit (whitespace only, no content changes).

## Known Stubs

None — all content is substantive and references actual implementation details from the codebase.

## Threat Flags

None — no new network endpoints, auth paths, or schema changes introduced. Files are static markdown and Astro HTML only.

## Self-Check: PASSED

- [x] `marketing/src/pages/privacy.astro` — exists and contains "Browser Extension Data Practices" (grep confirmed)
- [x] `extension-v2/store-listing/chrome-description.md` — exists, contains "form autofill", "Alt+Shift+F", privacy link
- [x] `extension-v2/store-listing/firefox-description.md` — exists, contains "Reviewer Notes", privacy link
- [x] `extension-v2/store-listing/permission-justification.md` — exists, contains "single-purpose", "all_urls", "Data Use Disclosure"
- [x] Commit f5f0717 — confirmed in git log
- [x] Commit c26dcc6 — confirmed in git log
