import React from 'react'
import {View, Button, Alert, StyleSheet, Text, Image} from 'react-native'
import ServiceManager from "../../../lib/ServiceManager";
import Images from "../../../theme/Images";
import {UIActivityIndicator} from 'react-native-indicators';
/**********************************************************************************************************************/

class ServiceTestScreen extends React.Component {
    static navigationOptions = {
        title: 'ServiceTestScreen',
    };
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            pageIndex: 1,
            userList: []
        }
    }
    createUser() {
        this.setState({isLoading: true});
        ServiceManager.createUser({name: 'Dat', job: 'Dev'}, (response)=>{
            this.setState({isLoading: false});
            Alert.alert(
                'Success',
                'You have created new user',
                [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            )
        }, (error)=>{
            this.setState({isLoading: false});
            Alert.alert(
                'Fail',
                'There is something wrong',
                [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            )
        });
    }
    getNextUserList() {
        this.setState({isLoading: true});
        ServiceManager.getUser({page: this.state.pageIndex}, (response)=>{
            let newIndex = this.state.pageIndex + 1;
            if(newIndex > 4) {
                newIndex = 1;
            }
            this.setState({
                isLoading: false,
                pageIndex: newIndex,
                userList: response.data.data
            });
        }, (error)=>{
            this.setState({isLoading: false});
            Alert.alert(
                'Fail',
                'There is something wrong',
                [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            )
        });
    }
    render() {
        console.log("fish log:", JSON.stringify(this.state));
        return (
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }} pointerEvents={this.state.isLoading ? 'none' : 'auto'}>
                {
                    this.state.isLoading ? (
                        <View style={styles.loading}>
                            <UIActivityIndicator color='white' />
                        </View>
                    ) : null
                }
                <View style={styles.buttonBox}>
                    <Button
                        title="Create New User"
                        onPress={() => {
                            this.createUser()
                        }}
                    />
                    <View style={{ flex: 0.2}}/>
                    <Button
                        title="Get next user list"
                        onPress={() => {
                            this.getNextUserList();
                        }}
                    />
                </View>
                <View style={styles.userListBox}>
                    {
                        (this.state.userList && this.state.userList.length > 0) ? (
                            this.state.userList.map((user, index)=>{
                                return <View key={index} style={styles.user}>
                                    <Image
                                        source={{uri: user.avatar}}
                                        style={{width: 40, height: 40}}
                                    />
                                    <Text style={styles.user}>{user.first_name + " "  + user.last_name}</Text>
                                </View>
                            })
                        ) : <Text>No user</Text>
                    }
                </View>
            </View>
        );
    }
}

export default ServiceTestScreen

const styles = StyleSheet.create({
    buttonBox: {
        flex: 0.3,
        padding: 20,
        color: '#a3a3a3',
        fontWeight: 'bold',
        marginTop: 3
    },
    userListBox: {
        flex: 0.6,
        width: '100%',
        padding: 20
    },
    user: {
        padding: 10
    },
    loading: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
