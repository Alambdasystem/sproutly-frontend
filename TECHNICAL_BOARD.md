# Sproutly technical board — 2026-10-31

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

## Verified in this release

- 41 backend automated tests and 9 frontend tests pass; TypeScript and production web export pass.
- Backend deployed commit `dd2ede988a3f00906ba5143eca4a890d1ab6ddc1`; frontend `fe7e825005b30510c693fd4d2ebf77bcd3b5a9df`. Both Render deploys reached live. Native refinements are committed in frontend `97c3536054bf3f94f2eb23d514aea5b30b33f287`; final website download-link deployment follows APK publication.
- Real deployed OpenAI grow plan: five steps, confirmed numeric germination range; actual sowing milestone and replay-safe linked plant conversion.
- Real deployed Doctor conversation preserves user/assistant history; browser-tested proposal creates a reminder only after explicit click.
- Real deployed OpenAI rescue plan completed. Synthetic audio fixture transcribed accurately by `gpt-transcribe` and returned recordingStored:false. This does not prove hardware recording quality.
- Real Open-Meteo demo forecast returned seven attributed days. No commercial weather subscription was purchased.
- Cross-account project access rejected; private export excludes credentials; account deletion and password reauthentication tested using isolated disposable test databases.
- Existing pilot records survived deployment. Android 0.1.2 (versionCode 3) built and passed signature, same-certificate, manifest, two-ABI and 16 KB ZIP alignment checks. Public publication/download verification follows this build checkpoint; physical-device acceptance remains open.

## Launch gates — still open

1. RevenueCat and Google/Apple store setup, approved pricing, sandbox purchase/restore/refund/expiry acceptance.
2. Verified sender for recovery/verification, real inbox delivery.
3. Owner-approved private offsite bucket and least-privilege runtime access; real remote restore rehearsal. Verified daily local SQLite backups remain active with seven-snapshot retention.
4. Physical Android install/update, cold launch, soft keyboard, camera, microphone, Android Back, permission denial, local notification and battery/reboot behavior. No physical device is connected here.
5. Apple Developer/Expo project signing and an iPhone. Linux prebuild is not a signed iOS release.
6. Real packet corpus, botanical identification/diagnosis evaluations, real rescue follow-up study, accessibility review and beta approval.
7. Final terms/privacy/retention and store disclosure review; external crash and availability alert destination. Active REQUEST_METRICS logs request IDs/status/latency without bodies, coordinates, tokens or paths.

Physical-commerce payments/payouts remain separate and simulated. Future Shop is post-launch and feature-flagged work, not a requirement for this care-feature release. No live charges, seller onboarding, commission, paid external plan or store submission was enabled.
