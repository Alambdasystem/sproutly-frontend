# Sproutly store launch and acquisition — November 2, 2026

Framework: Expo SDK 55 / React Native / Node / SQLite, retained. Source baseline frontend 5a3be32e8b25cfc2d78fbaaeae19c3aad915ed0d; backend b34e04617ddd8bef94a1795ac6058abcbf8f28d4. Current distributable is signed Android pilot 0.1.5/code 6, not a Play release. No signed iOS release verified.

## Release gates

| Gate | Status | Evidence / next action |
|---|---|---|
| Existing implementation | Verified source | Technical board and both public repos inspected |
| Public privacy/support/deletion pages | Implemented in this change | privacy.html, support.html, delete-account.html copied to dist by pwa-build.mjs; live deployment must be verified |
| Android AAB build path | Implemented, not built | node android-release.mjs --aab selects bundleRelease; original signing env requirements remain; recover original signing material privately before building |
| Store ownership / Play account type | Blocked | Browser navigation to official play.google.com/console was rejected by automatic origin review, which reported an unexpected google.play origin. No bypass attempted. Account access/type/testing eligibility remain unverified |
| Apple team / App Store Connect | Blocked | Observed login page with authResult=FAILED; no authenticated team, app record, paid enrollment or signing verified |
| Expo cloud signing | Unverified | eas.json exists; do not invent owner/project ID or start a paid build |
| Android/iPhone acceptance | Open | No connected physical devices; matrix below must be completed on hardware |
| Store metadata | Draft ready | STORE_LISTING.md, factual pilot claims; owner/policy review still needed |
| Privacy labels / Data Safety | Draft inventory | STORE_LISTING.md; validate against actual final binary and every SDK before certification |
| Review access | Open | Dedicated non-admin review account, tested credentials and instructions required; never store passwords in this public repo |
| Store screenshots | Open | Real Android/iPhone screenshots required; desktop screenshots are not store-device evidence |
| Submission | Not submitted | No Play or Apple submission ID; no review status claimed |
| LinkedIn community | Pending | Earlier form reload denied due unsaved state; do not bypass without approval |
| Organic posts | Not published in this run | Coordinate with social campaign tracker to avoid duplicate promotion; describe pilot status accurately |

## Acquisition baseline and counting rules

Verified first-time non-QA installs evidenced in this tracker: **0**. Actual population: **unknown**, not measured. No store dashboard or install telemetry is connected. APK asset download counts, website visits, demo accounts and member counts must not be called installs.

Track separately: APK downloads; native first launches reported by app; store-reported first-time installs; opted-in beta testers; activation; D1/D7 retention. Native launch reports are provisional until validated; exclude demo/test accounts, staff/QA devices, reinstalls and duplicate identities. Do not fingerprint devices or silently add ad/analytics SDKs. Use store aggregate reporting plus explicit optional pilot measurement consent. Record channel (LinkedIn personal/page/community, organic, direct), platform, build, UTC event/cohort date, QA exclusion and evidence source; no email/token/photo/audio in acquisition logs. Activation = first personal plant or seed project saved and one journal entry or completed care interaction. Count an individual once across known duplicate sources; otherwise disclose unresolved cross-platform overlap. Store totals and first-launch totals must never be added together blindly.

Targets: 20 genuine beta testers → 50 verified installs → 100 verified installs. No guaranteed acquisition date. Report zero evidenced / unknown population until measurement exists. No paid ads, purchased installs, fake ratings or unsolicited messages.

## Delivery sequence

- Nov 2–4: public information pages, build configuration and metadata; verify developer accounts, recovery sender, final policies and consent inventory.
- Nov 5–8: real Android/iPhone matrix, review account, AAB / signed iOS build, internal testing and TestFlight where eligible. Recruit beta testers through authorized organic posts only after access links work.
- Nov 9–15: triage beta failures, handle review feedback, submit/roll out only when gates pass; publish verified store links and measure activation. If a new personal Play account is subject to the 12-testers/14-days gate, production access cannot be assumed by Nov 15. A test starting Nov 2 cannot complete its full 14 days before Nov 16 at the corresponding time.

## Hardware acceptance evidence to collect

For Android and iPhone separately record device/OS, build and signature, tester, date, outcome and evidence for: clean install/update; login/logout/recovery; photo upload/camera/cancellation/denial; Step 2 narrow form and keyboard open/closed, Continue to Step 3 without losing data; voice live words, fallback transcription insertion, speaker captions, mute, interrupt, End during pending speaker shutdown, background/phone interruption; notifications; seed save/journal/Doctor history; export/deletion. No hardware row is passed yet.

## Official references checked November 2

- https://support.google.com/googleplay/android-developer/answer/14151465 — new personal-account closed-test requirements.
- https://support.google.com/googleplay/android-developer/answer/10144311 — user-data/privacy requirements.
- https://developer.apple.com/help/app-review/guideline-reference/5-1-1-account-deletion — in-app deletion.
- https://developer.apple.com/app-store/review/guidelines/ — final review readiness.

## Deployment evidence — November 2, 2026

Frontend source 08d38a31d57d76d164fa11e12f279c12beab092f reached Render live in deployment dep-dbkgggom7kps738can40. Public privacy.html, support.html and delete-account.html each returned HTTP 200 with the expected standalone content, rather than the SPA fallback. The deletion page rendered without sign-in and exposed both direct in-app steps and an external email-request path. Frontend 23 tests, TypeScript and web export passed; Android release script syntax passed. No backend changes or new binary were made. Privacy text remains pilot disclosure pending final store review.
