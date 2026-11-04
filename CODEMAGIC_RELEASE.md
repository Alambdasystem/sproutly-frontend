# Sproutly Android bundle preparation

Codemagic project: https://codemagic.io/app/6aea9e3d1bb9c30e396c71d9/settings . Connected to this repository as React Native on November 3, 2026. Framework remains Expo SDK 55 / React Native.

## Build and signing boundary

The manually started `sproutly-android-bundle` workflow uses the existing free M2 allowance, Node 24.22.1 and JDK 17. It installs locked dependencies, runs frontend tests/typecheck, generates the Expo Android project and builds an **unsigned AAB**. It has no push trigger, publishing section, signing identity, Play service-account key or private keystore. It does not submit anything to Google Play.

`bundle-preparation.mjs` checks the package ID and generated release block, and explicitly removes release signing for this intermediate bundle. It rejects already-patched production signing or an unknown template. The normal signed APK/AAB path in android-release.mjs remains separate and still requires the original private signing environment.

Candidate version is 0.1.6. Version code is the checked-in baseline plus Codemagic BUILD_NUMBER plus one (first build #1 from baseline 6 yields code 8). app.json is updated only inside the ephemeral CI checkout. The live downloadable pilot remains 0.1.5/code 6 until a verified replacement is published. Verify the actual build metadata; these are preparation rules, not evidence of a successful build.

Artifacts are `release-candidate/*-UNSIGNED.aab` and `bundle-build.json`, including package/version, source commit/build ID and SHA-256. CI rejects unexpected JAR signatures so an accidentally debug-signed bundle cannot be mistaken for this intermediate. Keep build artifacts private until the final release is validated.

## After the cloud build

1. Download the exact AAB and metadata from the completed build; compare SHA-256 with the metadata and confirm source commit/version.
2. Sign a copy locally using the original Sproutly PKCS12 and alias `sproutly-release`. Use environment-based password arguments; never put credentials in command text, CI, artifacts or this repository.
3. Verify the final JAR signature and certificate SHA-256 `9fc8d7beb48216a0810a84d46076b856f2930c77f03152d0786a13dca4dcf0fb`. Record the final AAB digest separately from the unsigned digest.
4. Validate bundle structure, package com.alambda.sproutly, version code, target SDK, permissions and native libraries. An unsigned/signed build is not physical-device acceptance.
5. Finish real Android acceptance, final disclosures, app access, screenshots and developer-account verification. Upload the first signed AAB manually through the authorized Google Play Console testing track when its gates permit. Codemagic documents that the first upload must be manual; later automation requires a separately authorized service account.

No production rollout, new paid subscription, enrollment fee or agreement is implied by this workflow. Earlier Play navigation origin-review restrictions remain in force. See STORE_RELEASE_TRACKER.md for actual build and submission receipts.

Official references checked November 3, 2026:

- https://docs.codemagic.io/yaml-quick-start/building-a-react-native-app/
- https://docs.codemagic.io/yaml-basic-configuration/yaml-getting-started/
- https://docs.codemagic.io/yaml-publishing/google-play/


## Completed candidate and local verifier

Build #1 finished successfully in 11m 7s: https://codemagic.io/app/6aea9e3d1bb9c30e396c71d9/build/6aeaac9da87b4d255fde5fe6 . Its exact source is `90d676a8447755cbcc139efd40dd12bbb5c0c626`; package/version `com.alambda.sproutly` / 0.1.6 / code 8. The signed AAB and derived universal QA APK are ready for physical-device acceptance, with matching original certificates. Store submission remains absent.

`sign-android-bundle.py` performs the local verification/signing steps. Requires Python 3, a full JDK 17 on PATH and a separately verified official bundletool JAR. Invoke `python sign-android-bundle.py --help` for arguments. Supply the downloaded unsigned bundle, CI metadata, expected source commit, bundletool, private PKCS12 recovery files and a new output path. Recovery JSON stays outside the repository and contains applicationId, alias, storePassword and keyPassword. Passwords are passed to JDK through environment references, never command text or logs. Do not upload recovery material to CI or public GitHub.

The verifier rejects a different source/package/digest, signed intermediate, duplicate ZIP entries, unexpected release flags/permissions, misaligned ARM64 libraries or a different certificate. It validates both unsigned and signed bundles. Its report appends `.verification.json` to the complete output filename (for example `Sproutly-0.1.6-code8.aab.verification.json`); keep APK reports distinct as `.apk.verification.json`. An existing binary output is never overwritten. Real-artifact verification passed for this candidate; retained receipts list all actual permissions and explicit `physicalDeviceQa: false`, `storeSubmission: null`.

AAB signing confirms binary provenance. It does not establish developer-account ownership, store eligibility, SDK privacy answers or physical-device behavior. Those gates remain in STORE_RELEASE_TRACKER.md.
