import React from 'react';
import {
    AsyncStorage,
    Platform
} from 'react-native';

import { Icon } from 'react-native-elements'
import RNRestart from 'react-native-restart';

import { Provider } from 'react-redux';
import { registerScreens } from './screens';
import {Navigation} from 'react-native-navigation';
import axios from 'axios';

// App Globals
import AppConfig, {navigatorStyle} from './config'

import configureStore from './configureStore';

const store = configureStore();

registerScreens(store, Provider);


try{
    AsyncStorage.getItem('user')
    .then( (user) => {
        if (user == null){
            Navigation.startSingleScreenApp({
                screen: {
                  screen: 'guest',
                  navigatorStyle:{
                    ...navigatorStyle,
                    navBarHidden: true
                  },
                }
            })
        }
        else{

            user= JSON.parse(user);

            // set auth header using axios default
            axios.defaults.headers.common['Authorization'] = `bearer ${user.accessToken}`;

            axios.interceptors.response.use(function (response) {
                // Do something with response data
                return response;
              }, function (error) {


                if(error.response.status == 401){

                    console.log('should logout');

                    try{
                        AsyncStorage.removeItem('user', () => {
                            RNRestart.Restart();
                        });
                    }
                    catch(error){}

                }
                else
                    return Promise.reject(error);
            });
            
            Navigation.startTabBasedApp({
              tabs: [
                {
                    screen: 'home',
                    icon: (Platform.OS == 'ios') ? require('../images/tab/ic_home.png') : require('../images/tab/ic_home_fill.png'),
                    selectedIcon: require('../images/tab/ic_home_fill.png'),
                    title: 'My Services',
                    navigatorStyle
                },
                { 
                    screen: 'notifications',
                    icon: (Platform.OS == 'ios') ? require('../images/tab/ic_notification.png') : require('../images/tab/ic_notification_fill.png'),
                    selectedIcon: require('../images/tab/ic_notification_fill.png'),
                    title: 'Notifications',
                    navigatorStyle,
                },
                { 
                    screen: user.userType == 'business' ? 'influencer-list' : 'create-post',
                    icon: require('../images/logo/logo_s.png'),
                    selectedIcon: require('../images/logo/logo_s.png'),
                    title: user.userType == 'business' ? 'Influencer List' : 'Create Post' ,
                    navigatorStyle: user.userType == 'business' ? {...navigatorStyle,navBarCustomView: 'navbar'} : {...navigatorStyle},
                },
                {
                    screen: 'user-profile',
                    icon: (Platform.OS == 'ios') ? require('../images/tab/ic_profile.png') : require('../images/tab/ic_profile_fill.png'),
                    selectedIcon: require('../images/tab/ic_profile_fill.png'),
                    title: 'Profile',
                    navigatorStyle: {... navigatorStyle, navBarHidden: true}
                },
                { 
                    screen: 'settings',
                    icon: (Platform.OS == 'ios') ? require('../images/tab/ic_settings.png') : require('../images/tab/ic_settings_fill.png'),
                    selectedIcon: require('../images/tab/ic_settings_fill.png'),
                    title: 'Settings',
                    navigatorStyle
                }
                
              ],
              tabsStyle: { // optional, add this if you want to style the tab bar beyond the defaults
                tabBarButtonColor: 'rgba(255,255,255,0.9)', // optional, change the color of the tab icons and text (also unselected)
                tabBarSelectedButtonColor: 'rgba(255,255,255,0.9)', // optional, change the color of the selected tab icon and text (only selected)
                tabBarBackgroundColor: AppConfig.prominentColorLight,
                tabBarTranslucent: false,
                paddingTop: 10
              },
              appStyle: {
                tabBarBackgroundColor: AppConfig.prominentColorLight,
                tabBarButtonColor: 'rgba(255,255,255,0.4)',
                tabBarSelectedButtonColor: '#ffffff',
                tabBarTranslucent: false,
                orientation: 'portrait', // Sets a specific orientation to the entire app. Default: 'auto'. Supported values: 'auto', 'landscape', 'portraitxw
              },
              passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
              animationType: 'fade' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
            });
        }
        
    });
}
catch(error){}
