import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  View,
  AsyncStorage,
  StyleSheet,
  Alert
} from 'react-native';
import RNRestart from 'react-native-restart';


// App Globals
import AppConfig, {navigatorStyle} from './../config'
import AppStyles from './../styles'

import BackgroundImage from './../components/BackgroundImage'
import Button from '../components/Button'
import PinInput from '../components/PinInput'


class verifyEmail extends Component {

    verifyPin = (pin) => {
        console.log('pin entered', pin);
    }

    render() {

        return (

            <BackgroundImage blur>

                <View style={styles.mainCon}>

                    <Text style={[AppStyles.h4, styles.heading]}>Enter the 4 digit code we sent you via email to continue</Text>
      
                    <PinInput pinItemProps={{keyboardType: 'numeric'}} onPinCompleted={this.verifyPin} />

                    <View style={{alignSelf: 'stretch', paddingHorizontal: 15}}>

                        <View style={{marginVertical: 20}}>
                            <Button
                                title='Continue'
                                type="primary"
                                onPress={this.submit}
                            />
                        </View>
                        
                        <View style={[AppStyles.flex1, {alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 5}]}>
                            <Text style={[AppStyles.p2, {textAlign: 'right', paddingRight: 5, fontSize: 12, color: 'rgba(255,255,255,0.6)'}]}>Didn't get the code?</Text>
                            <Text onPress={this.resendCode} style={[AppStyles.p2, {color: '#28a9b0', fontSize: 12, fontWeight: '600'}]}>Resend Code</Text>
                        </View>
                    </View>

                </View>
            </BackgroundImage>
        );
    }
}


const styles= StyleSheet.create({
    mainCon: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    heading: {
        paddingHorizontal: 25,
        fontWeight: '400',
        textAlign: 'center'
    }
});




export default verifyEmail;