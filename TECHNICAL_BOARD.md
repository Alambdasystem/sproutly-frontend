# Sproutly technical board — 2026-11-01

The existing Expo / React Native / Node / SQLite framework is retained. This board distinguishes implemented pilot features from launch gates. APK packaging follows feature validation.

| Phase | Implemented | Remaining acceptance or connection |
| --- | --- | --- |
| 1 — Foundations | Owned private records, versions, atomic seed save, replay protection and persistence | Production load and independent security review |
| 2 — Seed Studio | Manual entry, draft recovery, photos, saved packet/project details and Home shortcut | Physical device acceptance |
| 3 — Packet scanning | English OCR + real OpenAI extraction, crop/rotation, 29-field correction/confirmation, originals, optional GBIF references, real QR/EAN/UPC pixel decoding | 30–50 real manufacturer packet benchmark; product lookup key. Synthetic fixtures are not manufacturer accuracy evidence. |
| 4 — Grow plans | Saved growing setup, versioned real OpenAI plans, explicit assumptions/uncertainty, attributable seven-day weather after consent, approximate coordinates | Commercial weather key; verified local frost/zone sources remain manual inputs. Forecast air temperatures are not soil/frost-date data. |
| 5 — Tracking | Confirmed germination ranges, milestones/photos, actual-sowing adjustments, unfinished reminders, completed history, seed-to-plant linking | Physical notification delivery and observation-driven beta acceptance |
| 6 — Doctor | Real ongoing text/photo chat scoped to selected plant/project; saved memory; explicit allowed reminder/note actions; idempotency and quotas | Broader multi-photo botanical evaluation |
| 7 — Rescue | Real 14-day plan, day 3/7/14 check reminders, initial/follow-up photo context, qualitative comparisons and insufficient-evidence category | Real longitudinal recovery evaluation; no guaranteed recovery claim |
| 8 — Voice / identification | Opt-in foreground recording, real OpenAI transcription without server recording retention, device spoken output, three tentative identification alternatives and explicit species corrections | Physical mic/camera, interruptions and accessibility acceptance; specialist identification provider is optional, not connected |
| 9 — Premium | Native RevenueCat adapter, actual store offering/price rendering, purchase/restore/manage paths, backend entitlements, expiry/refund/sandbox checks and authenticated replay-safe webhooks | RevenueCat keys/project, real store products and approved pricing, store test accounts, trial/renewal/restore tests. Enforcement OFF; pilot access is not a paid subscription. |
| 10 — Launch | Private account export, password-confirmed account deletion, subscription cancellation notice, pilot privacy/help, guarded local backups, own-account operations, render error recovery, native secure session storage, bounded AI usage | Verified recovery sender, offsite destination/credentials + remote restore rehearsal, external crash/alert monitoring, final policies/store declarations, beta/device/store acceptance |

## Verified in the 0.1.2 release

- 42 backend automated tests and 9 frontend tests pass; TypeScript and production web export pass.
- Initial feature deployments reached live. Final website deployment `055e1c1ab6715e01d2f3f6604844ffaaf2cc161b` is live. Final API safeguards are in `46339b013b7c3eed0af3732284b12493ed529e7a`, and the Render rollout reached live. Native refinements are committed in frontend `97c3536054bf3f94f2eb23d514aea5b30b33f287`; signed release tag `v0.1.2-android-pilot` points to source `79126558ad2594882d4879c29825c4bffdb33947`. The live website top button targets 0.1.2. Clicking it initiated an APK download that the cloud browser canceled; a physical Android browser download/install remains unverified. Independent public HTTP download and signature verification passed.
- Real deployed OpenAI grow plan: five steps, confirmed numeric germination range; actual sowing milestone and replay-safe linked plant conversion.
- Real deployed Doctor conversation preserves user/assistant history; browser-tested proposal creates a reminder only after explicit click.
- Real deployed OpenAI rescue plan completed. Synthetic audio fixture transcribed accurately by `gpt-transcribe` and returned recordingStored:false. This does not prove hardware recording quality.
- Real Open-Meteo demo forecast returned seven attributed days. No commercial weather subscription was purchased.
- Cross-account project access rejected; private export excludes credentials; account deletion and password reauthentication tested using isolated disposable test databases. A disposable live demo account was exported and deleted, and its old session was rejected. Browser data export downloaded valid credential-free JSON.
- Existing pilot records survived deployment. Android 0.1.2 (versionCode 3) built and passed signature, same-certificate, manifest, two-ABI and 16 KB ZIP alignment checks. All 16 packaged ARM64 shared libraries also passed the 16 KB ELF LOAD-segment alignment inspection. Published at GitHub Releases. Independently downloaded public bytes exactly match the local signed artifact (SHA-256 `da869be0082411a1b441323df364731d45ca1b7ba825645701057366dc9eeb85`); the public APK signature verifies. Physical-device acceptance remains open.

## Launch gates — still open

1. RevenueCat and Google/Apple store setup, approved pricing, sandbox purchase/restore/refund/expiry acceptance.
2. Verified sender for recovery/verification, real inbox delivery.
3. Owner-approved private offsite bucket and least-privilege runtime access; real remote restore rehearsal. Verified daily local SQLite backups remain active with seven-snapshot retention.
4. Physical Android install/update, cold launch, soft keyboard, camera, microphone, Android Back, permission denial, local notification and battery/reboot behavior. No physical device is connected here.
5. Apple Developer/Expo project signing and an iPhone. Linux prebuild is not a signed iOS release.
6. Real packet corpus, botanical identification/diagnosis evaluations, real rescue follow-up study, accessibility review and beta approval.
7. Final terms/privacy/retention and store disclosure review; external crash and availability alert destination. Active REQUEST_METRICS logs request IDs/status/latency without bodies, coordinates, tokens or paths.

Physical-commerce payments/payouts remain separate and simulated. Future Shop is post-launch and feature-flagged work, not a requirement for this care-feature release. No live charges, seller onboarding, commission, paid external plan or store submission was enabled.

Release verification: API request timing logs are active in Render and inspected for status/duration without request content. Updated iOS project generation passes; no signed iOS binary or physical device test is claimed. Android ADB inventory is empty. The downloadable release is a pilot, with launch gates above still open.

Final API regression checks cover the transition from free pilot to enforced plant limits, rescue history deletion protection, and completion of outstanding rescue checkpoint reminders. No new APK is required for these server-side safeguards.

## Plant Doctor voice update — 0.1.3

- Live partial transcripts update the existing composer; recorded fallback previews and confirms inserted text, normalizes browser MIME codecs and preserves failed transcript/recording recovery.
- New Doctor replies read automatically by default with device speech-boundary captions. Spoken turns include concise summary, warnings and follow-up questions. Full guidance remains saved.
- In-app call mode: finalized turns use the authenticated plant/project conversation API; listening pauses during thinking/speaking; mute, interrupt and end controls; ten-minute cap; background/tab-hide/unmount cleanup; no automatic garden actions.
- 19 frontend tests and 43 backend tests pass (62 total). TypeScript and web export pass. Real deployed transcription accepted a codec-qualified synthetic WebM file and returned usable text. This is integration evidence, not microphone or transcription-accuracy certification.
- Android 0.1.3, versionCode 4: native build passes; speech-recognition module is in the APK; signature matches the existing certificate; two phone ABIs; 16 KB ZIP alignment. Public artifact verification is recorded after publication.
- Live speech uses device/browser recognition, not an OpenAI realtime audio transport. Calls take turns and can wait for an AI answer. Speech services/permissions, silence mode, device volume and word-timing callbacks vary; physical Android/iPhone checks remain open. See VOICE_CALLS.md.

Public Android voice pilot 0.1.3: https://github.com/Alambdasystem/sproutly-frontend/releases/tag/v0.1.3-android-pilot . Downloaded public APK matches the final build byte-for-byte and verifies against the existing signing certificate. APK source tag bc15d690bcd8a6f38826084d91391e84f302b49e. Physical microphone/speaker testing remains outstanding. Backend voice codec fix is live at commit 70d8bfa936171c888a34604add623d9d7814ea22.

## Doctor streaming phase — November 1, 2026

Implemented live answer drafts from real OpenAI Responses deltas, authenticated event delivery, saved-job polling recovery, call timer and hang-up stream cancellation. Final structured validation and explicit garden-action confirmation remain in force. Backend source b34e04617ddd8bef94a1795ac6058abcbf8f28d4. 22 frontend + 46 backend tests pass (68 total), web export/typecheck/native build pass. Signed Android 0.1.4/code 5 matches the existing release certificate. Physical audio and browser/device installation are not certified by these checks. Public rollout verification follows publication.

Live API streaming verification passed: first draft at 1,918 ms, final validated answer at 4,019 ms, exactly two saved conversation messages. Backend deployment dep-dbjvpnajnfac7396ef9g is live. Android source tag v0.1.4-android-pilot points to bedc2aebd2e2e159dc2565610bd241d31f3c0742. Public APK signature and byte equality verified. Website download is being updated to 0.1.4.

Final voice pilot refinement: hang-up/background during pending interruption shutdown cannot reopen the microphone. 23 frontend + 46 backend tests pass (69 total). Web export/typecheck and signed Android 0.1.5/code 6 build pass. Live browser test displayed an incomplete Doctor draft before the final saved answer. Physical microphone/speaker validation remains outstanding. 0.1.5 supersedes 0.1.4 as the recommended pilot.

Public 0.1.5 APK downloaded byte-for-byte equal to the built artifact; existing signing certificate verified. Release source c4c2450a73fabd3d252a4dfd3319e3fc93489a96, SHA-256 53f51bbea751031baa30590d492d2a7ce0af10c639d0d5a070863d51481cf2cb. Top website download now targets 0.1.5.
