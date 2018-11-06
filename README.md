# react-native-fish
React-Native starter kit
========================================================================================================================
*** NOTE ***  
Please learn how to create mobile app with react-native before use and fuck this stater kit.  
(https://facebook.github.io/react-native/)

WHAT DOES IT HAVE?
------------------
- react-native 0.57
- react-navigation
- MobX v5
- Realm

WHAT I HAVE DONE
------------------
- start with react-native init (not create-react-native-app from FB)
- use react-navigator:
    + tab navigator
    + it goes with stack navigator for each tab
    + use fullscreen modal follow this diagram (https://reactnavigation.org/docs/assets/modal/tree.png)
- define all colors, images, labels in theme/Colors.js, theme/Images.js, constants/Labels.js to make it simple in replacement
- define all shared component in /views/components
- define alias in .babelrc to make simple import (does not work with "go to definition" feature in Intellij)
    + use babel-plugin-module-resolver  
    + from this shit:  
        import Item from '../../components/Item';  
    + to awesome:  
        import Item from 'components/Item';  
- use MobX V5 (need to upgrade JavaScriptCore https://github.com/react-community/jsc-android-buildscripts#how-to-use-it-with-my-react-native-app)
- use Realm to manage database
- use react-native-secure-key-store to store encryption key (use with Realm)
- fix issue in XCode 10:
    + react native build input file cannot be found double conversion:
        * cd node_modules/react-native/scripts && ./ios-install-third-party.sh && cd ../../../
        * cd node_modules/react-native/third-party/glog-0.3.5/ && ../../scripts/ios-configure-glog.sh && cd ../../../../
    + 
- use react-native-languages and i18n-js to manage multiple languages
- use axios to create service manager
- use react-native-indicators with a lot of indicator type
