# Seed Studio — Phase 2

Entry points: Home → Start from seed, or My Garden → Seed Studio. The existing React Native/Expo frontend and Node/SQLite API on Render remain in place.

Users can enter a seed/project name, optional variety and brand, growing method, optional ISO sowing date, instructions and optional front/back photos. Text drafts are stored per account on the current device. Unsaved photo selections remain in memory; successful uploads and an attempted save payload are retained for an exact retry. The authenticated API saves the packet/project together with an idempotency key. Existing saved projects can be reopened, including private packet photos.

No OCR, barcode lookup, AI packet extraction, personalized grow plan, seed milestone reminders or Premium gating is claimed in this phase. These remain subsequent phases. Packet instructions are customer-entered and not independently verified. Camera behavior depends on browser/device permissions; physical Android/iOS acceptance is still required. The existing downloadable Android APK is a previous release and does not yet contain these screens.

Validation: TypeScript check, production Expo web build, seven frontend tests (photo selection, reminder planning, seed payload validation), and 24 backend tests including authenticated roundtrips, atomic packet/project save, replay handling, transaction rollback, persistence and account isolation. Live browser acceptance is recorded separately after deployment.
