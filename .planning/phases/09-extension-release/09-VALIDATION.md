---
phase: 9
slug: extension-release
status: draft
nyquist_compliant: true
nyquist_rationale: 'Phase 9 is a release/submission phase, not a feature-build phase. Automated verification covers build correctness (no localhost, all_urls present, tests pass). Remaining verifications (store submission acceptance, screenshot quality, privacy policy legal review) are inherently manual external processes that cannot be automated. Sampling continuity is maintained: every plan wave has at least one automated verify command.'
wave_0_complete: false
created: 2026-04-05
---

# Phase 9 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property               | Value                                                  |
| ---------------------- | ------------------------------------------------------ |
| **Framework**          | vitest 4.x                                             |
| **Config file**        | `extension-v2/vitest.config.ts`                        |
| **Quick run command**  | `cd extension-v2 && npm run test`                      |
| **Full suite command** | `cd extension-v2 && npm run test && npm run typecheck` |
| **Estimated runtime**  | ~15 seconds                                            |

---

## Sampling Rate

- **After every task commit:** Run `cd extension-v2 && npm run test`
- **After every plan wave:** Run `cd extension-v2 && npm run test && npm run typecheck`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID  | Plan | Wave | Requirement         | Test Type    | Automated Command                                                                                                                                                                             | Status     |
| -------- | ---- | ---- | ------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| 09-01-01 | 01   | 1    | D-01,D-02,D-03,D-04 | unit+build   | `cd extension-v2 && npm run test`                                                                                                                                                             | ⬜ pending |
| 09-01-02 | 01   | 1    | D-03                | grep         | `grep -c "moz-extension" quikadmin/src/index.ts`                                                                                                                                              | ⬜ pending |
| 09-01-03 | 01   | 1    | D-01,D-02,D-04      | build        | `grep -c "localhost" extension-v2/.output/chrome-mv3/manifest.json` (expect 0)                                                                                                                | ⬜ pending |
| 09-02-01 | 02   | 1    | D-07,D-08,D-09      | grep         | `grep -c "Browser Extension Data Practices" marketing/src/pages/privacy.astro`                                                                                                                | ⬜ pending |
| 09-02-02 | 02   | 1    | D-04,D-05,D-06,D-13 | file-exist   | `test -f extension-v2/store-listing/permission-justification.md && grep -c "all_urls" extension-v2/store-listing/permission-justification.md`                                                 | ⬜ pending |
| 09-03-01 | 03   | 2    | D-10,D-11,D-12      | file-exist   | `test -f extension-v2/store-listing/screenshots/README.md && grep -c "1280x800" extension-v2/store-listing/screenshots/README.md`                                                             | ⬜ pending |
| 09-03-02 | 03   | 2    | D-09                | http+content | `curl -s -o /dev/null -w "%{http_code}" https://intellifill.com/privacy` (expect 200) + `curl -s https://intellifill.com/privacy \| grep -c "Browser Extension Data Practices"` (expect >= 1) | ⬜ pending |

_Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky_

---

## Wave 0 Requirements

_Existing infrastructure covers all phase requirements. 242 tests already passing._

---

## Manual-Only Verifications

| Behavior                    | Requirement    | Why Manual              | Test Instructions                                        |
| --------------------------- | -------------- | ----------------------- | -------------------------------------------------------- |
| Privacy policy content      | D-07,D-08      | Legal text review       | Read privacy.astro, verify extension disclosures present |
| Store listing screenshots   | D-10,D-11,D-12 | Visual assets           | Verify screenshots exist at correct resolutions          |
| Store submission acceptance | D-05,D-06      | External review process | Submit to Chrome/Firefox stores, await review            |
| CORS for moz-extension      | D-03           | Network test            | Load extension in Firefox, verify API calls succeed      |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 15s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** signed-off (release phase — see nyquist_rationale in frontmatter)
