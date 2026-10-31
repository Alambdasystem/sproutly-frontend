# Sproutly technical board — verified state

## Implemented and checked

- Android 0.1.1, versionCode 2: native release builds; APK signature verifies; certificate matches 0.1.0. Published APK is independently downloaded and compared with the local signed artifact. Device acceptance remains OPEN.
- Opt-in Android local care reminders: permission request, nearest 60 future unfinished tasks, updates after save/snooze/complete/reload, cancellation on logout, per-account preference. Five frontend tests pass. Native delivery and battery/reboot behavior remain OPEN.
- Recovery and verification screens and API: purpose-bound hashed tokens, 30-minute expiry, single use, per-account mail cooldown, old-session revocation after reset, explicit unconfigured-delivery errors.
- Off-site backup adapter: private S3 bucket and expected owner checks, encrypted uploads, checksum manifest, full remote read-back and SQLite verification. NOT activated without an approved destination and runtime credentials.
- Stripe sandbox adapter: server-owned prices, idempotent Checkout creation, authenticated signature validation on raw webhook bodies, trusted session retrieval, amount/currency validation, replay protection. Live charging is blocked; sample inventory cannot become a real seller order.
- iOS project generation passes; EAS preview/production profiles are prepared. No signed iOS binary exists.
- 19 backend tests pass. Existing live account, session, plant, journal, reminder and exact private-photo bytes survive the backend update. Unauthorized and cross-account access remain blocked. Persistent storage and local backup/restore checks remain healthy.

## External requirements — not completed

| Item | What is still needed |
| --- | --- |
| Physical Android acceptance | An accessible Android device for install/update, cold launch, keyboard, camera, Step 3, notifications and Android Back tests. No connected ADB device is available here. Software-emulator setup is not physical-device evidence. |
| Email delivery | Verified sender and Resend runtime connection; actual inbox delivery test. The existing Workmates invitation relay is not a Sproutly recovery relay. |
| Off-site disaster recovery | Owner-approved private backup bucket/account, least-privilege runtime access and a real remote restore rehearsal. Local disk backups remain active. |
| Real marketplace payments and payouts | Stripe connection, actual sellers, shared seller inventory/reservations, shipping/tax/refund rules and seller payout onboarding. Current in-app transactions remain simulated; external merchant checkout stays on the merchant website. |
| iPhone release | Owner-authorized Apple Developer signing and Expo/EAS project access, signed build, and iPhone acceptance. Current environment is Linux without Xcode or a connected iPhone. |

See the backend repository's INTEGRATIONS.md for exact configuration and remaining payment scope. None of the blocked rows is marked complete merely because an adapter or build profile exists.
