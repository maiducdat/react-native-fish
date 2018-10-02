import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, Image } from 'react-native';
import { Colors} from "../../theme/Colors";
import Images from "../../theme/Images";
/**********************************************************************************************************************/

class Item extends React.Component {
    render() {
        return (
            <View>
                <Text>{this.props.name}</Text>
                <Image
                    source={Images.gift}
                    style={{width: 40, height: 40}}
                />
            </View>
        )
    }
}

Item.propTypes = {
    name: PropTypes.string
};

Item.defaultProps = {
    name: 'icon'
};

module.exports = Item;
