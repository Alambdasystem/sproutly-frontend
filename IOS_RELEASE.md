# iOS preparation and acceptance

The iOS Xcode project generates successfully from `app.json` using `npx expo prebuild --platform ios --no-install`. Bundle identifier: `com.alambda.sproutly`. Shared native safe-area, photo selection and local notification code is included. `eas.json` provides preview and production build profiles with the live API URL.

No signed iOS binary has been produced. This Linux environment has no Xcode or connected iPhone. An owner-authorized Apple Developer team and Expo/EAS project/signing connection are required for cloud device builds; alternatively use Xcode on an authorized Mac. Do not substitute a simulator build for a signed physical-device build.

After connecting signing, run `eas build --platform ios --profile preview`. Register the intended testing devices for internal distribution, or use an authorized TestFlight distribution setup. Review account/build charges before starting paid services.

On iPhone, verify account recovery links, camera permissions/cancellation, narrow photo form with keyboard, Back/Continue through Step 3, notification permission/scheduling, logout cancellation and safe areas. These checks remain open until run on a device.
