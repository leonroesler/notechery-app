import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Icon, Card } from 'react-native-elements'
import colors from '../../styles/colors';
 
const { width } = Dimensions.get('window');
class CustomCard extends Component {
    render() {
        const { cardStyle, containerStyle, headlineStyle, outerContainer, resultHeadline, resultStyle } = styles
        const { datenstruktur } = this.props;
        return (
            <View style={containerStyle}>
                <Card containerStyle={cardStyle}>
                    <Text style={headlineStyle}>
                        Hoyt Eclipse
                    </Text>
                
                  <View style={outerContainer}>
                    <View style={{flexDirection: 'column'}}>
                        <Icon
                            name='toys'
                            color={colors.red}
                            size={40}
                            onPress={() => console.log('hello')} 
                            />
                        <Text style={resultStyle}>        
                            {datenstruktur.alter}
                        </Text>
                        <Text style={resultHeadline}>
                            {datenstruktur.name}
                        </Text>
                    </View>


                    <View style={{flexDirection: 'column'}}>
                        <Icon
                            name='toys'
                            color={colors.red}
                            size={40}
                            onPress={() => console.log('hello')} 
                        />
                        <Text style={resultStyle}>        
                            2
                        </Text>
                        <Text style={resultHeadline}>
                            {datenstruktur.nachname}
                        </Text>
                    </View>

                    <View style={{flexDirection: 'column'}}>
                        <Icon
                            name='toys'
                            color={colors.red}
                            size={40}
                            onPress={() => console.log('hello')} 
                        />
                        <Text style={resultStyle}>        
                            30
                        </Text>
                        <Text style={resultHeadline}>
                            Trainings
                        </Text>
                        </View>

                  </View>
                </Card>
            </View>
        )
    }
}

const styles = {
    containerStyle: {
        flex: 1,
    },
    cardStyle: {
        borderRadius: 15, 
        width: width * 0.9,
        elevation: 5, 
        borderBottomWidth: 0, 
        borderRightWidth: 0, 
        borderLeftWidth: 0, 
        borderTopWidth: 0
    },
    headlineStyle: {
        fontWeight: '700',
        fontSize: 17,
        color: colors.red,
        textAlign: 'center',
        marginBottom: 10,
    },
    outerContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 5
    },
    resultHeadline: {
        color: colors.inputColor,
        fontSize: 11,
        paddingTop: 0,
        textAlign: 'center',
    },
    resultStyle: {
        fontWeight: '400',
        fontSize: 15,
        textAlign: 'center',
        paddingBottom: 0,
        marginTop: 10,
    }
}
export default CustomCard