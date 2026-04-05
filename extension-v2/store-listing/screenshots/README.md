# Screenshot Capture Guide & Store Submission Checklists

This directory holds screenshots for Chrome Web Store and Firefox AMO submissions.
Follow the instructions below to capture the required screenshots, then use the
checklists to complete each store submission.

---

## Screenshot Capture Instructions

### Requirements

- **Dimensions:** 1280x800 (recommended) or 640x400 minimum
- **Format:** PNG
- **Minimum count:** 1 per store (3 recommended)
- **Content:** Show the extension in action on a real form

### Recommended Screenshots

| #   | Filename (suggested)     | Content                                                          |
| --- | ------------------------ | ---------------------------------------------------------------- |
| 1   | `01-popup-logged-in.png` | Extension popup open, user logged in, profile summary visible    |
| 2   | `02-autocomplete.png`    | Autocomplete dropdown appearing on a form field with suggestions |
| 3   | `03-filled-form.png`     | Form fields filled after using Alt+Shift+F (fill-all shortcut)   |

---

### Step-by-Step: Chrome Screenshot Capture

**Prerequisites:** Production build exists at `extension-v2/.output/chrome-mv3/` (built in Plan 01).

1. Open Chrome and navigate to `chrome://extensions`
2. Enable **Developer Mode** (toggle in the top-right corner)
3. Click **Load Unpacked** and select the folder `extension-v2/.output/chrome-mv3/`
4. Pin the IntelliFill extension to your toolbar (puzzle piece icon > pin IntelliFill)
5. Navigate to a form-heavy page. Suggested test pages:
   - A job application form (e.g., any company careers page)
   - A government form (e.g., a registration or contact form)
   - Any multi-field signup/checkout page
6. Log in to the extension via the popup (connect to `app.intellifill.com`)

**Screenshot 1 — Popup (logged-in state):**

- Click the IntelliFill toolbar icon
- Confirm the popup shows your profile name (not a localhost URL)
- Set browser window to 1280x800 (or use DevTools device emulation for exact sizing)
- Capture screenshot

**Screenshot 2 — Autocomplete dropdown:**

- Click into any text input field on the form
- Wait for the IntelliFill autocomplete dropdown to appear with suggestions
- Capture screenshot showing the dropdown over the field

**Screenshot 3 — Filled form:**

- With the form page open, press **Alt+Shift+F** to fill all detected fields
- Capture screenshot showing multiple form fields populated with your profile data

**Save screenshots** as PNG files in this directory (`extension-v2/store-listing/screenshots/`).

---

### Step-by-Step: Firefox Screenshot Capture

**Prerequisites:** Firefox production build exists at `extension-v2/.output/firefox-mv2/`.

1. Open Firefox and navigate to `about:debugging`
2. Click **This Firefox** in the left sidebar
3. Click **Load Temporary Add-on...**
4. Navigate to `extension-v2/.output/firefox-mv2/` and select `manifest.json`
5. The extension is now loaded. Find its icon in the Firefox toolbar.

> **Note:** Temporary add-ons are removed when Firefox restarts. For persistent testing,
> use a Developer Edition Firefox profile.

Follow the same screenshot steps as Chrome above. The UI and behavior are identical.
Firefox screenshots can be the same images as Chrome — both stores accept the same PNGs.

---

## Chrome Web Store Submission Checklist

### Pre-Submission

- [ ] Developer account registered at https://chrome.google.com/webstore/devconsole ($5 one-time fee)
- [ ] Privacy policy live at https://intellifill.com/privacy (verify: `curl -s -o /dev/null -w "%{http_code}" https://intellifill.com/privacy` should return `200`)
- [ ] Privacy page contains "Browser Extension Data Practices" section
- [ ] Screenshots captured (at least 1, recommended 3) at 1280x800 or 640x400
- [ ] Production zip built: `extension-v2/.output/intellifill-extension-2.0.0-chrome.zip`

Verify zip exists:

```bash
ls -lh extension-v2/.output/intellifill-extension-2.0.0-chrome.zip
```

### Submission Steps

1. Go to https://chrome.google.com/webstore/devconsole
2. Click **New Item** > upload zip: `extension-v2/.output/intellifill-extension-2.0.0-chrome.zip`
3. **Store Listing tab:**
   - **Description:** paste from `extension-v2/store-listing/chrome-description.md`
     (use the entire "Detailed Description" section)
   - **Short description (132 chars max):** paste from the "Short Description" section
     > Smart form autofill powered by your uploaded documents. Fill any web form instantly with AI-matched profile data.
   - **Screenshots:** upload PNG files from `extension-v2/store-listing/screenshots/`
   - **Category:** Productivity
   - **Language:** English (United States)
4. **Privacy tab:**
   - **Single purpose:** paste from `extension-v2/store-listing/permission-justification.md`
     (the "Single-Purpose Description" section)
   - **Privacy policy URL:** `https://intellifill.com/privacy`
   - **Data use disclosures:** fill checkboxes per the "Data Use Disclosure" table in
     `permission-justification.md`:
     - PII: YES (cached locally for form autofill)
     - Auth/Credentials: YES (session tokens in browser.storage.local)
     - Web History: NO
     - User Activity: NO
     - Financial Info: NO
     - Health Info: NO
     - Communications: NO
   - **Host permissions justification:** paste from `permission-justification.md`
     (the "Why We Need Host Permissions" section)
5. Click **Submit for Review**

### Post-Submission

- **Expected review time:** 1–7 business days
- Reviews involving `<all_urls>` permissions often take longer (up to 14 days)
- You will receive an email when the review is complete
- If rejected: the rejection email will specify the reason; common fixes are documented
  in the Chrome Web Store developer policies

---

## Firefox AMO Submission Checklist

### Pre-Submission

- [ ] Mozilla account created at https://addons.mozilla.org/developers/ (free)
- [ ] Privacy policy live at https://intellifill.com/privacy
- [ ] Screenshots captured (at least 1)
- [ ] Production zip ready: `extension-v2/.output/intellifill-extension-2.0.0-firefox.zip`
- [ ] Source zip ready: `extension-v2/.output/intellifill-extension-2.0.0-sources.zip`

> **Why source zip?** Firefox AMO requires source code submission for extensions that use
> build tools (like WXT/webpack). AMO reviewers build from source to verify the zip matches.

Verify both zips exist:

```bash
ls -lh extension-v2/.output/intellifill-extension-2.0.0-firefox.zip
ls -lh extension-v2/.output/intellifill-extension-2.0.0-sources.zip
```

If the sources zip is missing, generate it:

```bash
cd extension-v2 && npm run zip:firefox
```

WXT generates both the Firefox zip and a sources zip automatically.

### Submission Steps

1. Go to https://addons.mozilla.org/developers/
2. Click **Submit a New Add-on**
3. Select **On this site** (public listing) and click **Continue**
4. Upload: `extension-v2/.output/intellifill-extension-2.0.0-firefox.zip`
5. When asked **"Do you need to submit source code?"** — select **YES**
   - Upload: `extension-v2/.output/intellifill-extension-2.0.0-sources.zip`
   - **Reviewer notes (copy-paste):**
     ```
     Build: cd extension-v2 && npm install && npm run build:firefox
     Framework: WXT (wxt.dev) — handles cross-browser manifest generation.
     Output: extension-v2/.output/firefox-mv2/
     To produce a distributable zip: npm run zip:firefox
     Node.js 18+ required.
     ```
6. **Listing Details:**
   - **Summary (250 chars max):** paste from `extension-v2/store-listing/firefox-description.md`
     (the "Summary" section)
     > IntelliFill is a smart form autofill extension that fills web forms using your stored profile data, extracted from documents you upload at app.intellifill.com.
   - **Description:** paste from `firefox-description.md` (the "Description" section)
   - **Screenshots:** upload PNG files from `extension-v2/store-listing/screenshots/`
   - **Privacy policy URL:** `https://intellifill.com/privacy`
   - **License:** select your preferred license (or "All Rights Reserved" if proprietary)
7. Click **Submit Version**

### Post-Submission

- **Expected review time:** 1–5 business days
- Firefox AMO auto-signs extensions while manual review is in progress, so users can
  install the extension immediately from the listing page
- If changes are requested, update the extension version, rebuild, and resubmit

---

## Quick Readiness Check

Run these commands before submitting to either store:

```bash
# 1. Privacy policy is live with extension section
curl -s https://intellifill.com/privacy | grep -c "Browser Extension Data Practices"
# Expected: 1 or more

# 2. No localhost in Chrome manifest
grep -r "localhost" extension-v2/.output/chrome-mv3/manifest.json
# Expected: no output

# 3. Chrome zip exists
ls -lh extension-v2/.output/intellifill-extension-2.0.0-chrome.zip
# Expected: file with recent timestamp

# 4. Firefox zip exists
ls -lh extension-v2/.output/intellifill-extension-2.0.0-firefox.zip
# Expected: file with recent timestamp

# 5. Screenshots exist
ls extension-v2/store-listing/screenshots/*.png 2>/dev/null && echo "SCREENSHOTS FOUND" || echo "SCREENSHOTS MISSING — capture per instructions above"
```
