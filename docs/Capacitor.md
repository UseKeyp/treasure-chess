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
2. ??? in `MainActivity.java`
3. Verify app links (so they open automatically) https://developer.android.com/training/app-links/verify-site-associations and https://devdactic.com/universal-links-ionic/

Test using intents (see https://developer.android.com/training/app-links/deep-linking)

```
adb shell am start -W -a android.intent.action.VIEW -d "http://0.0.0.0:8910/redirect" com.treasurechess.app
```

### Security

https://capacitorjs.com/docs/guides/security#data-security

# Setup

You'll need Android Studio and Java install. Additionally, you'll need to install an Android device to emulate.

## Installation

- Android Studio: https://developer.android.com/studio Install in `/usr/local/`
- Java: download at https://www.oracle.com/java/technologies/downloads/ and install https://docs.oracle.com/en/java/javase/18/install/installation-jdk-linux-platforms.html#GUID-ADC9C14A-5F51-4C32-802C-9639A947317F
- Create a new device in Android Studio. API version must be 24 or greater to work with Capacitor.
- Setup the Android Studio environment https://capacitorjs.com/docs/getting-started/environment-setup#android-development. NOTE: API should not be higher than v31. I had to remove the tools installed by default for API v32, and only use Android 12 (s). See https://github.com/ionic-team/native-run/issues/219#issuecomment-1016503975

## Redwood setup

Add capacitor to your redwood app in `web` using the instructions here https://github.com/ionic-team/capacitor

You MUST perform setup within `/web` directory, since capacitor does not work well with monorepos. If you correctl installed things in `web/package.json`, then later you should see "Found x Capacitor plugins...":

![](./assets/capacitor-run-android.png)

NOTES:

- Hot re-load is hit-or-miss for working. Not sure why
- isBrowser from `@redwoodjs/prerender/browserUtils` returns false for Android

TODO:

- Replace localstorage https://capacitorjs.com/docs/v2/apis/storage#storage\
- Fix set-cookie not being set

use http package to set cookies?

- Discussion https://github.com/ionic-team/capacitor/issues/5145
- https://stackoverflow.com/questions/5716898/set-a-cookie-to-a-webview-in-android
- Oauth package https://github.com/moberwasserlechner/capacitor-oauth2

Package: https://github.com/capacitor-community/http

```
"csrf-token": "3fbb07e6-eb4a-4d97-8b58-55f162221d7b",
api |     "Set-Cookie": "session=U2FsdGVkX18MrrIFVIc9pb1S67V8FAJcsCeBUPpRjxAt7aJe3BcXPo1HAnlB5pef4QnR935rM33Qd5AYMsfsoEZy1zPbUa+Uu1c9fGWPkvU=;HttpOnly;Path=/;SameSite=None;Expires=Tue, 31 May 2022 05:28:11 GMT"
```

set-cookie: session=U2FsdGVkX18YdHiF/Od5IfAtCM7hUN/3gJa9hUfF8JgWPVq77px7ywOtQk6kZviN1Ng8P3q2xZ61i+ycRn9ZcvxhaBDRFSgApOeB8ndTVMI=;Path=/;SameSite=None;Expires=Tue, 31 May 2022 05:53:40 GMT
