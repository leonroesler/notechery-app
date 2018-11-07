import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import firebase from 'firebase'
import storeConfiguration from './store';

import FlatListDemo from './components/FlatListDemo';
import AuthScreen from './components/AuthScreen';
import HomeScreen from './components/HomeScreen';

export default class App extends React.Component {

  componentWillMount() {
    
    firebase.initializeApp({
      apiKey: "AIzaSyAp2O1YzdJ34y5e2lz86REjqis0ehsy4v8",
      authDomain: "notechery.firebaseapp.com",
      databaseURL: "https://notechery.firebaseio.com",
      projectId: "notechery",
      storageBucket: "notechery.appspot.com",
      messagingSenderId: "984913087791"
    })
  }
  render() {

    const MainNavigation = createBottomTabNavigator({
      main: { screen: AuthScreen},
      home: { screen: HomeScreen }
    })
    return (
      <Provider store={storeConfiguration}>
        <View style={styles.container}>
          <MainNavigation />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
