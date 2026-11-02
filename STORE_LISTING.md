# Sproutly store submission copy — draft, November 2, 2026

Status: preparation only; no listing or submission created. Confirm final functionality, support operator, markets, age rating, pricing and privacy disclosures in each developer account before submission. Do not advertise simulated marketplace inventory as a live seller marketplace or pilot access as a paid subscription.

## Google Play

Name: Sproutly

Short description (under 80 characters): Plant care, seed journals and thoughtful AI growing guidance.

Full description:

Grow your garden’s story with Sproutly. Keep your plants, seed projects, photos and care conversations in one place—from the first sowing to the next new leaf.

• Save plant details, photos and growing observations.
• Track seed projects and review packet information before saving it.
• Ask Plant Doctor questions with relevant plant history and photo context.
• Dictate questions live or use recorded transcription. Hear spoken replies with captions where your device supports timing.
• Follow growing plans, milestones and care reminders.
• Export your growing records and manage or delete your account.

AI guidance can be uncertain. Sproutly asks for missing context and distinguishes observations from possible causes. Inspect your plant before acting. Live voice depends on device speech support and permissions; conversations take turns. Internet is required for account and AI features. Optional AI features require consent to share relevant information with the provider. Marketplace demo items and orders are simulated in this pilot.

## Apple

Name: Sproutly

Subtitle: Your garden’s growing story

Promotional text: Keep plant photos, seed milestones and care questions together. Explore a more thoughtful growing journey with Sproutly.

Description: Use the full description above, adjusted only after the signed iOS build proves the listed features on an iPhone. Do not claim current App Store availability.

Keywords draft: plants,seeds,garden,journal,growing,seedlings,plant care

## URLs after deployment verification

Privacy: https://sproutly-frontend.onrender.com/privacy.html
Support: https://sproutly-frontend.onrender.com/support.html
Account deletion: https://sproutly-frontend.onrender.com/delete-account.html
Marketing/app: https://sproutly-frontend.onrender.com/

These URLs are implementation targets until live HTTP and rendered-page checks pass.

## Data inventory for disclosure review — not certified answers

| Data / purpose | Current implementation | Review action |
|---|---|---|
| Name, email, account ID | Account functionality; linked to account | Declare applicable contact/user identifiers |
| Photos, notes, conversations, seed/project records | Private garden features; retained by account | Declare applicable user content and AI transfer |
| Audio recordings | Recorded transcription sent to OpenAI; no server recording retained by Sproutly | Verify provider processing and retention; do not automatically claim no collection |
| Device/browser live speech | Configured OS/browser recognizer may process online | Confirm permission strings and provider behavior per platform |
| Approximate location | Optional weather, with consent | Check SDK and backend rounding against final build |
| Session / credentials | Authentication; native secure storage | Validate transport/storage and account deletion |
| Request IDs, status, duration | Operations logs without request bodies | Determine applicable diagnostics disclosures |
| RevenueCat/store adapter | Present, paid pilot enforcement off | Audit final SDK startup/network behavior; do not infer zero SDK data from disabled billing |
| Acquisition measurement | Not yet implemented | No connected analytics SDK or verified store install totals claimed |

## Review instructions to complete privately

Provide a dedicated non-admin account and durable password through the store’s secure review field, never this public repository. Verify it works on the submitted binary. Explain AI consent, seeded demo versus personal records, voice service dependencies and simulated commerce. Supply tested review paths for create plant, photo assessment, Doctor conversation, seed project, export and delete. Explain any feature unavailable to reviewers before submission; do not submit broken placeholders.

## Screenshot shot list — actual device captures required

Home/personal garden; Plant Doctor Photos & context with unobscured Continue; saved care guidance; live dictation/call controls; seed project milestones; journal. Capture supported phone/tablet sizes from the signed release. Do not create fictional UI screenshots or label desktop views as iPhone captures.
