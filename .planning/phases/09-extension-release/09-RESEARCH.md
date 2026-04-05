# Phase 09: Extension Release - Research

**Researched:** 2026-04-05
**Domain:** Browser extension store submission (Chrome Web Store + Firefox AMO)
**Confidence:** HIGH (code verified, store policies verified via official docs)

---

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Strip `http://localhost:3002/api/*` from manifest host_permissions in production builds; set DEFAULT_API_URL to `https://app.intellifill.com/api` for store builds
- **D-02:** Use WXT build-time environment config to differentiate dev (localhost) vs production (app.intellifill.com) — keep localhost for sideload/development only
- **D-03:** Update all 4 hardcoded localhost references: `shared/constants.ts`, `shared/types/settings.ts`, `entrypoints/background.ts` onInstalled handler, `wxt.config.ts` host_permissions
- **D-04:** Keep `<all_urls>` match pattern — it is necessary for a form autofill extension that must detect fields on any website
- **D-05:** Provide detailed single-purpose justification in Chrome Web Store submission form and listing description
- **D-06:** Prepare clear "why we need this permission" text for both Chrome and Firefox review teams
- **D-07:** Extend existing privacy policy at `marketing/src/pages/privacy.astro` with browser extension-specific disclosures
- **D-08:** Disclosures must cover: form field metadata reading on all pages, auth token storage in browser storage, data sent to backend LLM endpoint (`/extension/infer-fields`), profile data caching (5-min TTL)
- **D-09:** Privacy policy URL must be accessible at a public URL (e.g., intellifill.com/privacy) and linked in both store listings
- **D-10:** Create screenshots by running the extension on sample forms — capture popup UI, autocomplete dropdown, and fill-all keyboard shortcut in action
- **D-11:** Chrome requires: at least 1 screenshot (1280x800 or 640x400), detailed description, single-purpose justification
- **D-12:** Firefox requires: at least 1 screenshot, description, privacy policy URL
- **D-13:** Expand manifest description beyond the current single sentence to a full store listing with feature highlights
- **D-14:** Verify whether Firefox still accepts new MV2 submissions — if not, create MV3 Firefox build (research needed — resolved below)

### Claude's Discretion

- Screenshot composition and styling
- Exact wording of store listing descriptions (within the constraints above)
- Order of submission (Chrome first vs both simultaneously)
- Promotional tile/banner image design (optional for Chrome, nice-to-have)

### Deferred Ideas (OUT OF SCOPE)

- WCAG 2.1 AA accessibility audit for extension UI
- Extension analytics/telemetry
- Auto-update mechanism beyond browser store updates
- Terms of Service page creation

</user_constraints>

---

## Summary

The IntelliFill browser extension (v2.0.0) is built and packaged. Pre-built `.zip` files exist at `extension-v2/.output/`. The primary work for this phase is: (1) fixing hardcoded localhost URLs before rebuilding for production, (2) extending the privacy policy, (3) creating store listing assets (screenshots + descriptions), and (4) executing the submission process for both Chrome Web Store and Firefox AMO.

Two gaps exist beyond those locked in CONTEXT.md. First, Firefox's `moz-extension://` origin is **not** in the backend CORS allowlist — only `chrome-extension://` is covered via regex pattern in `quikadmin/src/index.ts`. Firefox users will get CORS rejections at runtime until this is added. Second, the existing zip files were built with localhost in host_permissions and constants — they cannot be submitted as-is.

Firefox D-14 is now resolved: Firefox AMO still accepts new MV2 submissions in 2025/2026. Mozilla has explicitly confirmed no deprecation of MV2 and requires 12 months notice before any future change. The existing `firefox-mv2` build is valid for submission.

**Primary recommendation:** Fix localhost references first using WXT `.env.production` mechanism, rebuild both targets, verify CORS covers `moz-extension://`, then proceed with privacy policy update and store listing creation before submitting.

---

## Standard Stack

### Core (Already In Use)

| Library | Version | Purpose                   | Notes                                     |
| ------- | ------- | ------------------------- | ----------------------------------------- |
| WXT     | ^0.19.0 | Extension build framework | Handles cross-browser manifest generation |
| Vitest  | ^4.0.18 | Test runner               | 242 tests already passing                 |
| React   | ^18.3.1 | Popup UI                  | Already built                             |

### External Accounts / Services Required

| Service                            | Cost                   | Required For       |
| ---------------------------------- | ---------------------- | ------------------ |
| Chrome Web Store Developer Account | $5 one-time            | Chrome submission  |
| Firefox AMO account                | Free (Mozilla account) | Firefox submission |

**Version verification:** All packages confirmed from `extension-v2/package.json` directly. [VERIFIED: codebase read]

---

## Architecture Patterns

### WXT Environment-Based Production Configuration

WXT supports `.env` files per Vite convention. The correct pattern for D-01/D-02/D-03 is:

**Pattern: `.env.production` file + `import.meta.env.WXT_API_URL`**

```typescript
// extension-v2/.env.production  (gitignored, no secrets)
WXT_API_URL=https://app.intellifill.com/api

// extension-v2/.env  (dev default)
WXT_API_URL=http://localhost:3002/api
```

```typescript
// shared/constants.ts — after fix
export const DEFAULT_API_URL = import.meta.env.WXT_API_URL ?? 'https://app.intellifill.com/api';
```

```typescript
// wxt.config.ts — after fix (host_permissions uses mode parameter)
export default defineConfig({
  manifest: ({ mode }) => ({
    host_permissions:
      mode === 'production'
        ? ['https://app.intellifill.com/api/*']
        : ['https://app.intellifill.com/api/*', 'http://localhost:3002/api/*'],
  }),
});
```

```typescript
// entrypoints/background.ts — onInstalled handler after fix
extensionSettings.setValue({
  enabled: true,
  apiEndpoint: import.meta.env.WXT_API_URL ?? 'https://app.intellifill.com/api',
  cacheMinutes: 5,
});
```

```typescript
// shared/types/settings.ts — after fix
export const DEFAULT_SETTINGS: ExtensionSettings = {
  enabled: true,
  apiEndpoint: import.meta.env.WXT_API_URL ?? 'https://app.intellifill.com/api',
  cacheMinutes: 5,
};
```

Build commands after fix:

```bash
# Production Chrome build
cd extension-v2 && npm run build && npm run zip

# Production Firefox build
cd extension-v2 && npm run build:firefox && npm run zip:firefox
```

[CITED: https://wxt.dev/guide/essentials/config/environment-variables.html]

### CORS: Firefox moz-extension Gap

The backend (`quikadmin/src/index.ts` line 187) has this CORS allowedPatterns entry:

```typescript
/^chrome-extension:\/\/[a-z]{32}$/,  // Chrome/Edge only
```

Firefox uses `moz-extension://` URIs with UUID format, not 32-char alpha IDs. The pattern does NOT cover Firefox. This must be added:

```typescript
/^moz-extension:\/\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
```

[VERIFIED: codebase grep — moz-extension not found in index.ts]

### Privacy Policy Extension Pattern

The existing `marketing/src/pages/privacy.astro` has 6 sections. A new Section 7 is needed:

```
Section 7: Browser Extension Data Practices
- Form field metadata (name, label, type, placeholder) read from pages you visit when extension is enabled
- Auth tokens stored in browser.storage.local (never synced to cloud storage)
- Field metadata sent to our servers at app.intellifill.com/api/extension/infer-fields for AI field matching
- Profile data (name, address, etc.) cached in browser.storage.local for up to 5 minutes
- Data is not sold or shared with third parties
- You can clear all extension data from the extension popup settings
```

[VERIFIED: codebase read of privacy.astro and extension.routes.ts]

### Manifest Description (D-13)

Current manifest description (132 char limit for Chrome Web Store metadata, longer for store listing body):

> "Automatically fill forms using your stored profile data from documents you have uploaded"

Expanded store listing description structure:

- Lead: What the extension does (1-2 sentences)
- Feature bullets: popup login, field detection, AI-assisted matching, keyboard shortcut
- Single-purpose statement: "IntelliFill is a single-purpose form autofill extension..."
- Permission justification paragraph explaining why `<all_urls>` is required

---

## Don't Hand-Roll

| Problem                           | Don't Build                      | Use Instead                               | Why                                           |
| --------------------------------- | -------------------------------- | ----------------------------------------- | --------------------------------------------- |
| Cross-browser manifest generation | Manual manifest.json per browser | WXT build system (already in use)         | Handles MV2/MV3 differences automatically     |
| Environment-specific API URLs     | Conditional logic in source code | WXT `.env.production` + `import.meta.env` | Build-time substitution, no runtime branching |
| Extension packaging               | Manual zip creation              | `npm run zip` / `npm run zip:firefox`     | Already configured, handles source zip too    |

**Key insight:** WXT already handles all the build complexity. The only code changes needed are replacing 4 hardcoded strings with `import.meta.env.WXT_API_URL`.

---

## Firefox MV2 Policy - D-14 RESOLVED

**Finding:** Firefox AMO continues to accept new MV2 submissions. Mozilla has confirmed:

- No MV2 deprecation planned for the foreseeable future
- 12 months advance notice required before any future deprecation
- MV2 and MV3 are both supported for new submissions as of 2026

**Recommendation:** Submit the existing `firefox-mv2` build. No MV3 Firefox build needed.
[CITED: https://extensionworkshop.com/documentation/publish/distribute-manifest-versions/ + https://blog.mozilla.org/addons/2024/03/13/manifest-v3-manifest-v2-march-2024-update/]

---

## Common Pitfalls

### Pitfall 1: Submitting Pre-Built Zips With localhost

**What goes wrong:** The existing `.output/*.zip` files contain `http://localhost:3002/api` in the manifest host_permissions and in bundled JS. Submitting these will cause Chrome review rejection (localhost permissions not allowed in published extensions) and break production functionality.
**Why it happens:** The current build was done without production env config.
**How to avoid:** Fix the 4 localhost references (D-03), create `.env.production`, rebuild, re-zip before submitting.
**Warning signs:** `grep -r "localhost" extension-v2/.output/` finds hits after building.

### Pitfall 2: Firefox CORS Failure at Runtime

**What goes wrong:** After publishing, Firefox users log in successfully but all API calls fail with CORS errors because `moz-extension://` UUID origins are rejected by the backend.
**Why it happens:** The CORS pattern in `quikadmin/src/index.ts` only covers `chrome-extension://` (32-char alpha). Firefox uses UUID format.
**How to avoid:** Add `moz-extension://` UUID regex to `allowedPatterns` before deployment.
**Warning signs:** Test the Firefox extension against production backend — all fetch calls return CORS error.

### Pitfall 3: Chrome Review Rejection for `<all_urls>`

**What goes wrong:** Chrome Web Store reviewers reject extensions with broad host permissions that lack clear justification.
**Why it happens:** `<all_urls>` is a high-scrutiny permission. Reviews for extensions using it take longer.
**How to avoid:** Per D-05/D-06, include a single-purpose statement in the Privacy tab of the developer dashboard and in the listing description. The justification must explain why field detection on any website is required for a form autofill tool.
**Warning signs:** Review takes >7 days usually indicates policy scrutiny.

### Pitfall 4: Privacy Policy Not Live Before Submission

**What goes wrong:** Both stores require a public privacy policy URL. Submitting before intellifill.com/privacy is deployed with extension disclosures causes rejection.
**Why it happens:** The privacy policy update and marketing site deploy must happen before store submission.
**How to avoid:** Sequence: (1) update privacy.astro, (2) deploy marketing site, (3) verify URL is live, (4) submit to stores.
**Warning signs:** Trying to access intellifill.com/privacy before the marketing site is redeployed.

### Pitfall 5: Source Code Submission Required for Firefox

**What goes wrong:** Firefox AMO requires source code submission when the extension uses minified/bundled code (which WXT produces). Failing to provide it causes review hold.
**Why it happens:** AMO policy: if reviewers cannot read the source from the XPI, they require a separate source zip.
**How to avoid:** Submit `intellifill-extension-2.0.0-sources.zip` (already generated by WXT) along with the Firefox XPI. Add reviewer notes explaining the build process: `cd extension-v2 && npm install && npm run build:firefox`.
[CITED: https://extensionworkshop.com/documentation/publish/submitting-an-add-on/]

### Pitfall 6: Screenshots Must Match Production Build

**What goes wrong:** If screenshots are captured with a dev build pointing to localhost, popup may show "localhost" URLs or dev-mode UI states.
**Why it happens:** Dev and production builds differ in API endpoint display.
**How to avoid:** Capture screenshots after building and loading the production build in browser.

---

## Code Examples

### WXT manifest function with mode-based host_permissions

```typescript
// Source: https://wxt.dev/guide/essentials/config/environment-variables.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: ({ mode }) => ({
    name: 'IntelliFill - Smart Form Autofill',
    description:
      'Automatically fill forms using your stored profile data from documents you have uploaded',
    version: '2.0.0',
    permissions: ['storage', 'alarms'],
    host_permissions:
      mode === 'production'
        ? ['https://app.intellifill.com/api/*']
        : ['https://app.intellifill.com/api/*', 'http://localhost:3002/api/*'],
    icons: {
      '16': 'icons/icon-16.png',
      '48': 'icons/icon-48.png',
      '128': 'icons/icon-128.png',
    },
  }),
  runner: {
    startUrls: ['https://example.com'],
  },
});
```

### Backend CORS: adding moz-extension support

```typescript
// quikadmin/src/index.ts — in allowedPatterns array
const allowedPatterns = [
  /^https:\/\/intellifill-[a-z0-9]{6,20}\.vercel\.app$/,
  /^https:\/\/intellifill-git-[a-z0-9-]+-[a-z0-9-]+\.vercel\.app$/,
  /^http:\/\/localhost:\d{4,5}$/,
  // Chrome/Edge browser extensions (32-char lowercase alpha ID)
  /^chrome-extension:\/\/[a-z]{32}$/,
  // Firefox browser extensions (UUID format)
  /^moz-extension:\/\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
];
```

---

## State of the Art

| Old Approach                   | Current Approach                                         | Impact                                                |
| ------------------------------ | -------------------------------------------------------- | ----------------------------------------------------- |
| MV2 required for all browsers  | Chrome requires MV3; Firefox supports both               | IntelliFill already built on MV3 for Chrome (correct) |
| Manual cross-browser builds    | WXT framework handles both targets                       | Already using WXT — no change needed                  |
| Firefox deprecated MV2 (rumor) | Firefox confirmed MV2 still accepted with no sunset date | Submit existing MV2 Firefox build                     |

---

## Runtime State Inventory

> This is a release/submission phase — no rename/refactor. Relevant build artifacts noted.

| Category            | Items Found                                                   | Action Required                              |
| ------------------- | ------------------------------------------------------------- | -------------------------------------------- |
| Stored data         | None — extension storage is per-user local browser state      | None                                         |
| Live service config | Backend CORS missing `moz-extension://` pattern               | Code edit in `quikadmin/src/index.ts`        |
| OS-registered state | None                                                          | None                                         |
| Secrets/env vars    | No secrets in extension build; `WXT_API_URL` is not a secret  | None — add `.env.production` with public URL |
| Build artifacts     | `extension-v2/.output/*.zip` built with localhost URL — STALE | Rebuild after localhost fix                  |

---

## Environment Availability

| Dependency                               | Required By             | Available                   | Version  | Fallback                       |
| ---------------------------------------- | ----------------------- | --------------------------- | -------- | ------------------------------ |
| Node.js                                  | WXT build               | Yes                         | v20.19.0 | —                              |
| npm                                      | WXT build               | Yes                         | 10.8.2   | —                              |
| Chrome Web Store account                 | Chrome submission       | Unknown                     | —        | Register ($5 one-time fee)     |
| Firefox AMO account                      | Firefox submission      | Unknown                     | —        | Register (free)                |
| intellifill.com/privacy                  | Store listing URL       | Depends on marketing deploy | —        | Must be live before submission |
| Production backend (app.intellifill.com) | Extension functionality | Yes (deployed per STATE.md) | —        | —                              |

**Missing dependencies with no fallback:**

- Store developer accounts: must be registered before submission. Chrome requires $5 one-time fee. Firefox is free.
- Privacy policy must be deployed at a live public URL before submitting to either store.

**Missing dependencies with fallback:**

- None with viable code-level alternatives.

---

## Validation Architecture

> Phase involves store submission (a process/manual workflow) rather than new code logic. Validation is smoke-test level.

### Test Framework

| Property           | Value                                     |
| ------------------ | ----------------------------------------- |
| Framework          | Vitest 4.0.18                             |
| Config file        | `extension-v2/vitest.config.ts`           |
| Quick run command  | `cd extension-v2 && npm test`             |
| Full suite command | `cd extension-v2 && npm test` (242 tests) |

### Phase Requirements → Test Map

| Behavior                                      | Test Type       | Automated Command                                                        | Notes                               |
| --------------------------------------------- | --------------- | ------------------------------------------------------------------------ | ----------------------------------- |
| Production build has no localhost in manifest | Smoke           | `grep -r localhost extension-v2/.output/chrome-mv3/manifest.json`        | Manual verification                 |
| API client uses production URL                | Unit/smoke      | `npm test` (existing api-contract tests cover API calls)                 | Existing tests pass                 |
| Firefox CORS works                            | Integration     | Manual test: load Firefox build, attempt login against production        | Requires Firefox + extension loaded |
| Privacy policy URL accessible                 | Smoke           | `curl -s -o /dev/null -w "%{http_code}" https://intellifill.com/privacy` | Manual pre-submission check         |
| Store zips valid                              | Tool validation | Chrome: upload to dashboard for validation; Firefox: AMO validator       | Manual                              |

### Wave 0 Gaps

- No new test files needed — existing 242 tests cover core logic
- Add a build-verification script to check for localhost in output artifacts (optional but low-effort)

---

## Security Domain

### Applicable ASVS Categories

| ASVS Category         | Applies                                             | Standard Control                                            |
| --------------------- | --------------------------------------------------- | ----------------------------------------------------------- |
| V2 Authentication     | Yes — extension stores JWT in browser.storage.local | WXT storage layer (already implemented)                     |
| V3 Session Management | Yes — refresh token via httpOnly cookie             | Already implemented in api-client.ts                        |
| V4 Access Control     | No — extension has single user, no ACL              | n/a                                                         |
| V5 Input Validation   | Yes — field metadata sanitized before LLM           | Already implemented in extension.routes.ts (sanitize regex) |
| V6 Cryptography       | No — no custom crypto                               | n/a                                                         |

### Known Threat Patterns for Browser Extension + Store Submission

| Pattern                                     | STRIDE                 | Standard Mitigation                                   |
| ------------------------------------------- | ---------------------- | ----------------------------------------------------- |
| Auth token theft via XSS in extension popup | Information Disclosure | React + CSP in popup (WXT handles)                    |
| Prompt injection via malicious form fields  | Tampering              | Already mitigated in extension.routes.ts sanitization |
| localhost URL in production extension       | Information Disclosure | D-01/D-02/D-03 fixes (this phase)                     |
| Broad CORS allows any moz-extension         | Elevation of Privilege | Validate UUID format (regex anchored)                 |
| Privacy policy URL 404 at submission time   | Process                | Deploy marketing site before submitting               |

---

## Open Questions

1. **Chrome Web Store account status**
   - What we know: A $5 one-time fee is required for a developer account
   - What's unclear: Does the project already have a registered CWS developer account?
   - Recommendation: Planner should include an account registration check/task as a prerequisite

2. **Firefox AMO account status**
   - What we know: Free Mozilla account required
   - What's unclear: Does the project have an AMO developer account?
   - Recommendation: Same as above — verify or register before submission tasks

3. **Marketing site deploy cadence**
   - What we know: `marketing/` is a separate Vercel project; privacy.astro is the file to update
   - What's unclear: Is a separate deploy step needed, or does pushing to main trigger auto-deploy?
   - Recommendation: Planner should include explicit Vercel deploy verification after privacy policy update

4. **Source zip for Firefox**
   - What we know: `intellifill-extension-2.0.0-sources.zip` exists already (WXT generates it)
   - What's unclear: Does the sources zip need to be rebuilt after the localhost fix?
   - Recommendation: Yes — rebuild sources zip after env fix so reviewer gets accurate source

---

## Assumptions Log

| #   | Claim                                                                 | Section                  | Risk if Wrong                                                        |
| --- | --------------------------------------------------------------------- | ------------------------ | -------------------------------------------------------------------- |
| A1  | Firefox AMO accepts new MV2 submissions (no cutoff in 2026)           | Firefox MV2 Policy       | If wrong: must create MV3 Firefox build before submission            |
| A2  | `app.intellifill.com` backend is live and handling production traffic | Environment Availability | If wrong: extension would work but API calls fail in production test |
| A3  | `intellifill.com` marketing site auto-deploys on push to main         | Open Questions           | If wrong: privacy policy won't go live until manual deploy trigger   |

---

## Sources

### Primary (HIGH confidence)

- [VERIFIED: codebase] `extension-v2/wxt.config.ts` — confirmed localhost in host_permissions
- [VERIFIED: codebase] `extension-v2/shared/constants.ts` — confirmed DEFAULT_API_URL = localhost
- [VERIFIED: codebase] `extension-v2/shared/types/settings.ts` — confirmed DEFAULT_SETTINGS.apiEndpoint = localhost
- [VERIFIED: codebase] `extension-v2/entrypoints/background.ts` line 178 — confirmed hardcoded localhost in onInstalled
- [VERIFIED: codebase] `quikadmin/src/index.ts` line 187 — chrome-extension regex present, moz-extension absent
- [VERIFIED: codebase] `extension-v2/.output/chrome-mv3/manifest.json` — confirmed localhost in host_permissions of built artifact
- [VERIFIED: codebase] `extension-v2/.output/` — confirmed both zip files exist from Feb 27 build
- [CITED: https://extensionworkshop.com/documentation/publish/distribute-manifest-versions/] — Firefox MV2 still accepted
- [CITED: https://wxt.dev/guide/essentials/config/environment-variables.html] — WXT .env.production pattern
- [CITED: https://developer.chrome.com/docs/webstore/publish] — Chrome Web Store submission steps

### Secondary (MEDIUM confidence)

- [CITED: https://extensionworkshop.com/documentation/publish/submitting-an-add-on/] — Firefox source code submission required for minified builds
- [CITED: https://blog.mozilla.org/addons/2024/03/13/manifest-v3-manifest-v2-march-2024-update/] — Mozilla MV2 no-deprecation statement
- [CITED: https://developer.chrome.com/docs/webstore/review-process] — broad host permissions extend review time

### Tertiary (LOW confidence)

- Chrome review timeline of ~3 days — widely reported but not guaranteed
- Firefox review timeline — varies, typically faster for small extensions

---

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH — verified from codebase
- Architecture patterns: HIGH — verified from codebase + official WXT docs
- Firefox MV2 policy: HIGH — cited from official Mozilla blog + Extension Workshop
- CORS gap: HIGH — verified by grep showing moz-extension absent
- Pitfalls: HIGH — grounded in verified code state and official store policies

**Research date:** 2026-04-05
**Valid until:** 2026-05-05 (store policies stable; WXT 0.19.x API stable)
