import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  View,
  AsyncStorage,
  StyleSheet,
  Alert
} from 'react-native';



// App Globals
import AppConfig, {navigatorStyle} from './../config'
import AppStyles from './../styles'

import BackgroundImage from './../components/BackgroundImage'


class defaultPage extends Component {


    render() {

        return (
            
            <BackgroundImage blur>

                <View style={{height: 200, width: 200, backgroundColor: 'red', position: 'absolute', top: -200}}><Text>okay</Text></View>
            </BackgroundImage>
        );
    }
}




export default defaultPage;