import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  View,
  AsyncStorage,
  StyleSheet,
  Alert,
  TouchableOpacity
} from 'react-native';
import RNRestart from 'react-native-restart';
import Icon from 'react-native-vector-icons/FontAwesome';


// App Globals
import AppConfig, {navigatorStyle} from './../config'
import AppStyles from './../styles'

import BackgroundImage from './../components/BackgroundImage'

const pages= [
    {title: 'Change Password', name: 'change-password'},
    {title: 'Contact Us', name: 'contact-us'},
    {title: 'Announcements', name: 'announcements'},
    {title: 'Payment Details', name: 'payment-details'},
    {title: 'Terms and conditions', name: 'terms-condtitions'},
    {title: 'Logout', name: 'logout', hideIcon: true},
]


class settings extends Component {

    _logout= () => {

        Alert.alert(
            '',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Yes', onPress: () => {
                    try{
                      AsyncStorage.removeItem('user', () => {
                        this.showGuestScreen();
                        });
                    }
                    catch(error){}
                } },
                {text: 'No', style: 'cancel'}
            ],
            { cancelable: false }
        );

    }

    showGuestScreen= () => {
        RNRestart.Restart();
    }

    showPaymentScreen= () => {
        this.props.navigator.push({
            screen: 'payment-details',
            title: 'Payment Details',
            navigatorStyle,
            animated: true,
            animationType: 'slide-horizontal'
        });
    }

    _handlePress= (name) => {

        switch (name) {
            case 'logout':
                return this._logout();
                break;
            case 'payment-details':
                return this.showPaymentScreen();  
                break;  
            default:
                break;
        }

    }

    renderButton= (item) => {
        
        let {title, name, hideIcon} = item;

        return (

            <TouchableOpacity key={name} onPress={() => this._handlePress(name)} style={[AppStyles.flex1, styles.settingsBtn]} activeOpacity={0.7}>
                <Text style={[AppStyles.p2]}>{title}</Text>
                <Icon name="angle-right" size={27}  color="#939ac1" style={hideIcon && AppStyles.hide} />
            </TouchableOpacity>

        )
    }

    render() {

        return (
            
            <BackgroundImage blur>

                <ScrollView>

                    {pages.map(item => this.renderButton(item))}

                </ScrollView>
            </BackgroundImage>
         
        );
    }
}

const styles= StyleSheet.create({
    settingsBtn: {
        backgroundColor: AppConfig.prominentColorLight,
        borderRadius: 4,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginHorizontal: 10,
        marginTop: 10
    }

});



export default settings;