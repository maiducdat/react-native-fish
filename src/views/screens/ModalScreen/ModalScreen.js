import React from 'react'
import {View, Text, Button} from 'react-native'
/**********************************************************************************************************************/

class ModalScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>ModalScreen!</Text>

                <Button
                    title="Back"
                    onPress={() => this.props.navigation.goBack()}
                />
            </View>
        );
    }
}

export default ModalScreen
