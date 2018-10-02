import React from 'react'
import { View, Button } from 'react-native'
/**********************************************************************************************************************/

class SettingsScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {/* other code from before here */}
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('DetailsScreen')}
                />
            </View>
        );
    }
}

export default SettingsScreen