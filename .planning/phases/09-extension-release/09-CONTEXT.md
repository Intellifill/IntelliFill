# Phase 9: Extension Release - Context

**Gathered:** 2026-04-05 (assumptions mode)
**Status:** Ready for planning

<domain>
## Phase Boundary

Ship the IntelliFill browser extension to Chrome Web Store and Firefox Add-ons. This phase covers everything needed to go from "built and tested locally" to "publicly available in browser stores": store listing preparation, compliance/policy requirements, production configuration, submission process, and any backend readiness needed for production extension traffic.

</domain>

<decisions>
## Implementation Decisions

### API Endpoint & Host Permissions

- **D-01:** Strip `http://localhost:3002/api/*` from manifest host_permissions in production builds; set DEFAULT_API_URL to `https://app.intellifill.com/api` for store builds
- **D-02:** Use WXT build-time environment config to differentiate dev (localhost) vs production (app.intellifill.com) — keep localhost for sideload/development only
- **D-03:** Update all 4 hardcoded localhost references: `shared/constants.ts`, `shared/types/settings.ts`, `entrypoints/background.ts` onInstalled handler, `wxt.config.ts` host_permissions

### Content Script Permissions

- **D-04:** Keep `<all_urls>` match pattern — it's necessary for a form autofill extension that must detect fields on any website
- **D-05:** Provide detailed single-purpose justification in Chrome Web Store submission form and listing description explaining the extension is a form autofill tool requiring broad page access
- **D-06:** Prepare clear "why we need this permission" text for both Chrome and Firefox review teams

### Privacy Policy

- **D-07:** Extend existing privacy policy at `marketing/src/pages/privacy.astro` with browser extension-specific disclosures
- **D-08:** Disclosures must cover: form field metadata reading on all pages, auth token storage in browser storage, data sent to backend LLM endpoint (`/extension/infer-fields`), profile data caching (5-min TTL)
- **D-09:** Privacy policy URL must be accessible at a public URL (e.g., intellifill.com/privacy) and linked in both store listings

### Store Listing Assets

- **D-10:** Create screenshots by running the extension on sample forms — capture popup UI, autocomplete dropdown, and fill-all keyboard shortcut in action
- **D-11:** Chrome requires: at least 1 screenshot (1280x800 or 640x400), detailed description, single-purpose justification
- **D-12:** Firefox requires: at least 1 screenshot, description, privacy policy URL
- **D-13:** Expand manifest description beyond the current single sentence to a full store listing with feature highlights

### Firefox MV2 vs MV3

- **D-14:** Verify whether Firefox still accepts new MV2 submissions — if not, create MV3 Firefox build (research needed)

### Claude's Discretion

- Screenshot composition and styling
- Exact wording of store listing descriptions (within the constraints above)
- Order of submission (Chrome first vs both simultaneously)
- Promotional tile/banner image design (optional for Chrome, nice-to-have)

</decisions>

<canonical_refs>

## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Extension Source

- `extension-v2/wxt.config.ts` — Build config, manifest generation, host_permissions
- `extension-v2/shared/constants.ts` — DEFAULT_API_URL, CACHE_TTL constants
- `extension-v2/shared/types/settings.ts` — ExtensionSettings type with apiEndpoint default
- `extension-v2/entrypoints/background.ts` — Service worker, onInstalled defaults, API communication
- `extension-v2/entrypoints/content.ts` — Content script, `<all_urls>` match pattern, field detection
- `extension-v2/entrypoints/popup/App.tsx` — Popup UI (screenshots source)
- `extension-v2/lib/api-client.ts` — Backend API endpoints used by extension
- `extension-v2/shared/storage.ts` — WXT storage layer (auth tokens, settings)
- `extension-v2/package.json` — Build scripts, version 2.0.0

### Backend API

- `quikadmin/src/api/extension.routes.ts` — `/extension/infer-fields` LLM endpoint
- `quikadmin/src/api/auth.routes.ts` — Auth endpoints used by extension

### Privacy & Legal

- `marketing/src/pages/privacy.astro` — Existing privacy policy (needs extension additions)

### Build Artifacts

- `extension-v2/.output/chrome-mv3/` — Chrome MV3 production build
- `extension-v2/.output/firefox-mv2/` — Firefox MV2 production build
- `extension-v2/.output/intellifill-extension-2.0.0-chrome.zip` — Packaged Chrome build
- `extension-v2/.output/intellifill-extension-2.0.0-firefox.zip` — Packaged Firefox build

</canonical_refs>

<code_context>

## Existing Code Insights

### Reusable Assets

- Pre-built zip files ready for submission (after localhost fix)
- Extension icons at all required resolutions (16, 48, 128px)
- 242 passing tests covering core logic (field-matcher, field-detector, form-filler, background, api-contract)
- WXT framework handles cross-browser manifest generation

### Established Patterns

- WXT build system with `npm run build` (Chrome) and `npm run build:firefox` (Firefox)
- `npm run zip` packages builds for distribution
- `npm run typecheck` for TypeScript validation
- Environment-based configuration via `.env` files

### Integration Points

- Extension → Backend: `/auth/v2/login`, `/auth/v2/refresh`, `/users/me/profile`, `/extension/infer-fields`
- Production backend at `app.intellifill.com/api` must handle extension traffic
- Privacy policy at `intellifill.com/privacy` must be deployed before store submission
- Backend CORS must allow requests from browser extension origin

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches for store submission.

</specifics>

<deferred>
## Deferred Ideas

- WCAG 2.1 AA accessibility audit for extension UI — separate effort
- Extension analytics/telemetry — future phase
- Auto-update mechanism beyond browser store updates — not needed (stores handle this)
- Terms of Service page creation — noted in STATE.md deferred issues, could be bundled but is technically separate

</deferred>

---

_Phase: 09-extension-release_
_Context gathered: 2026-04-05_
