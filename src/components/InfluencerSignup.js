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
  NativeModules,
  KeyboardAvoidingView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import CropImage from 'react-native-image-crop-picker';
import InstagramLogin from 'react-native-instagram-login';
import RNRestart from 'react-native-restart';
import Validation from '../utils/Validation.js'
import Spinner from 'react-native-loading-spinner-overlay';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

const { RNTwitterSignIn } = NativeModules;

const Constants = {
    //Dev Parse keys
    TWITTER_COMSUMER_KEY: '2Xc9r3AwGx51IKIAGZjJ7afW3',
    TWITTER_CONSUMER_SECRET: 'ud9nQvQLOa1H45R1UIWOrPIo4heZsFv0fy9htDGYTwfPbhQEnE',
};

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



class InfluencerSignup extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password:'',
        image: null,
        instagram: '',
        twitter: '',
        youtube: '',
        instagram_token: null,
        submitted: false
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

    componentDidMount() {
        this._setupGoogleSignin();
    }

    _twitterSignIn=() => {
        RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET);
        RNTwitterSignIn.logIn()
        .then((loginData)=> {
            console.log(loginData);
            const { authToken, authTokenSecret } = loginData;
            
            if (authToken && authTokenSecret) {
                this.setState({isLoggedIn: true});
            }
        }).catch((error)=>{
            console.log(error);
        });
    }

    async _setupGoogleSignin() {
        try {
            await GoogleSignin.hasPlayServices({ autoResolve: true });
            await GoogleSignin.configure({
                iosClientId: '602839193778-llj4ra19nvhs5rhb8vm72esdn9bsa9u4.apps.googleusercontent.com',
                offlineAccess: false
            });

            // GoogleSignin.revokeAccess();

            // const user = await GoogleSignin.currentUserAsync();
            // console.log(user);
            // this.setState({user});
        }
        catch(err) {
            console.log("Google signin error", err.code, err.message);
        }
    }

    submit= () => {

        let validaton= Validation.validate(this.validationRules());

        console.log(validaton, 'validation rules');

        if(validaton.length != 0){
            Alert.alert('', validaton[0]);
            return;
        }

        let {firstName, lastName, email, password, instagram, instagram_token, image}= this.state;
        let {signup, actions, userType} = this.props;

        if(!signup.isFetching){
            let data = { firstName, lastName, email, password};

            if(instagram_token && instagram)
                data= {...data, instagram, instagram_token};

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

    getInstagramData= async (token) => {
        const res= await fetch(`https://api.instagram.com/v1/users/self?access_token=${token}`);

        // only proceed once promise is resolved
        return data = await ((res.status == 200) ? res.json() : null);
    }

    gotInstagramToken=  async (token) => {
        const data= await this.getInstagramData(token);

        this.setState({'instagram': data.data.username, instagram_token: token});
    }

    _googleSignIn= () => {

        GoogleSignin.signIn()
        .then((user) => {
            console.log(user);
            this.setState({user: user});
        })
        .catch((err) => {
            console.log('WRONG SIGNIN', err);
        })
        .done();
    }

    renderImage= () => {

        let {image}= this.state;

        if(image)
            return <TouchableHighlight onPress={this.selectImage} style={styles.showImageCon}><Image  style={styles.showImage} source={{uri: 'data:image/jpeg;base64,' + image.data}} /></TouchableHighlight>;
        else
            return <Icon onPress={this.selectImage} name="camera" size={35}  color="white" style={styles.selectImageIcon} />;

    }


    render() {

        let {firstName, lastName, email, password, image, instagram, twitter, youtube}= this.state;
        let {signup}= this.props;


        return (
            
                <BackgroundImage blur>

                    <Spinner visible={signup.isFetching} cancelable={false} textContent={"Creating your account..."} textStyle={{color: '#FFF'}} />
                    
                    <ScrollView ref="scrollView" keyboardShouldPersistTaps="always" style={[AppStyles.flex1, AppStyles.paddingHorizontal]}>

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

                            <View style={[AppStyles.flex1, {flexDirection: 'row', alignItems: 'center'}]}>

                                <View style={AppStyles.flex8}>
                                    <Text style={[AppStyles.p, styles.socialUsername ]}>{instagram ? instagram : 'Connect with instagram'}</Text>
                                </View>
                                <View style={AppStyles.flex1}>
                                    <Icon onPress={()=> this.refs.instagramLogin.show()} name="instagram" size={25}  color="white" style={styles.socialIconStyle} />
                                </View>
                            </View>

                            <View style={[AppStyles.flex1, {flexDirection: 'row', alignItems: 'center'}]}>

                                <View style={AppStyles.flex8}>
                                    <InputField 
                                        label="Twitter username"
                                        value={twitter}
                                        onChangeText={twitter => this.setState({twitter})}
                                    />
                                </View>
                                <View style={AppStyles.flex1}>
                                    <Icon onPress={this._twitterSignIn} name="twitter" size={25}  color="white" style={styles.socialIconStyle} />
                                </View>
                            </View>


                            <View style={[AppStyles.flex1, {flexDirection: 'row', alignItems: 'center'}]}>

                                <View style={AppStyles.flex8}>
                                    <InputField 
                                        label="Youtube channel name"
                                        value={youtube}
                                        onChangeText={youtube => this.setState({youtube})}
                                    />
                                </View>
                                <View style={AppStyles.flex1}>
                                    <Icon onPress={this._googleSignIn} name="youtube" size={25}  color="white" style={styles.socialIconStyle} />
                                </View>
                            </View>

                            <View style={{marginVertical: 35}}>

                                <Button
                                    title='Register'
                                    type="primary"
                                    loading={signup.isFetching}
                                    onPress={this.submit}
                                />

                                <InstagramLogin
                                    ref='instagramLogin'
                                    clientId={AppConfig.InstagramClientId}
                                    scopes={['public_content', 'follower_list']}
                                    onLoginSuccess={(token) => this.gotInstagramToken(token)}
                                    redirectUrl='http://marketly.com'
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
    },
    socialUsername: {
        marginBottom: 0,
        top: 15,
        paddingVertical: 12,
        backgroundColor: 'transparent'

    },
    socialIconStyle: {
        backgroundColor: 'transparent',
        top: 15,
        left: 8
    }
});



export default InfluencerSignup