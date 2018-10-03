# react-native-fish
React-Native starter kit
========================================================================================================================
*** NOTE ***  
Please learn how to create mobile app with react-native before use and fuck this stater kit.  
(https://facebook.github.io/react-native/)

WHAT DOES IT HAVE?
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

