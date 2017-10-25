import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  View,
  AsyncStorage,
  StyleSheet,
  Alert,
  TouchableHighlight,
  Image,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import Validation from '../utils/Validation.js'
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';


// App Globals
import AppConfig, {navigatorStyle} from './../config'
import AppStyles from './../styles'


import Button from './../components/Button'
import BackgroundImage from './../components/BackgroundImage'
import InputField from './../components/InputField'

import * as cartActions from '../actions/cartActions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class createService extends Component {

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    state = {
        date: null,
        minDate: null,
        name: '',
        desc: '',
        instagram: false,
        twitter: false,
        youtube: false,
        submitted: false
    }

    onNavigatorEvent(event) {

        if(event.id == 'willAppear')
            this.setState({submitted: false});
    }


    componentWillMount(){
        let date= this.todaysDate();
        this.setState({minDate: date});

        let {service}= this.props.cart;

        if(service)
            this.initializeService(service);
    }

    componentWillUnmount(){
        console.log('component will unmount');

        this.setState({submitted: false});
    }


    initializeService= (service) => {

        this.setState({date: service.serviceDate, name: service.serviceName, desc: service.description});
        this.initializePlatforms(service.platform);
    }

    initializePlatforms= (platforms) => {
        let that= this;
        platforms= platforms.split(',');
        platforms.forEach(function(platform, index) {
            that.setState({[platform]: true})
        });
    }

    validationRules= () => {
        return [
            {
                field: this.state.date,
                name: 'Date',
                rules: 'required'
            },
            {
                field: this.state.name,
                name: 'Service name',
                rules: 'required|min:2|max:50'
            },
            {
                field: this.state.desc,
                name: 'Description',
                rules: 'max:1000'
            }
        ]
    }

    getSocialNetworks = () => {
        let {instagram, youtube, twitter}= this.state;

        if(!instagram && !youtube && !twitter)
            return false;

        let networks= [];

        if(instagram)
            networks.push('instagram');

        if(twitter)
            networks.push('twitter');

        if(youtube)
            networks.push('youtube');

        return networks.join(',');
    }

    submit= () => {

        if(this.state.submitted)
            return;

        this.setState({submitted: true});
        
        let validaton= Validation.validate(this.validationRules());

        console.log(validaton, 'validation rules');

        if(validaton.length != 0){
            Alert.alert('', validaton[0]);
            this.setState({submitted: false});
            return;
        }

        let platform= this.getSocialNetworks();

        if(!platform){
            Alert.alert('', 'Please pick atleast one platform.');
            this.setState({submitted: false});
            return;
        }

        let {date, name, desc}= this.state;
        let {actions} = this.props;

        
        let data = {serviceDate: date, serviceName: name, description: desc, platform };

        console.log(data, 'signup data');

        Keyboard.dismiss();
        actions.createServiceRequest(data);

        this.props.navigator.push({
            screen: 'cart',
            title: 'Cart',
            navigatorStyle,
            animated: true,
            animationType: 'slide-horizontal'
        });
    }

    selectImage= () => {

        if(this.props.cart.uploadingImage)
            return;

        ImagePicker.openPicker({
            includeBase64: true,
            compressImageQuality: 0.6
        }).then(image => {
            this.props.actions.addServiceImage(image);
        });
    }

    toggleSocial= (network) => {
        let state= this.state;

        this.setState({[network]: !state[network]});
    }


    todaysDate = () => {

        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1; //January is 0!
        let yyyy = today.getFullYear();

        if(dd<10)
            dd = '0'+dd

        if(mm<10)
            mm = '0'+mm

        return yyyy + '-' + mm + '-' + dd;
    }


    render() {

        let {name, desc, instagram, youtube, twitter, submitted} = this.state;

        let {cart} = this.props;

        let selectedImage=null, selectImage= null;

        if(cart.image)
            selectedImage=<TouchableHighlight onPress={this.selectImage} style={styles.showImageCon}><Image  style={styles.showImage} source={{uri : cart.image.thumbnail}} /></TouchableHighlight>;
        else
            selectImage=<Icon onPress={this.selectImage} name="camera" size={35}  color="white" style={styles.selectImageIcon} />;

        return (

            <BackgroundImage blur>

                <ScrollView style={[AppStyles.flex1, AppStyles.paddingHorizontal]}>

                    <KeyboardAvoidingView style={AppStyles.flex1} behavior="padding">

                        <View style={styles.selectImageCon}>
                            {selectedImage}
                            {selectImage}
                            <Text style={styles.selectImageText}>{ cart.uploadingImage ? 'Uploading Image...' : 'Select '+ (cart.image ? 'new ' : ' ') +'image' }</Text>
                        </View>

                        <View>
                            <Text style={styles.placeholderText}>Posting Date</Text>
                            <DatePicker
                                style={styles.datePicker}
                                date={this.state.date}
                                mode="date"
                                format="YYYY-MM-DD"
                                placeholder="Select Date"
                                minDate={this.state.minDate}
                                maxDate="2050-03-02"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                iconSource={require('../../images/dropdown/ic_dropdown.png')}
                                onDateChange={(date) => {this.setState({date: date})}}
                                customStyles={{
                                    dateInput: {
                                        borderWidth: 0,
                                    },
                                    dateTouchBody:{
                                        borderBottomColor: 'rgba(255,255,255,0.1)',
                                        borderBottomWidth: 1,
                                    },
                                    dateText: {
                                        color: 'white',
                                        alignSelf: 'flex-start'
                                    },
                                    placeholderText: {
                                        color: 'white',
                                        alignSelf: 'flex-start'
                                    }
                                }}
                            />
                        </View>

                    <View style={styles.socialIconsCon}>

                        <Text style={styles.placeholderText}>Platforms</Text>
                        <View style={styles.socialIconsIn}>
                            <Icon onPress={() => this.toggleSocial('twitter')} name="twitter" size={25}  color="white" style={[styles.socialIcon, twitter && styles.socialIconWhite]} />
                            <Icon onPress={() => this.toggleSocial('instagram')} name="instagram" size={25}  color="white" style={[styles.socialIcon, instagram && styles.socialIconWhite]} />
                            <Icon onPress={() => this.toggleSocial('youtube')} name="youtube" size={22}  color="white" style={[styles.socialIcon, youtube && styles.socialIconWhite]} />
                        </View>
                    </View>

                    <View style={{marginTop: 10}}>
                        <InputField 
                            label="Service name"
                            maxLength={50}
                            value={name}
                            onChangeText={name => this.setState({name})}
                        />
                    </View>


                    <View style={{marginTop: 10}}>
                        <InputField 
                            label="Description"
                            maxLength={1000}
                            value={desc}
                            multiline={true}
                            height={100}
                            onChangeText={desc => this.setState({desc})}
                        />
                    </View>

                    <View style={{marginTop: 100, marginBottom: 35}}>
                        <Button
                            title='Go to Cart'
                            type="primary"
                            loading={submitted}
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
    datePicker: {
        flex:1,
        width: null,
    },
    placeholderText:{
        flex: 1,
        color: 'rgba(255,255,255,0.6)',
        backgroundColor: 'transparent',
        fontSize: 13
    },
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
    socialIconsCon: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        flexDirection: 'column',
        alignItems: 'flex-start',

    },
    socialIconsIn: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10
    },
    socialIcon: {
        color: 'rgba(255,255,255,0.3)',
        backgroundColor: 'transparent',
        marginRight: 10,
        overflow: 'hidden'
    },
    socialIconWhite:{
        color: 'white'
    }

});

function mapStateToProps(state, ownProps) {
    return {
        cart: state.cart
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(cartActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(createService);

