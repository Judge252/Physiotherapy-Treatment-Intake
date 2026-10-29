# Form 5 verification

Source: form 3. Content: the supplied physiotherapy intake DOCX. Logo: form 4/logo.png.

- 27 fields across six sections; Hebrew RTL preserved.
- The original .env was copied byte-for-byte without changing its keys or values.
- Doctor examination yes/no, doctor specialty and examination type use the document's choices. VAS uses a 0–10 dropdown.
- The DOCX contains no action button labels; the original create-and-send action was retained.
- `npm test`: 7 passed, 0 failed (six subtests and their parent). Includes real PDF generation, schema validation, invalid-choice rejection, HTML escaping, HTTP endpoints and mock-mail duplicate prevention.
- `node qa-browser.cjs`: desktop 1440px, tablet 768px and mobile 320px passed; no horizontal overflow, missing fields, unloaded logo or page errors. Required-field validation, failed-mail preservation, retry and successful reset passed with mock email.
- Generated sample PDF: two A4 pages, both visually inspected. The signature field is included in physiotherapist details.
- Windows local Chrome fallback verified through tests without an executable-path environment override.
- Live Resend delivery and hosted deployment were not tested.
- Dependencies were preserved from form 3. npm audit reported 11 findings: 4 low, 1 moderate, 5 high and 1 critical. No dependency upgrades were applied as part of this clone.

Start locally with `npm start`. The default port is 3000 unless PORT is supplied. QA artifacts are in the ignored qa directory. Do not commit .env or generated medical documents.
