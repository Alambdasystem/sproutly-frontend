# Sproutly frontend
Expo SDK 55, React Native, React Native Web and TypeScript. Real API-driven forms and screens using the Sproutly garden-first flow, Manrope headings, Inter body text and the forest/cream brand palette.

## Run
1. `npm ci`
2. Set `EXPO_PUBLIC_API_URL=http://localhost:3001` (or the deployed backend HTTPS origin).
3. `npm run web` for browser development; `npm run android` or `npm run ios` for Expo device development.
4. `npm run typecheck` and `npm run build` (exports web assets to `dist`).

Render static site: build `npm ci --include=dev && npm run typecheck && npm run build`; publish `dist`. API URL is a public build-time configuration value. Set it before building; never place a secret in an EXPO_PUBLIC variable. Navigation is application state on the root URL, so no server path rewrites are required.

## Working flows
Demo entry and real register/login/logout; garden creation/edit/removal; image selection and camera capture; authenticated photo uploads; journal entries/edit/delete; editable reminders with complete/snooze; OpenAI photo assessments saved to journal; factual editable private stories with optional platform share sheet; catalog/search/filter; basket and server-priced demo checkout; order cancellation, fulfillment and refund workflow; provider applications/listing inventory; admin review/moderation/audit.

The seed data is fake. Saving is real and goes through the API; there is no local fake response fallback. The API's demo accounts isolate every visitor's sample garden, catalog and administrative workspace. Email and payment integrations are disconnected. Photo analysis requires the user to confirm transfer of the photo and care context to OpenAI by selecting Analyze. Assessments analyze uploaded images through the backend OpenAI integration; the app displays uncertainty and asks for better photos when needed. Reminder delivery is in-app only. No card numbers are collected.

## Mobile path
Uses React Native View/Text/Pressable/Image/ScrollView, react-native-svg and expo-image-picker. Native builds have not been compiled or device-tested. Before store release, add production identity, secure credential storage, navigation/deep links, safe-area handling, real notifications and payment integration, privacy flows, and device QA.

## Assets
`garden-hero.png` was generated with the built-in image generation tool: warm daylight, basil/monstera/sprout in ceramic and terracotta pots on the right, cream wall negative space on the left; no text or logo. Plant cards use code-native sample botanical illustrations. The header uses text branding pending the approved vector logo master.


The marketplace includes 24 sample offers and a separate live GBIF reference search. Botanical records have source links and are not presented as inventory. Seed/supplier checkout remains simulated.

## Demo photos and live merchant search
Demo basil, monstera, tomato seedlings, and seed assortment cards use bundled 1254×1254 AI-generated assets, explicitly labeled as illustrations. User-uploaded photos retain priority. Other species retain generic art rather than mislabeling a generated basil photo. The separate Real seed & plant shop tab reads the backend merchant search endpoint and opens merchant checkout externally. Merchant cards use merchant photographs, not generated demo imagery. No real product can be added to the demo basket.

The merchant product page showed a seasonal ordering pause through early December when checked October 30, 2026. A dated notice is displayed separately from the live catalog stock fields; merchant catalog stock is not a guarantee of checkout availability.
