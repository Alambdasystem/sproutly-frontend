# Sproutly Android pilot APK

Native Expo/React Native release, package `com.alambda.sproutly`, version 0.1.1, versionCode 2. Uses the live HTTPS Sproutly API. The APK includes the JavaScript bundle and doesn't require Expo Go or a development server. Internet is required for account data, photos, analysis and marketplace requests.

## Rebuilding

Install dependencies with `npm ci --include=dev`. Install JDK 17 and the Android SDK/NDK required by Expo SDK 55. Set `ANDROID_HOME`, `JAVA_HOME`, `SPROUTLY_KEYSTORE_PATH`, `SPROUTLY_STORE_PASSWORD`, and `SPROUTLY_KEY_PASSWORD` in the build environment. The key alias is `sproutly-release`.

Run `node android-release.mjs` from the repository root. The signed APK is produced under `android/app/build/outputs/apk/release/`. Use `apksigner verify --verbose --print-certs` to verify it. Never publish signing keys or passwords. The owner has a private recovery archive; it is separate from public source and downloads.

Use the same release key and increase `android.versionCode` for future updates. An APK signed with a different key won't replace an existing installation.

## Pilot acceptance

Static checks and signature verification don't certify physical-device behavior. Test installation, cold launch, account login, Android Back, camera/upload cancellation and denied permissions, photo assessment, journal persistence, keyboard/safe areas and app update on a physical Android device before treating this as a production release.

The website downloads the APK. Android may ask the user to allow installation from Chrome and must show a final installation confirmation. Website code cannot bypass those confirmations.

Version 0.1.1 adds opt-in local device reminders. Scheduling updates after save, completion, snooze and account reload; logout cancels Sproutly schedules. Android may delay alerts under battery restrictions. Only the nearest 60 future unfinished tasks are scheduled. Cross-device changes sync when the app is opened. No remote push service is configured.
