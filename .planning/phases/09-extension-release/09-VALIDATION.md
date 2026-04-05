---
phase: 9
slug: extension-release
status: draft
nyquist_compliant: false
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

| Task ID  | Plan | Wave | Requirement         | Test Type  | Automated Command                                  | Status     |
| -------- | ---- | ---- | ------------------- | ---------- | -------------------------------------------------- | ---------- |
| 09-01-01 | 01   | 1    | D-01,D-02,D-03      | unit+build | `cd extension-v2 && npm run test && npm run build` | ⬜ pending |
| 09-02-01 | 02   | 1    | D-07,D-08,D-09      | manual     | Check privacy policy content at URL                | ⬜ pending |
| 09-03-01 | 03   | 2    | D-10,D-11,D-12,D-13 | manual     | Screenshots exist, descriptions written            | ⬜ pending |
| 09-04-01 | 04   | 2    | D-04,D-05,D-06      | manual     | Store submission forms completed                   | ⬜ pending |

_Status: ⬜ pending · ✅ green · ❌ red · ���️ flaky_

---

## Wave 0 Requirements

_Existing infrastructure covers all phase requirements. 242 tests already passing._

---

## Manual-Only Verifications

| Behavior                    | Requirement      | Why Manual        | Test Instructions                                        |
| --------------------------- | ---------------- | ----------------- | -------------------------------------------------------- |
| Privacy policy content      | D-07,D-08        | Legal text review | Read privacy.astro, verify extension disclosures present |
| Store listing screenshots   | D-10,D-11,D-12   | Visual assets     | Verify screenshots exist at correct resolutions          |
| Store submission acceptance | D-04,D-05,D-06   | External process  | Submit to Chrome/Firefox stores, await review            |
| CORS for moz-extension      | Research finding | Network test      | Load extension in Firefox, verify API calls succeed      |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
