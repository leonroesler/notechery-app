import React, { Component } from 'react';
import { 
    View, 
    Text, 
    Dimensions, 
    Keyboard, 
    TouchableWithoutFeedback, 
    ActivityIndicator, 
    TouchableOpacity,
    ToastAndroid
} from 'react-native';

import { Icon, Button } from 'react-native-elements';
import firebase from 'firebase';
import { connect } from 'react-redux';

import colors from '../styles/colors';
import * as actions from '../actions'
import Textinput from './reusable/Textinput';
import HomeScreen from './HomeScreen';

const { width, height} = Dimensions.get('window')
class AuthScreen extends Component {

    static navigationOptions = () => {
       return {
        tabBarVisible: false
       }
    }
    state = {
        email: '',
        password: '',
        loggedIn: null,
        togglePassword: true,
        autologin: false
    }

    componentDidMount() {
       this.props.tryAutoLogin()
       this.loginComplete(this.props)
    }
    

    componentWillReceiveProps(nextProps) {
        this.loginComplete(nextProps)
    }
    loginComplete = (props) => {
        if (props.autoLogin) {
            this.props.navigation.navigate('home')
        }
        
    }

    evaluateEmail = (value) => {
        this.setState({ email: value});
    }

    evaluatePassword = value => {
        this.setState({ password: value })
    }

    skipLogin = () => {
        this.props.navigation.navigate('home')
    }
    login = () => {
        const { email, password } = this.state
        this.props.userLogin(email, password, () => {this.showToast();})
    }

    togglePassword = () => {
        this.setState({ togglePassword: !this.state.togglePassword})
    }

    showToast = () => {
        if (this.props.error) {
        ToastAndroid.showWithGravityAndOffset(
        this.props.error,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        0
        );
      }
    }

    render() {
        const { containerStyle } = styles
        if(this.state.loggedIn === null) {
            return (
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center'}}>
                <ActivityIndicator size="large" color="#DE2E2E"/>
            </View>
            )
        }

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={containerStyle}>
                <View  style={{ flexDirection: 'row', marginLeft: width * 0.1  ,
        marginRight: width * 0.1, alignItems: 'flex-end'}}>
                    <Icon
                    name='account'
                    type='material-community'
                    color= {colors.red}
                    size={32} 
                    iconStyle={{ marginRight: 5 }}
                    />
                    <Textinput 
                        label='E-Mail'
                        onChangeText={this.evaluateEmail}
                        value={this.state.email}
                        inputLength={ width * 0.7}
                    />
                </View>
                <View style={{ flexDirection: 'row', marginLeft: width * 0.1,
        marginRight: width * 0.1, alignItems: 'flex-end', marginTop: 15}}>
                    <Icon
                    name='lock-open'
                    type='material-community'
                    color='#DE2E2E' 
                    size={32}
                    iconStyle={{ marginRight: 5  }}
                    />
                    
                    <Textinput 
                        label='Passwort'
                        onChangeText={this.evaluatePassword}
                        value={this.state.password}
                        secureTextEntry={this.state.togglePassword}
                        inputLength={ width * 0.6}
                    />
                    <TouchableOpacity  
                style={{ marginLeft: 5}}
                onPress={this.togglePassword}
                >
                {!this.state.showPassword ? <Icon 
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
                
                <View style={{ }}>
                <Button 
                    title='Anmelden'
                    backgroundColor='#DE2E2E'
                    rounded
                    color='#fff'
                    containerViewStyle={{ marginVertical: 70, marginHorizontal: width * 0.1, paddingHorizontal: width * 0.1}}
                    onPress={this.login}
                    />

                    <Button 
                    title='Überspringen'
                    transparent
                    color='#DE2E2E'
                    containerViewStyle={{ marginVertical: 5, marginHorizontal: width * 0.1, paddingHorizontal: width * 0.1}}
                    onPress={this.skipLogin}
                    />

                    <Button 
                    title='Neuen Account anlegen'
                    transparent
                    color='#DE2E2E'
                    containerViewStyle={{ marginHorizontal: width * 0.1, paddingHorizontal: width * 0.1}}
                    />
                </View>
                
            </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F7F7F7'
    }
}

const mapStateToProps = ({auth}) => {
    const { error, isLoading, loggedIn, autoLogin } = auth;
    return { error, isLoading, loggedIn, autoLogin}
}

export default connect(mapStateToProps, actions)(AuthScreen);