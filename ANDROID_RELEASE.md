# Sproutly Android 0.1.5 pilot

Native Expo/React Native release, package `com.alambda.sproutly`, version 0.1.5, versionCode 6. Uses the live HTTPS API and an embedded release JavaScript bundle. Expo Go is not required. Internet is required for account data and AI services.

## Verified artifact

- Size: 58,071,615 bytes.
- APK SHA-256: `53f51bbea751031baa30590d492d2a7ce0af10c639d0d5a070863d51481cf2cb`.
- Signing certificate SHA-256: `9fc8d7beb48216a0810a84d46076b856f2930c77f03152d0786a13dca4dcf0fb`, matching the independently downloaded 0.1.1 APK.
- APK signature verifies; version code is higher than 0.1.1. Package ID is unchanged.
- ARM64 and ARM32 phone ABIs (`arm64-v8a`, `armeabi-v7a`). Minimum API 24; target API 36.
- 16 KB ZIP alignment check passes. Microphone permission is present; SYSTEM_ALERT_WINDOW is excluded; backup is disabled.
- Release bundle includes the production API origin, growing plans, updated rescue guidance and secure native session storage.

## Features

Includes reviewed Seed Studio scanning, grow plans and dated milestones, seed-to-plant linking, persistent Doctor conversations with explicitly confirmed app actions, rescue follow-ups, voice transcription/device speech, tentative identification alternatives, private export/deletion and opt-in device reminders. Store purchasing remains unconfigured pilot access; no trial or live physical-commerce charge is enabled.

## Rebuilding

```sh
npm ci --include=dev
node android-release.mjs
```

Install JDK 17 and the Android SDK/NDK required by Expo SDK 55. Set `ANDROID_HOME`, `JAVA_HOME`, `SPROUTLY_KEYSTORE_PATH`, `SPROUTLY_STORE_PASSWORD` and `SPROUTLY_KEY_PASSWORD`. The alias is `sproutly-release`. Signing material must stay outside the repository. Use the same key and increase versionCode for every update. Verify the output using `apksigner verify --verbose --print-certs` and compare SHA-256 after public download.

## Acceptance still required

The APK is a pilot, not physical-device certification. Test install/update, cold launch, account/session migration, Android Back, denied permissions, camera/photo selection and cancellation, soft keyboard/safe areas, real microphone/voice interruptions and notification delivery with battery/reboot conditions on a physical Android phone.

The website downloads the APK. Android controls installation permission and final confirmation. Website code cannot bypass those controls. The nearest 60 future unfinished reminders are scheduled after opt-in; cross-device changes sync when the app is opened. No remote push provider is configured.

See TECHNICAL_BOARD.md for the remaining store, provider, evaluation and launch gates.

## Live voice in 0.1.5

Live dictation writes interim words into the composer. In-app calls automatically send finalized turns, speak concise Doctor replies with timed captions, and provide microphone mute, interruption and hang-up controls. The microphone pauses during answers. Device/browser speech services may process live audio online; finalized text uses the existing OpenAI care API. Recorded audio fallback has explicit transcript preview and MIME codec handling. See VOICE_CALLS.md. Physical phone microphone, speaker, permission and background acceptance remain open.

## Streaming conversation update

Doctor summaries appear as live drafts from real Responses API text deltas. Complete structured answers are validated before saved guidance and speech playback. Call mode now shows elapsed minutes/seconds and detaches live observation on hang-up. A disconnected event stream falls back to retrieving the same accepted job, never reposting the question. 23 frontend and 46 backend tests pass. Physical microphone/speaker testing remains outstanding.

Interruption shutdown is generation-guarded: ending/backgrounding during awaited speech shutdown cannot reopen the microphone. Regression test passes. Version 0.1.5/code 6 supersedes the 0.1.4 pilot.
