# Evidence-based pilot measurement

`node acquisition-report.mjs /private/path/ledger.json` produces an aggregate report. This is an operator-reviewed ledger, **not connected native telemetry, store attribution, or device attestation**. Actual population is unknown. Never place participant records, screenshots, account identifiers, emails, evidence links or the ledger itself in this public repository. Use a private access-controlled evidence destination. No analytics SDK or new personal-data collection has been added to the app.

Start with `{ "asOf": "2026-11-03T23:00:00Z", "apkDownloads": null, "storeReports": [], "observations": [] }`, replacing asOf with the actual reporting time. Null means unknown; zero observations means no evidenced installs, not zero actual users. An APK download total needs apkDownloadEvidenceRef and stays separate.

Each observation requires opaque UUID `id` and `subject`, `type`, `cohort` (beta/qa/demo/staff), `platform` (android/ios/web), `channel` (linkedin_personal/linkedin_page/linkedin_group/organic/direct/unknown), `build`, UTC `at`, private `evidenceRef` and `reviewedBy`. Assign the same subject UUID to a known person across devices and channels. Resolve possible duplicates before inclusion. Any QA/demo/staff record excludes that subject entirely. Reinstalls do not count.

Types:

- `beta_opt_in`: voluntary participation supported by evidence. This is not proof of installation or Google Play closed-test eligibility.
- `native_first_launch`: provisional report only; does not count as a verified install.
- `install_verified`: `firstTime: true` and `method: device_observed` or `tester_evidence_review`. Review an app-open/install observation with version and device/OS; retain the minimal necessary evidence privately. A download, email, website login or store listing view is insufficient. False firstTime is a reinstall and excluded from acquisition counts.
- `activation`: after a verified install, `action: plant_saved_and_journal` or `seed_project_saved_and_care`; require reviewed evidence of a personal project and the care/journal milestone. Demo exploration does not qualify.
- `session`: reviewed native return-use evidence. D1/D7 uses UTC calendar days after the first verified install and only includes cohorts whose full return day has ended. Reports describe observed return use, not continuous engagement.

Optional storeReports entries require `store` (google_play/app_store), UTC `from` and `through`, integer `firstTimeInstalls`, explicit boolean `qaExcluded`, `evidenceRef` and `reviewedBy`. Preserve the original definition, timezone and exclusions in the evidence. Overlapping report periods are not added. Store and pilot totals are never combined automatically. Reports without QA exclusion are not eligible for the first-100 claim.

Public summaries contain aggregates only. Do not publish small cohort breakdowns that could identify volunteers. Permission to send one beta feedback email is not permission for marketing or unsolicited invitations. Use the beta page's voluntary email path until a consented signup and measurement system is connected. Targets: 20 volunteers, 50 installs, 100 installs; none are claimed outcomes.
