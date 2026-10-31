# Sproutly frontend

Universal Expo SDK 55 / React Native / React Native Web app with TypeScript. The existing framework, forest/cream palette, Manrope headings and Inter body text are retained.

## Run and verify

```sh
npm ci --include=dev
npm run typecheck
npm test
EXPO_PUBLIC_API_URL=http://localhost:3001 npm run web
npm run build
```

Render builds with `npm ci --include=dev && npm run typecheck && npm run build` and publishes `dist`. Set the public HTTPS API origin through `EXPO_PUBLIC_API_URL` before building. Never put a service secret in an `EXPO_PUBLIC_` variable.

## Working pilot features

Account and isolated demo entry; private plants, photos, journal and care reminders; reviewed seed packet scanning and manual Seed Studio; real API grow plans and milestones; linked seed-to-plant history; plant/project Doctor conversations; explicitly confirmed reminder/note actions; 14-day rescue plans and photo follow-ups; tentative identification alternatives and corrections; optional voice transcription and device speech; account export/deletion; pilot privacy/help and operations.

Android sessions use SecureStore, migrating any previous local session. Website sessions retain the existing browser storage behavior. Native care reminders are opt-in and sync on app opening and changes; delivery depends on OS settings. Camera, microphone and notifications require physical-device acceptance.

Native subscription UI uses actual RevenueCat offerings and store price strings only after project, keys and products are configured. Purchase/restore/manage paths are prepared; no payment or trial begins merely by viewing Membership. Current deployment provides pilot access, not a paid subscription. Optional public native SDK keys: `EXPO_PUBLIC_REVENUECAT_ANDROID_KEY` and `EXPO_PUBLIC_REVENUECAT_IOS_KEY`.

Sample marketplace prices, sellers and orders are simulated. The separate live merchant catalog links to merchant checkout and does not create a Sproutly purchase. AI-generated demo plant images are labeled; uploaded photos retain priority. Future Shop is post-launch work.

## Releases and remaining gates

`node android-release.mjs` builds a signed native APK using external signing environment variables. Never commit signing material. The website download button points to a published release asset; Android retains control over install permissions and confirmation. See ANDROID_RELEASE.md and IOS_RELEASE.md.

See TECHNICAL_BOARD.md for tested phase acceptance and open launch gates. Real-packet accuracy, longitudinal rescue results, physical devices, store billing, verified email, offsite recovery, final public policies and external monitoring are not certified by a successful build.
