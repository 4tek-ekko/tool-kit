# Project: sp

### :file_folder: Environment

- Node v12: 18.6.0 or higher
- Yarn: 1.22.19 or higher
- React Native Cli: 2.0.1 or higher
- Java JDK: 1.8.0_291 or higher
- Open JDK: 11.0.15
- Open JDK Runtime Zulu11.56+19-CA
- Ruby: 2.7.5 or higher
- Cocoapods: 1.11.1 or higher
- XCode: 13.0.1 or higher
- Android Studio: version 2021

### :point_right: Getting Started

```sh
yarn && yarn pod
yarn ios # run ios
yarn android # run android
```

### :rocket: CodePush & Fastlane Setup

- CodePush:
  - Update codepush app ids in <a href="../../../tree/develop/template/package.json">package.json</a>
  ```
  "codepush": {
    "ios_app_id": "<ios_app_id>",
    "android_app_id": "<android_app_id>",
  },
  ```
  - Update `CodePushDeploymentKey` in <a href="../../../tree/develop/template/.env">.env</a>
  - Rebuild app and run `yarn c:ios` or `yarn c:android` to update codepush
- Fastlane:
  - Update config information in <a href="../../../tree/develop/template/ios/fastlane/Fastfile">ios/fastlane/Fastfile</a> and <a href="../../../tree/develop/android/fastlane/Fastfile">android/fastlane/Fastfile</a>
  - Run `yarn f:ios` or `yarn f:android` to build app to firebase app distribution
