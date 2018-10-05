import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, TouchableHighlight, TextInput, FlatList } from 'react-native';
import { inject, observer } from 'mobx-react';
import Item from 'components/Item';
import NewItem from '../NewItem/NewItem';
import storage from "storage";
import DBManager from "../../../lib/DBManager";
/**********************************************************************************************************************/
@inject("listStore")
@observer
class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "HomeScreen "
        };
    };
    constructor (props) {
        super(props);
        this.state = {
            text: '',
            showInput: false,
            openTime: ""
        };
        this.props.listStore.loadOldList();
    }
    async componentDidMount() {
        let openTime = await storage.loadString(storage.Keys.OPEN_TIME);
        this.setState({openTime});
    }
    toggleInput () {
        this.setState({ showInput: !this.state.showInput });
    }
    addListItem () {
        this.props.listStore.addPerson(this.state.text);
        this.setState({
            text: '',
            showInput: !this.state.showInput
        })
    }
    removeListItem (person) {
        this.props.listStore.removePerson(person)
    }
    updateText (text) {
        this.setState({text})
    }
    addItemToList (person) {
        this.props.navigation.navigate('NewItem', {person})
    }
    render() {
        const { showInput } = this.state;
        const list = this.props.listStore.list;
        return (
            <View style={{ flex: 1}}>
                <Text>open time: {this.state.openTime}</Text>
                {!list.length ? <NoList /> : null}
                <View style={{flex:1}}>
                    {list.map((person, i) => {
                        return <View key={i} style={styles.itemContainer}>
                            <Text
                                style={styles.item}
                                onPress={this.addItemToList.bind(this, person)}>{person.name.toUpperCase()}</Text>
                            <Text
                                style={styles.deleteItem}
                                onPress={this.removeListItem.bind(this, person)}>Remove</Text>
                        </View>
                    })}
                </View>
                <TouchableHighlight
                    underlayColor='transparent'
                    onPress={
                        this.state.text === '' ? this.toggleInput.bind(this)
                            : this.addListItem.bind(this, this.state.text)
                    }
                    style={styles.button}>
                    <Text style={styles.buttonText}>
                        {this.state.text === '' && '+ New Person'}
                        {this.state.text !== '' && '+ Add Person to the list'}
                    </Text>
                </TouchableHighlight>
                {showInput && <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.updateText(text)} />}
            </View>
        );
    }
}

export default HomeScreen;

const NoList = () => (
    <View style={styles.noList}>
        <Text style={styles.noListText}>No person, Add person Get Started</Text>
    </View>
);

const styles = StyleSheet.create({
    itemContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#ededed',
        flexDirection: 'row'
    },
    item: {
        color: '#156e9a',
        fontSize: 18,
        flex: 3,
        padding: 20
    },
    deleteItem: {
        flex: 1,
        padding: 20,
        color: '#a3a3a3',
        fontWeight: 'bold',
        marginTop: 3
    },
    button: {
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#156e9a'
    },
    buttonText: {
        color: '#156e9a',
        fontWeight: 'bold'
    },
    heading: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#156e9a'
    },
    headingText: {
        color: '#156e9a',
        fontWeight: 'bold'
    },
    input: {
        height: 70,
        backgroundColor: '#f2f2f2',
        padding: 20,
        color: '#156e9a'
    },
    noList: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noListText: {
        fontSize: 22,
        color: '#156e9a'
    },
});
