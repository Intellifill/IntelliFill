# Phase 9: Extension Release - Discussion Log (Assumptions Mode)

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions captured in CONTEXT.md — this log preserves the analysis.

**Date:** 2026-04-05
**Phase:** 09-extension-release
**Mode:** assumptions (--auto)
**Areas analyzed:** API Endpoint & Host Permissions, Content Script Permissions, Privacy Policy, Store Listing Assets, Firefox MV2 vs MV3

## Assumptions Presented

### API Endpoint & Host Permissions

| Assumption                                                                           | Confidence | Evidence                                                                                                                           |
| ------------------------------------------------------------------------------------ | ---------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| localhost must be stripped from production builds, DEFAULT_API_URL set to production | Confident  | `shared/constants.ts`, `shared/types/settings.ts`, `entrypoints/background.ts`, `wxt.config.ts` — 4 hardcoded localhost references |

### Content Script Permissions

| Assumption                                                                        | Confidence | Evidence                                                   |
| --------------------------------------------------------------------------------- | ---------- | ---------------------------------------------------------- |
| `<all_urls>` requires justification but should be kept for autofill functionality | Likely     | `entrypoints/content.ts` line 25 — matches: ['<all_urls>'] |

### Privacy Policy

| Assumption                                                   | Confidence | Evidence                                                                                                                        |
| ------------------------------------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Existing privacy policy needs extension-specific disclosures | Confident  | `marketing/src/pages/privacy.astro` — no extension mention; extension reads form metadata, stores tokens, sends to LLM endpoint |

### Store Listing Assets

| Assumption                                            | Confidence | Evidence                                                                                                       |
| ----------------------------------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------- |
| All store listing assets must be created from scratch | Confident  | Only icons exist at `extension-v2/public/icons/`; no screenshots, promotional images, or expanded descriptions |

### Firefox MV2 vs MV3

| Assumption                                                | Confidence | Evidence                                                                         |
| --------------------------------------------------------- | ---------- | -------------------------------------------------------------------------------- |
| Need to verify Firefox MV2 acceptance for new submissions | Unclear    | `package.json` builds MV2 for Firefox; Firefox MV3 transition timeline uncertain |

## Corrections Made

No corrections — all assumptions auto-confirmed.

## Auto-Resolved

- Content Script Permissions (Likely): auto-selected "Keep `<all_urls>` with detailed justification"
- Firefox MV2 vs MV3 (Unclear): auto-selected "Verify via research, default to MV2 if still accepted"
