import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  View,
  AsyncStorage,
  StyleSheet,
  Keyboard,
  Alert
} from 'react-native';

// App Globals
import AppConfig, {navigatorStyle} from '../config'
import AppStyles from '../styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Button from '../components/Button'
import Logo from '../components/Logo'
import BackgroundImage from '../components/BackgroundImage'
import InputField from '../components/InputField'



class forgotPassword extends Component {

    state = {
        email: ''
    }


    render() {

        let {email} = this.state;

        return (
            <View style={AppStyles.flex1}>
            
                <BackgroundImage blur>

                    <View style={[AppStyles.flex1, AppStyles.paddingHorizontal, AppStyles.centerContainer]}>
                        <Text style={[AppStyles.p2, {fontSize: 14, textAlign: 'center', paddingHorizontal: 20}]}>Enter your email address, we'll send you the instructions on how to change your password.</Text>
                    </View>

                    <View style={[AppStyles.flex1, AppStyles.paddingHorizontal, {justifyContent: 'flex-start'}]}>


                        <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
                            <View style={[AppStyles.flex1, {flexDirection: 'row', alignItems: 'center'}]}>
                                <View style={[AppStyles.flex1]}>
                                    <Icon name="email-outline" size={28}  color="rgba(255,255,255,0.2)" style={styles.iconLeft} />
                                </View>
                                <View style={AppStyles.flex8}>
                                    <InputField 
                                        label="Email Id"
                                        value={email}
                                        maxLength={100}
                                        onChangeText={email => this.setState({email})}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={{top: 10}}>
                            <Button
                                title='Send'
                                type="primary"
                            />
                        </View>

                    </View>
                </BackgroundImage>
            </View>    
        );
    }
}

const styles= StyleSheet.create({
    iconLeft:{
        top: 14,
        backgroundColor: 'transparent'
    }
});


export default forgotPassword;