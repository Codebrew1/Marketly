import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  View,
  AsyncStorage,
  TouchableHighlight,
  StyleSheet,
  Keyboard,
  Alert,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import CropImage from 'react-native-image-crop-picker';
import RNRestart from 'react-native-restart';
import Validation from '../utils/Validation.js'
import Spinner from 'react-native-loading-spinner-overlay';


// App Globals
import AppConfig, {navigatorStyle} from '../config'
import AppStyles from '../styles'

import Button from './Button'
import BackgroundImage from './BackgroundImage'
import InputField from './InputField'

var imageOptions = {
    title: 'Select Image',
    maxWidth: 1000,
    maxHeight: 1000,
    allowsEditing: true,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};


class BusinessSignup extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password:'',
        image: null
    }

    validationRules= () => {
        return [
            {
                field: this.state.firstName,
                name: 'First name',
                rules: 'required|alpha|min:2|max:50'
            },
            {
                field: this.state.lastName,
                name: 'Last name',
                rules: 'alpha'
            },
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

    submit= () => {
        
        let validaton= Validation.validate(this.validationRules());

        console.log(validaton, 'validation rules');

        if(validaton.length != 0){
            Alert.alert('', validaton[0]);
            return;
        }

        let {firstName, lastName, email, password, image}= this.state;
        let {signup, actions, userType} = this.props;

        if(!signup.isFetching){
            let data = { firstName, lastName, email, password};

            // if(image)
            //     data= {...data, profilePicURLOriginal: image};

            console.log(data, 'signup data');

            Keyboard.dismiss();
            actions.signupUser(data, userType, this.signupUser);
        }
    }

    signupUser= () => {
        RNRestart.Restart();
    }

    selectImage= () => {

        ImagePicker.showImagePicker(imageOptions, (response) => {

            if (!response.error && !response.didCancel) {
                let image = { data: response.data };
                this.setState({image});
            }    
            else
                console.log('ImagePicker Error: ', response.error);
        });
    }

    renderImage= () => {
        let {image}= this.state;

        if(image)
            return <TouchableHighlight onPress={this.selectImage} style={styles.showImageCon}><Image  style={styles.showImage} source={{uri: 'data:image/jpeg;base64,' + image.data}} /></TouchableHighlight>;
        else
            return <Icon onPress={this.selectImage} name="camera" size={35}  color="white" style={styles.selectImageIcon} />;
    }


    render() {

        let {firstName, lastName, email, password, image}= this.state;

        let {signup}= this.props;

        return (

                <BackgroundImage blur>

                    <Spinner visible={signup.isFetching} cancelable={false} textContent={"Creating your account..."} textStyle={{color: '#FFF'}} />
                    
                    <ScrollView keyboardShouldPersistTaps="always"style={[AppStyles.flex1, AppStyles.paddingHorizontal]}>

                        <KeyboardAvoidingView style={AppStyles.flex1} behavior="padding">

                        <View style={styles.selectImageCon}>
                            {this.renderImage()}
                            <Text style={styles.selectImageText}>Select {(image) ? 'new ' : ''}image</Text>
                        </View>

                        <View style={[AppStyles.flex1, {flexDirection: 'row'}]}>

                            <View style={AppStyles.flex8}>
                                <InputField 
                                    label="First name"
                                    maxLength={50}
                                    value={firstName}
                                    onChangeText={firstName => this.setState({firstName})}
                                    returnKeyType="next"
                                />
                            </View>
                            <View style={AppStyles.flex1}></View>
                            <View style={AppStyles.flex8} >
                                <InputField 
                                    label="Last name"
                                    maxLength={50}
                                    value={lastName}
                                    onChangeText={lastName => this.setState({lastName})}
                                    returnKeyType="next"
                                />
                            </View>
                        </View>

                        <InputField 
                            label="Email Id"
                            value={email}
                            keyboardType='email-address'
                            onChangeText={email => this.setState({email})}
                            returnKeyType="next"
                        />

                        <InputField 
                            label="Password"
                            value={password}
                            secureTextEntry={true}
                            maxLength={14}
                            onChangeText={password => this.setState({password})}
                        />

                    
                        <View style={{marginVertical: 35}}>
                            <Button
                                title='Register'
                                type="primary"
                                loading={signup.isFetching}
                                onPress={this.submit}
                            />
                        </View>

                        </KeyboardAvoidingView>

                    </ScrollView>
                </BackgroundImage>
        );
    }
}

const styles= StyleSheet.create({
    showImageCon:{
        borderRadius: 50,
        marginBottom: 8
    },
    showImage:{
        alignSelf: 'center',
        height: 100,
        width:100,
        borderRadius: 50,
    },
    selectImageCon:{
        alignItems: 'center',
        paddingVertical: 25
    },
    selectImageIcon:{
        padding: 30,
        borderRadius: 50,
        overflow: 'hidden',
        marginBottom: 8,
        backgroundColor: AppConfig.primaryColorBTN
    },
    selectImageText:{
        color: 'rgba(255,255,255,0.5)',
        fontSize: 13,
        backgroundColor: 'transparent'
    }
});



export default BusinessSignup