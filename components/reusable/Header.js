import React, { Component } from 'react';
import { View, Text, Dimensions, } from 'react-native';

const { width } = Dimensions.get('window')
class Header extends Component {
    render() {
        const { topic } = this.props;
        const {containerStyle, headlineText, sublineText } = styles;
        return (
            <View style={containerStyle}>
                <Text>
                    <Text style={sublineText}>        
                        Das sind deine {'\n'}
                    </Text>
                    <Text style={headlineText}>
                        {topic}
                    </Text>
                </Text>
            </View>
        )
    }
}

const styles = {
    containerStyle: {
        marginTop: 50, 
        marginLeft: width * 0.2,
        marginBottom: 30,
    },
    headlineText: {
        fontSize: 34,
        fontWeight: '400',
    },
    sublineText: {
        fontSize: 22,
        fontWeight: '400',
    },
}

export default Header