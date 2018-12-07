import React, { Component } from 'react';
import { View, Text,  Dimensions, ActivityIndicator } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import moment from 'moment'
import 'moment/locale/de'

import * as actions from '../actions';
import { connect } from 'react-redux';
import colors from '../styles/colors';

const { width, height } = Dimensions.get('window');

class HomeScreen extends Component {

    state = {
        currentDate: '',
    }
    static navigationOptions = () => {
        return {
            tabBarIcon: ({ tintColor }) => {
              return <Icon name="dashboard" size={20} color={tintColor} />;
             }
        }
    }
    
    
     componentDidMount () {
        this.props.fetchWeather();
        this.actualDate()
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.loggedIn === false)
        this.props.navigation.navigate('main')
    }
   
    logout = () => {
        this.props.userLogout()
    }

    actualDate () {
        const currentDate = new Date()
        const formattedDate = (moment(currentDate).format('LL'))
        this.setState({ currentDate: formattedDate})
    }
         
    render() {
        const {headlineText, sublineText, defaultText, highlightedText, container,containerData, iconContainer } = styles;
        const { temperature, windDirection, windSpeed, isLoading } = this.props;

        if (isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center'}}>
                    <ActivityIndicator size="large" color="#DE2E2E"/>
                </View>
            );
          }
        
        return (
          
            <View style={container}>
            <View style={containerData}>
            <Text>
                    <Text style={headlineText}>        
                    Hallo! {'\n'}
                    </Text>
                    <Text style={sublineText}>
                    Starte eine neue Aktivität.
                    </Text>
             </Text>
                <Text style={sublineText}>
                    Deine letzte Aktivität war am {'\n'} 
                </Text>
                <Text style={highlightedText}>
                10.10.2018
                </Text>
                <View style={[iconContainer,{ marginTop: 50 }]}>
                <Icon
                    name='calendar-blank'
                    type='material-community'
                    color='#DE2E2E'
                />
                <Text style={defaultText}> {this.state.currentDate}</Text>
                </View>
                <View style={iconContainer}>
                    <Icon
                        name='location-on'
                        color='#DE2E2E'
                        />
                    <Text style={defaultText}> DEFAULT LOCATION</Text>
                </View>
                <View style={iconContainer}>
                    <Icon

                        name='md-sunny'
                        type='ionicon'
                        color='#DE2E2E'
                        onPress={() => console.log('hello')} 
                    />
                     <Text style={defaultText}> {Math.round(temperature)}°</Text>
                </View>
                <View style={iconContainer}>
                    <Icon

                        name='toys'
                        color='#DE2E2E'
                        onPress={() => console.log('hello')} 
                    />
                     <Text style={defaultText}> {windSpeed} m/s aus {windDirection}</Text>
                </View>

                <View>
                    <Button 
                    title='Training beginnen'
                    backgroundColor='#DE2E2E'
                    rounded
                    color='#fff'
                    containerViewStyle={{ marginTop: 70, marginBottom: 10, marginLeft: 0, paddingLeft: 0, paddingRight: 0, marginRight: 0}}
                    />

                    <Button 
                    title='Wettkampf beginnen'
                    backgroundColor='#DE2E2E'
                    rounded
                    color='#fff'
                    containerViewStyle={{ marginVertical: 10,  marginLeft: 0, paddingLeft: 0, paddingRight: 0, marginRight: 0}}
                    />
                </View> 
            </View>
            <ActionButton buttonColor="rgba(222,46,46,1)" offsetX={10} offsetY={10} bgColor='rgba(0,0,0,0.7)' fixNativeFeedbackRadius>
                    <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={this.logout}>
                        <Icon 
                        name='md-sunny'
                        type='ionicon' 
                        style={{color: 'white'}} 
                        />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
                        <Icon name='toys' style={{color: 'white'}} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
                        <Icon  name='calendar-blank'
                                type='material-community' style={{color: 'white'}} />
                    </ActionButton.Item>
                </ActionButton>
              
            </View>
        );
    }
}

const mapStateToProps = ({ weather, auth}) => {
    const { isLoading, temperature, windDirection, windSpeed } = weather;
    const { loggedIn } = auth;
    return { isLoading, temperature, windDirection, windSpeed, loggedIn }
}

export default connect(mapStateToProps, actions)(HomeScreen)

const styles = {
    container: {
        flex: 1,
        
    },
    containerData: {
        marginLeft: width * 0.1,
        marginRight: width * 0.1,
        paddingTop: height * 0.1,
    },
    iconContainer: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    headlineText: {
        fontSize: 26,
        fontWeight: '400',
    },
    sublineText: {
        fontSize: 17,
        fontWeight: '400',
        marginTop: 30,
    },
    highlightedText: {
        color: colors.red, 
    },
    defaultText: {
       paddingLeft: 15,
    }

}