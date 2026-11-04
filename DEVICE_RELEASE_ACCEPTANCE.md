# Physical release acceptance — unexecuted

Android candidate: com.alambda.sproutly, 0.1.6/code 8; exact AAB/APK digests in STORE_RELEASE_TRACKER.md. Retain original signing certificate. iOS: pending signed build and Apple team. Complete each case separately on Android and iPhone; no row is currently passed. Screenshots must come from the actual submitted build and supported devices. Keep tester identifiers, credentials and evidence privately; publish only aggregate outcomes.

For every result record platform, hardware model, OS, build, tester, UTC time, pass/fail, private evidence reference and issue/fix-build reference. A simulator or web result cannot replace a physical-device result.

| Case | Procedure | Pass criterion | Android | iPhone |
|---|---|---|---|---|
| Install/update | Clean install on QA device; separately update original pilot while preserving records | Correct version/certificate; cold launch; records/session migration intact | Not run | No build |
| Authentication | Sign in/out; expired session; recovery to actual inbox | Own records only; logout revokes local session; recovery link works | Not run | No build |
| Upload photo | Doctor Step 2: choose portrait/landscape; cancel; deny then retry | Preview contained; no lost context or stale image; explicit permission recovery | Not run | No build |
| Camera | Allow/deny, capture, retake, cancel | Correct preview; draft survives denial/cancellation | Not run | No build |
| Narrow keyboard | Narrow Android screen; long context; keyboard open/closed; rotate | Whole form scrolls; Continue visible above navigation/safe area and tappable | Not run | No build |
| Continue | Populate Step 2, continue to Step 3, Back, continue again | Exact text/photo retained, no duplicate submission or hidden controls | Not run | No build |
| Dictation/fallback | Allow/deny mic; interim/final words; recorded fallback with insert confirmation | Visible live typing; fallback inserts once; failures preserve draft | Not run | No build |
| Speaker/captions | Doctor call response; volume/mute; interrupt then hang up during speech shutdown | Speech/captions work; no mic feedback; hang-up cannot reopen mic | Not run | No build |
| Interruptions | Background, screen lock, incoming phone interruption, network loss | Call stops safely; draft/history recover; no duplicate AI request | Not run | No build |
| Records/reminders | Save own plant/seed project and journal; opt-in reminder; reboot/battery limits | Persistent records; real notification behavior documented | Not run | No build |
| Membership | Open without configured store products | Pilot is clear; no charge/trial; unavailable purchase states accurate | Not run | No build |
| Export/delete | Dedicated disposable QA account only, explicit deletion authorization | Export credential-free; account/records removed; old session denied; backup notice accurate | Not run | No build |

QA/demo/staff devices never enter acquisition totals. Once accepted, capture Home/garden, unobscured Doctor Step 2, guidance, voice controls, seed milestones and journal without personal data. Record original image dimensions; prepare the sizes requested by the actual console. No generated/fictitious screenshots.

Review access: use a separate non-admin account, place credentials only in store review fields, and test them on the exact binary. Explain AI consent, optional voice/provider limitations, simulated marketplace and unavailable billing. Do not use an administrator or a normal customer's account. No review account has been provisioned or tested yet.
