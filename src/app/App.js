/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View} from 'react-native';
import {Provider} from "mobx-react"
import RootNavigator from './Navigator';
import stores from "../stores";
import storage from "../lib/storage/storage";
import DataBase from "../lib/DBManager/DataBase";
/**********************************************************************************************************************/

type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);

        this.state = {isDBReady: false};
        let _this = this;
        this.DBManager = new DataBase(()=>{
            setTimeout(()=>{
                _this.setState({isDBReady: true})
            }, 500);
        });
    }
    componentDidMount() {
        storage.saveString(storage.Keys.OPEN_TIME, new Date().toLocaleString());
    }
    render() {
        if(!this.state.isDBReady) {
            return <View/>;
        }
        return (
            <Provider  {...stores}>
                <RootNavigator/>
            </Provider>
        );
    }
}
