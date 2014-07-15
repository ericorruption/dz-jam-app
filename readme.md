# Jam App

* To compile LESS assets, you need [Grunt](http://gruntjs.com/).
* To start the project on `path/to/dz-jam-app/www`, you need [Bower](http://bower.io/).

To deploy as a mobile app, you need [Cordova](http://cordova.apache.org/)
and the platform assets of your choice:

* Android needs [Ant](http://ant.apache.org/) and the [Android SDK](http://developer.android.com/sdk/).
* IOS needs a Mac. Seriously. And [XCode](https://developer.apple.com/xcode/downloads/).

## Preparing project
    npm install ncp

## Adding platform (ios, android)
Adds assets to compile to specific platforms

    cordova platform add <platform>


## Deployment for testing
    cordova run <platform>

## Deployment for release
    cordova build <platform> --release

## Deployment: Android

* Edit `AndroidManifest.xml` on `platforms/android` folder, changing the following line:

        <uses-sdk android:minSdkVersion="7" android:targetSdkVersion="19" />


* Execute the commands:

        cd platforms/android/ant-build
        keytool -genkey -keystore release.keystore -alias jamapp -validity 10000
        jarsigner -keystore release.keystore JamApp-release-unsigned.apk jamapp
        zipalign -v 4 JamApp-release-unsigned.apk JamApp-release.apk


* Upload JamApp-release.apk to [Google Play Developer Console](https://play.google.com/apps/publish).