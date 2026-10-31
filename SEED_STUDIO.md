# Seed Studio — Phase 2

Entry points: Home → Start from seed, or My Garden → Seed Studio. The existing React Native/Expo frontend and Node/SQLite API on Render remain in place.

Users can enter a seed/project name, optional variety and brand, growing method, optional ISO sowing date, instructions and optional front/back photos. Text drafts are stored per account on the current device. Unsaved photo selections remain in memory; successful uploads and an attempted save payload are retained for an exact retry. The authenticated API saves the packet/project together with an idempotency key. Existing saved projects can be reopened, including private packet photos.

Phase 3 adds the separate SeedScanner workflow: front/back/additional instruction/barcode photos; retained-original crop/rotation; English OCR; OpenAI structured extraction; field confidence, evidence and editable review; explicit confirmation before attaching values to a saved project. The original and confirmed values remain distinct. Optional GBIF species references are available. No exact product barcode database is connected. Personalized grow plans, seed milestone reminders and Premium gating remain subsequent phases. Camera behavior depends on browser/device permissions; physical Android/iOS acceptance is still required. The existing downloadable Android APK is a previous release and does not yet contain these screens.

Validation: TypeScript check, production Expo web build, seven frontend tests (photo selection, reminder planning, seed payload validation), and 24 backend tests including authenticated roundtrips, atomic packet/project save, replay handling, transaction rollback, persistence and account isolation. Live browser acceptance is recorded separately after deployment.

Phase 3 acceptance limits: tests currently use labeled synthetic fixtures and API mocks for deterministic checks; the deployed OpenAI flow is verified separately. A 30–50 real manufacturer packet benchmark and physical-device camera/keyboard testing remain open. APK packaging is deliberately last.
