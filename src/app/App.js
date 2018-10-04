/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Provider } from "mobx-react"
import RootNavigator from './Navigator';
import stores from "../stores";
import storage from "storage";
/**********************************************************************************************************************/

type Props = {};
export default class App extends Component<Props> {
    componentDidMount() {
        storage.saveString(storage.Keys.OPEN_TIME, new Date().toLocaleString());
    }
    render() {
        return (
            <Provider  {...stores}>
                <RootNavigator/>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
