import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Icon, Button } from 'react-native-elements';

import container from '../styles/container';
import colors from '../styles/colors';
import Header from './reusable/Header';
const testArray = [
    {name: 'alfi', nachname: 'fredi', alter: '27'},
    {name: 'leon', nachname: 'schrumpfkopf', alter: '14' },
    {name: 'marlon', nachname: 'mattern', alter: '28' },
    {name: 'Stevie', nachname: 'Wonder', alter: '39' },
]
const { width, height } = Dimensions.get('window')
class DetailedArrowScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
          headerTitle: 'Neue Gruppe',
          tabBarVisible: false,
          swipeEnabled: false,
    
          headerStyle: {
          backgroundColor: '#ff5555',
          },
    
          headerTitleStyle: {
            color: 'white'
          },
    
          headerRight: (
            <TouchableOpacity onPress={() => navigation.navigate('overView')}>
              <View style={{ marginRight: 15 }}>
                <Icon
                  name='check'
                  color='white'
                />
              </View>
            </TouchableOpacity>
          ),
    
          headerLeft: (
            <TouchableOpacity onPress={() => navigation.navigate('overView')}>
            <View style={{ marginLeft: 15 }}>
             <Icon
               name='arrow-back'
               color='white'
             />
           </View>
           </TouchableOpacity>
            )
    
    };
      }
    render() {
        
        const { cardStyle, containerStyle, headlineStyle, outerContainer, resultHeadline, resultStyle } = styles
        return (
            <View style={[container.flexOne, {backgroundColor: colors.background}]}>
                <Header topic='Bögen' />
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
                            {testArray[0].alter}
                        </Text>
                        <Text style={resultHeadline}>
                            {testArray[0].name}
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
                            {testArray[0].nachname}
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
            </View>
        )
    }
}

const styles = {
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
        paddingHorizontal: width * 0.1,
        marginTop: 20,
        marginBottom: 5,
        backgroundColor: colors.background
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

export default DetailedArrowScreen