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
