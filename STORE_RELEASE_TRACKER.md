# Sproutly store launch and acquisition — November 3, 2026

Framework: Expo SDK 55 / React Native / Node / SQLite, retained. Source inspected frontend 07dda422f4fc952b578b831fbd0ffa4540688bd5; backend b34e04617ddd8bef94a1795ac6058abcbf8f28d4. Current distributable is signed Android pilot 0.1.5/code 6, not a Play release. No signed iOS release verified.

## Release gates

| Gate | Status | Evidence / next action |
|---|---|---|
| Existing implementation | Verified source | Technical board and both public repos inspected |
| Public privacy/support/deletion pages | Live verified Nov 2 | HTTP 200 and standalone content verified; beta onboarding page prepared Nov 3, deployment evidence follows |
| Android AAB build/signing | Original key recovered; AAB not built | Nov 3 keytool certificate matches published pilot: 9fc8d7beb48216a0810a84d46076b856f2930c77f03152d0786a13dca4dcf0fb. Signing remains private. Release patch now fails closed if Expo template changes; generated template validation passes. This environment has JDK 17 but no Android SDK/NDK or SDK license records; no new agreement accepted |
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
| Organic posts | Two published and verified Nov 3 | James profile and Alambda Systems page; public permalinks below. Social campaign tracker updated for deduplication. No group post, DMs, invitations or spend |

## Acquisition baseline and counting rules

Verified first-time non-QA installs evidenced in this tracker: **0**. Actual population: **unknown**, not measured. No store dashboard or install telemetry is connected. ACQUISITION.md and acquisition-report.mjs now support reviewed private pilot evidence with deduplication, QA exclusions, channel/platform cohorts and D1/D7 returns. ACQUISITION_STATUS.json is the zero-evidence baseline; no user observations were supplied. This is an operator tool, not automatic telemetry or device attestation. APK asset download counts, website visits, demo accounts and member counts must not be called installs.

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

## November 3 implementation and validation

- Re-read both repository heads and TECHNICAL_BOARD.md before changes. No framework migration or repeat feature implementation. GitHub issue search for the frontend returned no issues.
- Original Android signing recovery material recovered privately; keytool verifies the exact certificate of pilot 0.1.5. No private signing values or archive are in this repository.
- Added fail-closed release signing and regressions; current Expo Android prebuild and actual generated Gradle patch pass. No APK/AAB or iOS binary produced. Current app version/code remain 0.1.5/6.
- Added beta.html with working-pilot scope, Android APK link, first-use flow and voluntary beta/feedback email path. No trackers, automatic enrollment, marketing opt-in or installation count triggered by page visits.
- Added private-ledger acquisition reporter. Rejects missing evidence, future/invalid dates, web-as-install and duplicate event IDs; deduplicates people; excludes QA/demo/staff; separates downloads, provisional launches and store reports. Tests use synthetic evidence only and never enter acquisition totals.
- Current frontend 30 tests + backend 46 tests pass (76 total); TypeScript and production web export pass. Backend dependencies restored before its successful regression run; no backend source changes.
- Social campaign tracker checked Nov 3 (version 11, updated 18:59 UTC); no Sproutly publication recorded. Personal profile and Alambda page access must be checked live before publication. Existing group reload rejection remains respected.
- Remaining user-only gates: authenticated Play ownership/account type and testing eligibility; Apple Developer team and Expo project/signing access; physical Android/iPhone QA and actual device screenshots; reviewed credentials, privacy labels/Data Safety and policy certification. No enrollment fees, agreements or ads accepted.

## Live deployment and launch evidence — November 3

Frontend source 82e85805f188322cb148a9e9f95ef22b3a6498ff reached Render live in deployment dep-dbl5nf8ae00c73bst9e0 at 22:11:05 UTC. beta.html, privacy.html, support.html and delete-account.html returned HTTP 200 with the exact expected standalone content; API health returned 200. Live beta page rendered with web entry, direct Android download, first-use flow and voluntary feedback path. APK asset HEAD returned HTTP 200, 58,071,615 bytes, Android package MIME type. This checks availability, not physical installation.

Verified public organic publications (posted once after campaign/recent-post checks):

- James / personal: https://www.linkedin.com/feed/update/urn:li:activity:7523507735645310976/
- Alambda Systems: https://www.linkedin.com/feed/update/urn:li:share:7523508362202841088/?actorCompanyId=68920975

Both describe the web/direct Android pilot, invite 20 volunteer growers and accurately state store/hardware preparation. Full copy and author verified at each public permalink. No DMs, unsolicited invitations, paid boosting or group-form bypass. Social campaign publication records updated to prevent duplicates; no general publishing schedule changed.

Counts after publication: **0 verified non-QA installs evidenced; actual installed population unknown**. APK downloads unknown, store reports unavailable, voluntary beta enrollments unmeasured. Publishing reach is not an install. ACQUISITION_STATUS.json remains a zero-observation baseline. Next measurable step is opt-in beta evidence review and real-device acceptance; do not fill the ledger with demo/test observations.

## Codemagic connection — November 3 evening

Existing account access verified; Sproutly connected through the existing GitHub integration as a React Native app. Project https://codemagic.io/app/6aea9e3d1bb9c30e396c71d9/settings . Billing showed 0/500 free macOS minutes used and no active paid subscription. Only the unrelated starter-app keystore was present; it is not used for Sproutly.

Added a manual, AAB-only Codemagic workflow. Cloud output is deliberately unsigned; original Sproutly signing stays local after download. No new signing credentials, Play API permissions, paid plan or agreement is required for that preparation. Candidate 0.1.6 version code derives from the baseline and CI build number, while the published pilot remains 0.1.5/code 6. See CODEMAGIC_RELEASE.md. Cloud build/result and signed-artifact receipts must be appended after verification, not inferred from a configured workflow. Google Play submission remains unverified and earlier navigation review restriction remains respected.
