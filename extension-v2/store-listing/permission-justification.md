# Permission Justification — IntelliFill

## Single-Purpose Description

_(For Chrome Web Store Privacy tab — "Single purpose" field)_

IntelliFill is a single-purpose form autofill extension. Its sole function is to detect form fields on web pages and fill them with the user's stored profile data. It requires access to all URLs because web forms exist on any website — job applications, checkout pages, government portals, registration forms — and the extension cannot predict in advance which sites the user will visit. Every feature in the extension (field detection, autocomplete suggestions, fill-all shortcut, popup dashboard) directly serves this single purpose of form autofill.

---

## Why We Need Host Permissions

_(For Chrome and Firefox review teams — explain `<all_urls>` / `host_permissions`)_

IntelliFill requests broad host permissions for the following reasons:

1. **Form autofill must work on any website.** Web forms appear across millions of sites — e-commerce checkouts, job boards, government portals, healthcare providers, school enrollment systems, and more. The extension must be able to inject its content script on whatever page the user is filling out. There is no way to enumerate all possible form sites in advance.

2. **Only form field metadata is read.** The content script reads only input field attributes: `name`, `id`, `label` (text content of associated `<label>` elements), `type`, and `placeholder`. It does not read page content, DOM outside form fields, cookies, local storage of other sites, browsing history, or any values the user has already typed into fields.

3. **No tracking, no passive data collection.** The extension does not monitor page visits, record navigation events, log URLs the user visits, or perform any activity outside of an active fill session. Host permission is used solely to inject the field-detection content script when the user interacts with the extension.

4. **Minimal data transmission.** Only field metadata (not page content or user-typed values) is sent to our backend at `app.intellifill.com/api/extension/infer-fields` for AI-powered field matching. This API call occurs only when the user triggers autofill — not passively on every page load.

---

## Data Use Disclosure

_(For Chrome Web Store Privacy tab — "Data use" declarations)_

| Data Type                                 | Collected | Details                                                                                                                                                                                                |
| ----------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Personally Identifiable Information (PII) | YES       | User's profile data (name, address, etc.) is cached locally in `browser.storage.local` for up to 5 minutes. Profile data originates from user-uploaded documents and is used solely for form autofill. |
| Authentication / Credentials              | YES       | Login session token and refresh token are stored in `browser.storage.local`. Tokens are scoped to the extension and never synced to cloud storage or shared across devices.                            |
| Web History                               | NO        | The extension does not record, store, or transmit the URLs of pages the user visits.                                                                                                                   |
| User Activity Monitoring                  | NO        | The extension does not monitor keystrokes, mouse movements, scroll position, or any user behavior outside of explicit autofill interactions.                                                           |
| Financial / Payment Info                  | NO        | No payment data is collected or stored by the extension.                                                                                                                                               |
| Health Information                        | NO        | No health or medical data is collected or stored by the extension.                                                                                                                                     |
| Communications                            | NO        | No email, SMS, or other communication content is accessed by the extension.                                                                                                                            |

**Data Sharing:** Extension data is not sold, shared with third parties, or used for advertising purposes. Data sent to our servers is used solely to provide the field-matching feature and is not retained beyond the duration of the API call.

**Privacy Policy:** https://intellifill.com/privacy
