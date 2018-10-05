import React, { Component } from 'react'
import {View, Text, StyleSheet, TextInput, TouchableHighlight, Button} from 'react-native';
import { inject, observer } from 'mobx-react';
/**********************************************************************************************************************/
@inject("listStore")
@observer
class NewItem extends Component {
    constructor (props) {
        super(props);
        this.state = {
            newItem: ''
        };
    }
    addCar () {
        if (this.state.newItem === '') return;
        const person = this.props.navigation.getParam("person", {});
        this.props.listStore.addCar(person, this.state.newItem);
        this.setState({
            newItem: ''
        });
    }
    updateNewItem (text) {
        this.setState({
            newItem: text
        });
    }
    render () {
        const list = this.props.listStore.list;
        const id = this.props.navigation.getParam("person", {}).id;
        let person = {};
        list.map((p)=>{
            if(parseInt(p.id) == parseInt(id)) {
                person = p;
            }
        });
        const cars = person.cars;
        return (
            <View style={{flex: 1}}>
                <View style={styles.heading}>
                    <Text style={styles.headingText}>{person.name}</Text>
                    <Text
                        onPress={() => this.props.navigation.goBack()}
                        style={styles.closeButton}>&times;</Text>
                </View>
                {!person.cars.length && <NoItems />}
                {person.cars.length ? <Items cars={cars} /> : <View />}
                <View style={{flexDirection: 'row'}}>
                    <TextInput
                        value={this.state.newItem}
                        onChangeText={(text) => this.updateNewItem(text)}
                        style={styles.input} />
                    <TouchableHighlight
                        onPress={this.addCar.bind(this)}
                        style={styles.button}>
                        <Text>Add</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const NoItems = () => (
    <View style={styles.noItem}>
        <Text style={styles.noItemText}>No cars, Add car to this person</Text>
    </View>
);
const Items = ({cars}) => (
    <View style={{flex: 1, paddingTop: 10}}>
        {cars.map((car, i) => {
            return <Text style={styles.item} key={i}>• {car.name}</Text>
        })
        }
    </View>
);

const styles = StyleSheet.create({
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
        backgroundColor: '#ededed',
        padding: 20,
        flex: 1
    },
    button: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#ededed'
    },
    closeButton: {
        position: 'absolute',
        right: 17,
        top: 18,
        fontSize: 36
    },
    noItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noItemText: {
        fontSize: 22,
        color: '#156e9a'
    },
    item: {
        color: '#156e9a',
        padding: 10,
        fontSize: 20,
        paddingLeft: 20
    }
});

export default NewItem;
