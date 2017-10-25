import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  View,
  AsyncStorage,
  StyleSheet,
  Alert
} from 'react-native';
import { CreditCardInput } from "react-native-credit-card-input";

// App Globals
import AppConfig, {navigatorStyle} from './../config'
import AppStyles from './../styles'

import BackgroundImage from './../components/BackgroundImage'
import Button from '../components/Button'


class addCard extends Component {

    _onChange= (form) => {
        console.log(form, 'onChange');
    }

    render() {

        return (

            <BackgroundImage blur>

                <View style={{flex:1, padding: 20}}>

                    <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                        <CreditCardInput 
                            onChange={this._onChange}
                            requiresName
                            labelStyle={{backgroundColor: 'transparent', color: 'white', fontSize: 12}}
                            inputStyle={{ color: 'white' }} 
                            inputContainerStyle={{borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.4)'}}
                            allowScroll={true}
                        />
                    </View>

                    <View style={{justifyContent: 'flex-end', alignSelf: 'stretch'}}>
                        <Button
                            title='Save'
                            type="secondary"
                            onPress={this.submit}
                        />
                    </View>
                </View>
            </BackgroundImage>
        );
    }
}




export default addCard;