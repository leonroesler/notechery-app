import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import firebase from 'firebase'
import storeConfiguration from './store';

import FlatListDemo from './components/FlatListDemo';
import AuthScreen from './components/AuthScreen';
import HomeScreen from './components/HomeScreen';
import ArrowScreen from './components/ArrowScreen';
import DetailedArrowScreen from './components/DetailedArrowScreen';
import colors from './styles/colors';

export default class App extends React.Component {

  async componentWillMount() {
    // hook up firebase connection when mounting the app
    await firebase.initializeApp({
      apiKey: "AIzaSyAp2O1YzdJ34y5e2lz86REjqis0ehsy4v8",
      authDomain: "notechery.firebaseapp.com",
      databaseURL: "https://notechery.firebaseio.com",
      projectId: "notechery",
      storageBucket: "notechery.appspot.com",
      messagingSenderId: "984913087791"
    })
    const firestore = firebase.firestore();
    const settings = { timestampsInSnapshots: true}
    
    await firestore.settings(settings)
  }
  render() {
    // whole navigation flow
    const MainNavigation = createBottomTabNavigator({
      main: { screen: AuthScreen},
      home: { screen: HomeScreen },
      arrows: { screen: ArrowScreen },
        screen: createStackNavigator({
          
          detailedArrowScreen: { screen: DetailedArrowScreen}
        })
    }, {
      tabBarOptions: {
        showLabel: false,
        labelStyle: { fontSize: 12 },
        showIcon: true,
        activeTintColor: colors.red,
        indicatorStyle: { backgroundColor: colors.red },
        iconStyle: { width: 15 },
        style: {
          backgroundColor: '#fff',
        }
      }
    }
    
    )
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
