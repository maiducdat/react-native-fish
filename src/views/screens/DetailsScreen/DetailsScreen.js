import React from 'react'
import { View, Text } from 'react-native'
/**********************************************************************************************************************/

class DetailsScreen extends React.Component {
    static navigationOptions = {
        title: 'DetailsScreen',
    };
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Details!</Text>
            </View>
        );
    }
}

export default DetailsScreen
