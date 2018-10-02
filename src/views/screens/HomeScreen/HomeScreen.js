import React from 'react'
import { View, Text, Button, FlatList } from 'react-native'
import Item from '../../components/Item';
/**********************************************************************************************************************/

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'HomeScreen',
    };
    constructor(props) {
        super(props);
        this.state = {
            itemList: [
                {
                    name: 'item 1'
                },
                {
                    name: 'item 2'
                },
            ]
        }
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flex: 0.2}}/>
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('DetailsScreen')}
                />
                <View style={{ flex: 0.2}}/>
                <Button
                    title="Show modal"
                    onPress={() => this.props.navigation.navigate('ModalScreen')}
                />
                <View style={{ flex: 0.2}}/>
                <FlatList
                    data={this.state.itemList}
                    renderItem={({item}) => <Item name={item.name}/>}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

export default HomeScreen
