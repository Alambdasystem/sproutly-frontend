# Plant Doctor voice update — 0.1.3

The framework remains Expo SDK 55 / React Native / Node. No phone number or telephony account is required.

## Experience

Choose a plant or seed project in Talk to Plant Doctor. Allow live speech recognition for dictation. Words update the existing message field as partial speech results arrive, replacing earlier partials rather than appending duplicates. Stop dictation to review/edit; dictation alone does not send a question.

For a call, allow the OpenAI Doctor conversation, remove any image attachment and send/clear existing draft text first. Start voice call opts into automatically sending each finalized speech turn to the existing authenticated, plant-scoped Doctor API. The microphone pauses while the answer is generated and spoken. Mute controls microphone resumption, Interrupt and speak stops playback and listens again, and End call immediately stops microphone/playback. Leaving the screen, backgrounding the app, hiding the browser tab or reaching ten minutes ends the call. Already accepted requests may finish in saved history after hang-up. Reminders/observations still require explicit confirmation buttons.

New typed/recorded Doctor answers are read automatically while Read new Doctor replies aloud is enabled. Saved answers can also be replayed manually. Captions follow actual device speech boundary callbacks; voices without timing retain the full readable answer without a fabricated typing animation.

## Transcription repair

Recorded fallback now shows a persistent transcript preview and confirms insertion into the message field, using the latest callback. Empty responses fail visibly; failed insertion preserves transcript/recording. Codec-qualified browser MIME types are normalized on the client and accepted on the server. Async results from an unmounted screen cannot write into another conversation. Recording preparation is guarded against starting a late microphone after leaving.

## Providers and limits

Live dictation uses the device/browser speech recognizer, which may process audio through its configured service. Native support uses expo-speech-recognition 3.1.3 (SDK 55 tag). Browser support depends on SpeechRecognition/webkitSpeechRecognition and microphone permission. An unsupported or denied speech service shows a typed/recording fallback. It is not presented as an OpenAI live-audio transport.

Final questions and plant context use the existing OpenAI care API, quotas and ownership checks. Call turns have distinct client turn identifiers. Responses remain turn based and can take time; this release does not claim full-duplex barge-in or a streaming model response. Recorded fallback still requires separate consent before sending audio to OpenAI. Raw live speech is not saved by Sproutly; accepted text turns and Doctor responses are saved privately.

## Validation

19 frontend tests, including live partial input, duplicate final events, reply captions, mute/resume, interruption, end during permissions or API requests, failed requests preserving drafts and codec MIME normalization. 43 backend tests include codec-qualified recording transcription. TypeScript and production web export pass. Native build/signature and live rollout verification are recorded separately in the release notes/technical board. A physical Android/iPhone microphone, audio-routing, permissions and speaker test remains required; synthetic events and audio fixtures are not hardware acceptance.

Spoken turns include the answer summary and up to two warnings and follow-up questions. Long speech is bounded to 3,500 characters; full structured guidance remains in the saved conversation. Proposed garden actions are never spoken as already executed.

Mute/resume preserves an unfinished spoken phrase and joins it to the next recognized words before sending, instead of replacing earlier words.
