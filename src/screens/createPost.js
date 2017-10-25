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
import ImagePicker from 'react-native-image-crop-picker';
import { CreditCardInput } from "react-native-credit-card-input";

import Validation from '../utils/Validation.js'

// App Globals
import AppConfig, {navigatorStyle} from './../config'
import AppStyles from './../styles'

import Button from './../components/Button'
import BackgroundImage from './../components/BackgroundImage'
import InputField from './../components/InputField'
import MultiSelect from './../components/MultiSelect';



class createPost extends Component {

    state = {
        name: '',
        services: [],
        clients: [],
        price: '0',
        paymentMethod: 'paypal',
        paypalEmail: '',
        creditCardData: null,
        image: null,
        instagram: false,
        twitter: false,
        youtube: false,
        submitted: false,
        allServices: [{'name': 'one', id: 'okok'}, {'name': 'two', id: 'yess'}],
        services: [],
        allClients: [{'name': 'one', id: 'okok'}, {'name': 'two', id: 'yess'}],
        clients: []
    }

    selectImage= () => {
        ImagePicker.openPicker({
            width: 600,
            height: 600,
            cropping: true,
            includeBase64: true
        }).then(image => {
            this.setState({image});
        });
    }

    toggleSocial= (network) => {
        let state= this.state;

        this.setState({[network]: !state[network]});
    }

    selectPaymentOption= (paymentMethod) => {
        this.setState({paymentMethod});
    }

    renderPaymentMethod= () => {

        let {paymentMethod, paypalEmail}= this.state;

        if(paymentMethod=='paypal')
            return (
                <InputField 
                    label="Paypal Email Id"
                    value={paypalEmail}
                    keyboardType='email-address'
                    onChangeText={paypalEmail => this.setState({paypalEmail})}
                />
            )
        else
            return (
                <View style={{paddingTop: 10}}>
                        <CreditCardInput 
                            onChange={this._onChange}
                            requiresName
                            labelStyle={{backgroundColor: 'transparent', color: 'white', fontSize: 12}}
                            inputStyle={{ color: 'white' }} 
                            inputContainerStyle={{borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.4)'}}
                            allowScroll={true} 
                        />
                </View>
            )

    }

    renderImage= () => {

        let {image}= this.state;

        if(image)
            return <TouchableHighlight onPress={this.selectImage} style={styles.showImageCon}><Image  style={styles.showImage} source={{uri: 'data:image/jpeg;base64,' + image.data}} /></TouchableHighlight>;
        else
            return <Icon onPress={this.selectImage} name="camera" size={35}  color="white" style={styles.selectImageIcon} />;
    }



    render() {

        let {name, image, price, paymentMethod, paypalEmail, instagram, twitter, youtube, submitted, allServices, services, allClients, clients}= this.state;


        return (

            <KeyboardAvoidingView style={AppStyles.flex1} behavior="padding">
            
                <BackgroundImage blur>
                    
                    <ScrollView ref="scrollView" style={[AppStyles.flex1, AppStyles.paddingHorizontal]}>
                    
                        <View style={styles.selectImageCon}>
                            {this.renderImage()}
                            <Text style={styles.selectImageText}>Select {(image) ? 'new ' : ''}image</Text>
                        </View>

                        <InputField 
                            label="Enter your name"
                            value={name}
                            onChangeText={name => this.setState({name})}
                        />

                        <View style={[AppStyles.flex1, {flexDirection: 'row', alignItems: 'flex-end'}]}>

                            <View style={AppStyles.flex4}>
                                <InputField 
                                    label="Price"
                                    maxLength={50}
                                    value={price}
                                    onChangeText={price => this.setState({price})}
                                />
                            </View>
                            <View style={AppStyles.flex8}>

                                <View style={styles.socialIconsCon}>
                                    <Text style={styles.placeholderText}>Platforms</Text>
                                    <View style={styles.socialIconsIn}>
                                        <Icon onPress={() => this.toggleSocial('twitter')} name="twitter" size={25}  color="white" style={[styles.socialIcon, twitter && styles.socialIconWhite]} />
                                        <Icon onPress={() => this.toggleSocial('instagram')} name="instagram" size={25}  color="white" style={[styles.socialIcon, instagram && styles.socialIconWhite]} />
                                        <Icon onPress={() => this.toggleSocial('youtube')} name="youtube" size={22}  color="white" style={[styles.socialIcon, youtube && styles.socialIconWhite]} />
                                    </View>
                                    
                                </View>
                               
                            </View>
                        </View>

                        <View style={{marginTop: 40, backgroundColor: 'transparent'}}>

                            <MultiSelect
                                items={allServices}
                                uniqueKey="id"
                                onSelectedItemsChange={services => this.setState({services})}
                                selectedItems={services}
                                selectText="Preferred Services"
                                searchInputPlaceholderText="Search Services..."
                                tagRemoveIconColor='white'
                                tagBorderColor="white"
                                tagTextColor="white"
                                selectedItemTextColor="#CCC"
                                selectedItemIconColor="#CCC"
                                itemTextColor="#000"
                                searchInputStyle={{ color: '#474e73' }}
                                submitButtonColor={AppConfig.secondaryColor}
                                submitButtonText="Submit"

                            />
                        </View>

                        <View style={styles.paymentCon}>
                            <Text style={AppStyles.p}>Payment method</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Text onPress={() => this.selectPaymentOption('paypal')} style={[AppStyles.h3, styles.paymentText, paymentMethod == 'paypal' && styles.paymentSelected]}>Paypal</Text>
                                <Text onPress={() => this.selectPaymentOption('credit-card')} style={[AppStyles.h3, styles.paymentText, paymentMethod != 'paypal' && styles.paymentSelected]}>Credit Card</Text>
                            </View>

                            {this.renderPaymentMethod()}

                        </View>

                        <View style={{marginTop: 40, backgroundColor: 'transparent'}}>

                            <MultiSelect
                                items={allClients}
                                uniqueKey="id"
                                onSelectedItemsChange={clients => this.setState({clients})}
                                selectedItems={clients}
                                selectText="Clients Worked with"
                                searchInputPlaceholderText="Search Clients..."
                                tagRemoveIconColor='white'
                                tagBorderColor="white"
                                tagTextColor="white"
                                selectedItemTextColor="#CCC"
                                selectedItemIconColor="#CCC"
                                itemTextColor="#000"
                                searchInputStyle={{ color: '#474e73' }}
                                submitButtonColor={AppConfig.secondaryColor}
                                submitButtonText="Submit"
                            />
                        </View>

                        <View style={{marginVertical: 35}}>
                            <Button
                                title='Save'
                                type="primary"
                                loading={submitted}
                                onPress={this.submit}
                            />
                        </View>

                    </ScrollView>
                </BackgroundImage>
            </KeyboardAvoidingView>
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
        paddingVertical: 10
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
        alignItems: 'flex-end',

    },
    socialIconsIn: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
    },
    socialIcon: {
        color: 'rgba(255,255,255,0.3)',
        backgroundColor: 'transparent',
        marginLeft: 15,
        overflow: 'hidden'
    },
    socialIconWhite:{
        color: 'white'
    },
    placeholderText:{
        flex: 1,
        color: 'rgba(255,255,255,0.6)',
        backgroundColor: 'transparent',
        fontSize: 13,
        lineHeight: 15
    },
    paymentCon: {
        paddingTop: 10
    },
    paymentText:{
        fontStyle: 'italic',
        paddingRight: 10,
        color: 'rgba(255,255,255,0.3)',
        fontWeight: '600'
    },
    paymentSelected:{
        color: 'white'
    },


});



export default createPost