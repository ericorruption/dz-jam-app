# Jam App

## Dependencies
* [node.js](https://nodejs.org)
* [Cordova](http://cordova.apache.org/) (`npm install -g cordova`)

To deploy as a mobile app:
* Android needs [Ant](http://ant.apache.org/) and the [Android SDK](http://developer.android.com/sdk/).
* IOS needs a Mac. Seriously. And [XCode](https://developer.apple.com/xcode/downloads/).

## Preparing project
* npm install
* npm start

## Adding platform (ios, android, browser)
Adds assets to compile to specific platforms

    cordova platform add <platform>


## Deployment for testing
    cordova run <platform>

## Deployment for release
    cordova build <platform> --release

## Deployment: Android

* Edit `AndroidManifest.xml` on `platforms/android` folder, changing the following line (before `cordova build`):

        <uses-sdk android:minSdkVersion="7" android:targetSdkVersion="19" />


* Execute the commands:

        jarsigner -keystore release.keystore platforms/android/ant-build/JamApp-release-unsigned.apk jamapp
        cd platforms/android/ant-build
        zipalign -v 4 JamApp-release-unsigned.apk JamApp-release.apk

when asked for a password, use `dzprav06`.


* Upload JamApp-release.apk to [Google Play Developer Console](https://play.google.com/apps/publish).
