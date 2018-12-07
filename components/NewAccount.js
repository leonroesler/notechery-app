import React, { Component } from 'react';
import { View, 
    Dimensions,  
    TouchableOpacity,
    ToastAndroid, } from 'react-native';
import { connect } from 'react-redux';
import { Button, Card, Icon} from 'react-native-elements';

import * as actions from '../actions'
import colors from '../styles/colors';
import Textinput from './reusable/Textinput';

const { width, height} = Dimensions.get('window')
class NewAccount extends Component {
    state = {
        newEmail: '',
        repeatEmail: '',
        newPassword: '',
        loggedIn: null,
        togglePassword: true,
        showModal: false
    }

    evaluateNewEmail = (value) => {
        this.setState({ newEmail: value});
    }

    evaluateRepeatEmail = value => {
        this.setState({ repeatEmail: value })
    }

    evaluateNewPassword = value => {
        this.setState({ newPassword: value })
    }

    createUser = () => {
        const { newEmail, newPassword } = this.state;
        this.props.createNewUserAccount(newEmail, newPassword)
        console.log(this.props.userCredentials)
    }

    componentWillReceiveProps(nextProps) {
        this.loginComplete(nextProps)
    }
    loginComplete = (props) => {
        if (props.userCredentials ) {
            this.props.navigation.navigate('home')
        } 
    }

    
    togglePassword = () => {
        this.setState({ togglePassword: !this.state.togglePassword})
    }

    
    render() {
        const { cardTitle, CardStyle } = styles
        return (
            <Card 
            title='Account Erstellen' 
            containerStyle={{ borderRadius: 15, width: width * 0.9}}
            titleStyle={cardTitle}
            dividerStyle={CardStyle}
            >
                <View  style={{ flexDirection: 'row',  alignItems: 'flex-end'}}>
                <Icon
                name='account'
                type='material-community'
                color= {colors.red}
                size={32} 
                iconStyle={{ marginRight: 5 }}
                />
                <Textinput 
                    label='E-Mail Adresse'
                    onChangeText={this.evaluateNewEmail}
                    value={this.state.newEmail}
                    inputLength={ width * 0.7}
                />
            </View>
            <View style={{ flexDirection: 'row',  alignItems: 'flex-end', marginTop: 15}}>
               <Icon
                name='account'
                type='material-community'
                color= {colors.red}
                size={32} 
                iconStyle={{ marginRight: 5 }}
                />
                
                <Textinput 
                    label='E-Mail Adresse wiederholen'
                    onChangeText={this.evaluateNewPassword}
                    value={this.state.repeatEmail}
                    secureTextEntry={this.state.togglePassword}
                    inputLength={ width * 0.7}
                />
            </View>


            <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 15}}>
                <Icon
                name='lock-open'
                type='material-community'
                color='#DE2E2E' 
                size={32}
                iconStyle={{ marginRight: 5  }}
                />
                <Textinput 
                    label='Passwort'
                    onChangeText={this.evaluateNewPassword}
                    value={this.state.newPassword}
                    secureTextEntry={this.state.togglePassword}
                    inputLength={ width * 0.6}
                />
                <TouchableOpacity  
            style={{ marginLeft: 5}}
            onPress={this.togglePassword}
            >
            {!this.state.togglePassword ? <Icon 
                name='eye'
                type='entypo'
                size={25}   
            /> : <Icon 
                name='eye-with-line'
                type='entypo'
                size={22}   
            />}
            </TouchableOpacity> 
            </View>
            
            <View style={{ alignItems: 'stretch'}}>
                <Button 
                    title='Account erstellen'
                    backgroundColor='#DE2E2E'
                    rounded
                    color='#fff'
                    containerViewStyle={{ marginTop: 50, }}
                    onPress={this.createUser}
                />
                <Button 
                    title='Abbrechen'
                    backgroundColor='transparent'
                    color='#DE2E2E'
                    containerViewStyle={{ marginVertical: 20, marginHorizontal: 10 }}
                    onPress={this.props.close}
                />
            </View>
            </Card>
        );
    }
}

const styles = {
    cardTitle: {
        fontSize: 26,
        fontWeight: '400',
        borderBottomWidth: 0,
    },
    CardStyle: {
        borderBottomWidth: 0, 
    }
    
}
const mapStateToProps = ({ auth }) => {
    const { userCredentials } = auth;
    return { userCredentials }
}


export default connect(mapStateToProps, actions)(NewAccount)