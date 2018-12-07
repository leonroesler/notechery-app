import React, { Component } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import * as firebase from 'firebase';
import 'firebase/firestore';

import Header from './reusable/Header';
import CustomCard from './reusable/CustomCard';
import Textinput from './reusable/Textinput';
import colors from '../styles/colors';

const testArray = [
    {name: 'alfi', nachname: 'fredi', alter: '27'},
    {name: 'leon', nachname: 'schrumpfkopf', alter: '14' },
    {name: 'marlon', nachname: 'mattern', alter: '28' },
    {name: 'Stevie', nachname: 'Wonder', alter: '39' },
]

const { width, height } = Dimensions.get('window');
class ArrowScreen extends Component {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('users');
        this.unsubscribe = null;
    }
    static navigationOptions = () => {
        return {
            tabBarIcon: ({ tintColor }) => {
              return <Icon name="show-chart" size={20} color={tintColor} />;
             }
        }
    }
    state = {
        eintrag: ''
    }

    separator = () => 
    <View style={{marginVertical: 5 }}/>
    
    renderHeader = () => {
        return (
          <Header topic='Bögen'/>
        );
      };
    evaluateEintrag = (eintrag) => {
        this.setState({ eintrag })
        
        

    }
    eintragAnlegen = async () => {
        try{
           await this.ref.add({
                title: this.state.eintrag,
                abgeschlossen: false
            })
        }
        catch (error) { console.log(error)}
        
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: colors.background}}>
                <FlatList 
                    data={testArray}
                    renderItem={({item}) => <CustomCard datenstruktur={item}/>}
                    keyExtractor={(item) => item.alter}
                    ItemSeparatorComponent = {this.separator}
                    ListHeaderComponent={this.renderHeader}
                />
                <Textinput 
                label='Eintrag'
                onChangeText={this.evaluateEintrag}
                value={this.state.eintrag}
                inputLength={ width * 0.7}
                />
                <Button 
                    title='eintragerstellen'
                    onPress={this.eintragAnlegen}
                />


                <ActionButton buttonColor="rgba(222,46,46,1)" 
                offsetX={10} 
                offsetY={10}
                fixNativeFeedbackRadius
                onPress={() => console.log('FAB pressed')}    
                />
            </View>
        )
    }
}

export default ArrowScreen