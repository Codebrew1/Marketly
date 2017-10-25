import React, {Component} from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';

// App Globals
import AppConfig, {navigatorStyle} from './../config'
import AppStyles from './../styles'

import Button from './../components/Button'
import Logo from './../components/Logo'
import BackgroundImage from './../components/BackgroundImage'



class guest extends Component {

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    state={
        submitted: false
    }


    onNavigatorEvent(event) {

        if(event.id == 'willAppear')
            this.setState({submitted: false});
    }

    showLogin = (userType) => {

        if(!this.state.submitted){

            this.setState({submitted: true});

            this.props.navigator.push({
                screen: 'login',
                title: 'Login',
                navigatorStyle,
                animated: true,
                animationType: 'slide-horizontal',
                passProps: {userType}
            });
        }
    }

    render() {

        return (
            <View style={AppStyles.flex1}>
            
                <BackgroundImage>

                    <Logo containerStyle={[AppStyles.flex2, AppStyles.centerContainer]} />

                    <View style={[AppStyles.flex1, AppStyles.containerCentered, AppStyles.paddingHorizontal, {alignItems: 'stretch'}]} >

                        <View style={{marginBottom: 25}}>

                            <Button
                            title='Login as Infuencer'
                            type="primary"
                            onPress={() => this.showLogin('influencer')}
                            />
                        </View>

                        <View>
                        
                            <Button
                            title='Login as Business'
                            type="secondary"
                            onPress={() => this.showLogin('business')}
                            />
                        </View>
                    </View>                        
                </BackgroundImage>
            </View>
        );
    }
}



export default guest;