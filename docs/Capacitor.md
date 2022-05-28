Run the emulator

```bash
ANDROID_HOME=/home/dev/Android/Sdk npx cap run android
```

> Update ~/.bashrc with `export ANDROID_HOME=/home/dev/Android/Sdk` and restart the terminal to avoid having to set the environment each time.

# Usage

## Run emulator

Update `.env` with the location of your Android sdk. Also, you must ensure web uses the correct api url

```
ANDROID_SDK_ROOT=/home/dev/Android/Sdk
REDWOOD_API_URL=http://10.0.2.2:8911
```

Next build web and run.

```
./web.sh

yarn cap run android
```

Logs can be views in chrome at `chrome://inspect#devices`

## Hot-reload

Enable hot-reload by modifying `capacitor.config.ts` to uncomment the `server` property.

# Development

### Deep links

1. Add intents to `AndroidManifest.xml` and handle incoming intents in the app in
   - use Android Studio "App Links Assistant" https://developer.android.com/studio/write/app-link-indexing
2.
3. Verify app links (so they open automatically) https://developer.android.com/training/app-links/verify-site-associations

Test using intents (see https://developer.android.com/training/app-links/deep-linking)

```
adb shell am start -W -a android.intent.action.VIEW -d "http://0.0.0.0:8910/redirect" com.treasurechess.app
```

### Security

https://capacitorjs.com/docs/guides/security#data-security

# Installation

You'll need Android Studio and Java install. Additionally, you'll need to install an Android device to emulate.

- Android Studio: https://developer.android.com/studio Install in `/usr/local/`
- Java: download at https://www.oracle.com/java/technologies/downloads/ and install https://docs.oracle.com/en/java/javase/18/install/installation-jdk-linux-platforms.html#GUID-ADC9C14A-5F51-4C32-802C-9639A947317F
- Create a new device in Android Studio. API version must be 24 or greater to work with Capacitor.
- Setup the Android Studio environment https://capacitorjs.com/docs/getting-started/environment-setup#android-development. NOTE: API should not be higher than v31. I had to remove the tools installed by default for API v32, and only use Android 12 (s). See https://github.com/ionic-team/native-run/issues/219#issuecomment-1016503975
- Add capacitor to your redwood app in `web` https://github.com/ionic-team/capacitor
