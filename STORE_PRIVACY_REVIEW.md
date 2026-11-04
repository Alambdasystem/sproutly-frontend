# Store privacy review worksheet — November 4, 2026

Draft for owner certification, not submitted store answers. Reviewed frontend fcd12c2900998e06d26740d8add6801b3889e801 and backend b34e04617ddd8bef94a1795ac6058abcbf8f28d4. Android binary evidence is the signed 0.1.6/code 8 candidate built from 90d676a; iOS has no signed binary. Preserve Expo React Native / Node.

## Source-supported data flows and proposed classifications

| Flow | Evidence | Proposed store category / purpose | Remaining determination |
|---|---|---|---|
| Account name/email/user ID | server.mjs authentication, accounts.mjs | Contact information and user identifiers; account management/app functionality; linked to account | Required for personal account; distinguish optional demo use. Never declare no collection |
| Plant/seed records, journal, Doctor messages, plans | server.mjs, care.mjs, foundation.mjs | User content; app functionality; linked to account | Confirm exact category names in each console. Optional use is not automatically exempt from disclosure |
| Plant/packet photos | server.mjs media ownership and AI-consent checks; vision.mjs, packet-extraction.mjs, care-ai.mjs | Photos; user-selected uploads; app functionality; linked to account | Photos are saved, so do not mark all photo processing ephemeral. AI sends relevant content to OpenAI |
| Recorded transcription | transcription.mjs, VoiceControls.tsx | Audio; optional app functionality | Audio is sent off device. Sproutly does not retain server audio; provider retention/contract must be confirmed before claiming ephemeral processing |
| Live speech | liveRecognition.ts and .web.ts | Audio/speech services, optional app functionality | Native persist:false; device/browser service may process online. Verify actual Android/iPhone service and provider behavior on hardware |
| Spoken response/captions | voiceSession.ts, expo-speech | App functionality | Audit device speech service; do not claim all TTS is offline without hardware/network evidence |
| Optional weather | backend weather.mjs | Approximate location; app functionality | Consent required. Coordinates round to 2 decimal places, memory cache up to an hour; commercial personal weather requires a key. No blanket ephemeral claim |
| Botanical/catalog lookup | catalog.mjs / marketplace.mjs | Search/user content where relevant; app functionality | Review exact outbound query fields and external merchant destinations; checkout occurs externally |
| Membership | Membership.tsx | User identifiers and possible purchase data if activated | SDK config is guarded by native public key, not backend pilot mode. If a key is supplied, ownerId is passed to RevenueCat and offerings load. Verify final build environment and actual network traffic before certifying no SDK collection |
| Operations | server.mjs | Assess diagnostics/service operation | Request IDs, method/status/duration are logged; audit Render/platform logging and retention separately. Source omission of bodies does not prove platform omission of IP addresses |
| Optional beta evidence | ACQUISITION.md | Optional manually reviewed participation/usage evidence | Private evidence only; no connected automatic acquisition SDK. Do not conflate download counts with installs |

AI Responses requests in vision.mjs, packet-extraction.mjs and care-ai.mjs use store:false. This is an API setting, not proof of zero provider retention or zero collection. Obtain applicable provider processing/retention details before certification. Determine each store's service-provider sharing treatment from actual contracts, not from network destinations alone. No advertising or cross-app tracking implementation was identified in the inspected application source; final SDK/build audit is still required.

## Deletion, retention and public URLs

In-app path: Profile → Account, privacy and help → Delete this account. Personal account deletion requires current password, DELETE confirmation and subscription acknowledgement. Backend server.mjs routes DELETE /api/v1/account to account controls. Prior isolated tests and disposable live-account deletion are recorded on the technical board; no new live account was deleted in this review.

The public delete-account page provides direct steps and an external email-request path with ownership verification. Live database deletion does not erase already-created backups immediately. Backup code keeps seven verified snapshots by default, at a configured interval (default 24 hours); failures can extend wall-clock retention. Do not promise automatic erasure in exactly seven days. Offsite restore and provider-level deletion obligations remain open. Subscription cancellation is separate.

Privacy/support/deletion/beta URLs returned HTTP 200 with expected content on November 4; see release-readiness-2026-11-04.json. Availability checks do not prove support inbox response time, email recovery delivery or legal sufficiency.

## Certification gates

- Review final binary permissions and every enabled SDK/configuration; retain network inspection for login, photo/AI, voice, weather and Membership.
- Review provider processing, retention and service-provider terms; confirm owner identity, contact and applicable age/market scope.
- Enter both stores' actual question wording; do not copy classifications mechanically across stores.
- Confirm submitted build matches reviewed source, environment and privacy copy. Any SDK/key/provider change reopens this audit.
- Attach signed iOS archive privacy report/SDK manifests and required-reason API review after an authorized Apple build exists.
- Final Data Safety/privacy-label certification remains owner-reviewed and unsubmitted. Do not select a no-data-collected answer.

Official guidance reviewed November 4, 2026:

- https://support.google.com/googleplay/android-developer/answer/10787469 — off-device/SDK collection and form responsibility.
- https://developer.apple.com/app-store/app-privacy-details/ — app/partner collection, functionality purposes and optional-disclosure conditions.
- https://developer.apple.com/app-store/user-privacy-and-data-use/ — responsibility for embedded SDKs and privacy manifests.
