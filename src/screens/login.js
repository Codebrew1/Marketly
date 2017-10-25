import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  View,
  AsyncStorage,
  StyleSheet,
  Keyboard,
  Alert,
  KeyboardAvoidingView
} from 'react-native';

// App Globals
import AppConfig, {navigatorStyle} from '../config'
import AppStyles from '../styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNRestart from 'react-native-restart';

import Button from '../components/Button'
import Logo from '../components/Logo'
import BackgroundImage from '../components/BackgroundImage'
import InputField from '../components/InputField'
import Validation from '../utils/Validation.js'

import * as authActions from '../actions/AuthActions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class login extends Component {

    state = {
        email: '',
        password: '',
        image: null
    }

    validationRules= () => {
        return [
            {
                field: this.state.email,
                name: 'Email Id',
                rules: 'required|email|max:100'
            },
            {
                field: this.state.password,
                name: 'Password',
                rules: 'required|min:8|max:15'
            }
        ]
    }

    componentDidMount(){
        this.focusNext('email');
    }


    submit= () => {

        let validaton= Validation.validate(this.validationRules());

        console.log(validaton, 'validation rules');

        if(validaton.length != 0){
            Alert.alert('', validaton[0]);
            return;
        }

        let {email, password}= this.state;
        let {auth, actions, userType} = this.props;

        if(!auth.isFetching){

            Keyboard.dismiss();
            actions.loginUser(email, password, userType, this.loginUser);
        }
    }

    loginUser= () => {
        RNRestart.Restart();
    }

    showSignup= () => {

        let {userType} = this.props;

        this.props.navigator.push({
            screen: 'signup',
            title: 'Sign Up',
            navigatorStyle,
            animated: true,
            animationType: 'slide-horizontal',
            passProps: {userType}
        });
    }

    showForgotPassword= () => {

        let {userType} = this.props;

        this.props.navigator.push({
            screen: 'forgot-password',
            title: 'Forgot Password',
            navigatorStyle,
            animated: true,
            animationType: 'slide-horizontal',
            passProps: {userType}
        });
    }

    focusNext = (field) => {
        this.refs[field].refs.inputField.focus();
    }

    render() {

        let {email, password} = this.state;

        let {auth}= this.props;

        return (
            
            <BackgroundImage blur>

                <ScrollView style={AppStyles.flex1} keyboardShouldPersistTaps="always">

                    <KeyboardAvoidingView style={AppStyles.flex1} behavior="padding">

                        <Logo small containerStyle={[AppStyles.flex1, AppStyles.centerContainer, {height: AppConfig.windowHeight/3 } ]}/>

                        <View style={[AppStyles.flex1, AppStyles.paddingHorizontal]}>
                            
                            <Text style={[AppStyles.h4]}>Log in to your account</Text>

                            <View style={[AppStyles.flex1, {flexDirection: 'row', alignItems: 'center'}]}>
                                <View style={AppStyles.flex1}>
                                    <Icon name="email-outline" size={28}  color="rgba(255,255,255,0.4)" style={styles.iconLeft} />
                                </View>
                                <View style={AppStyles.flex8}>
                                    <InputField 
                                        label="Email Id"
                                        value={email}
                                        ref="email"
                                        keyboardType='email-address'
                                        onChangeText={email => this.setState({email})}
                                        focusNext={() => this.focusNext('password')}
                                        returnKeyType="next"
                                    />
                                </View>
                            </View>

                            <View style={[AppStyles.flex1, {flexDirection: 'row', alignItems: 'center'}]}>
                                <View style={AppStyles.flex1}>
                                    <Icon name="lock-outline" size={28}  color="rgba(255,255,255,0.4)" style={styles.iconLeft} />
                                </View>

                                <View style={AppStyles.flex8}>
                                    <InputField 
                                        label="Password"
                                        value={password}
                                        secureTextEntry={true}
                                        maxLength={15}
                                        ref="password"

                                        onChangeText={password => this.setState({password})}
                                        focusNext={() => this.submit()}
                                    />
                                </View>
                            </View>


                            <View style={{marginTop: 35}}>
                                <Button
                                    title='Login'
                                    type="primary"
                                    loading={auth.isFetching}
                                    onPress={this.submit}
                                />
                            </View>

                            <View style={[AppStyles.flex1, {alignItems: 'flex-start', flexDirection: 'row', marginTop: 10}]}>
                                <Text onPress={this.showForgotPassword} style={[AppStyles.flex1, AppStyles.p2]}>Forgot Password?</Text>
                                <Text onPress={this.showSignup} style={[AppStyles.flex1, AppStyles.p2, {textAlign: 'right', color: '#28a9b0'}]}>Create an account</Text>
                            </View>
                        </View>

                    </KeyboardAvoidingView> 
                </ScrollView>
            </BackgroundImage>
        );
    }
}

const styles= StyleSheet.create({
    iconLeft:{
        top: 14,
        backgroundColor: 'transparent'
    }
});

function mapStateToProps(state, ownProps) {
    return {
        auth: state.auth
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(login);