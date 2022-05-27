Run the emulator

```bash
ANDROID_HOME=/home/dev/Android/Sdk npx cap run android
```

> Update ~/.bashrc with `export ANDROID_HOME=/home/dev/Android/Sdk` to avoid having to set the environment each time

# Usage

Update .env with the location of your Android sdk. Also, you must ensure web uses the correct api url

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

# Setup

### Android Studio

https://developer.android.com/studio

### Install Java

Download the package https://www.oracle.com/java/technologies/downloads/
Installation https://docs.oracle.com/en/java/javase/18/install/installation-jdk-linux-platforms.html#GUID-ADC9C14A-5F51-4C32-802C-9639A947317F
