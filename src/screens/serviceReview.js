import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  View,
  AsyncStorage,
  StyleSheet,
  Alert,
  Platform,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import { Icon } from 'react-native-elements'
import StarRating from 'react-native-star-rating';
import axios from 'axios';

import * as myServicesActions from '../actions/myServicesActions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


// App Globals
import AppConfig, {navigatorStyle} from './../config'
import AppStyles from './../styles'

import BackgroundImage from './../components/BackgroundImage'
import Button from '../components/Button'
import InputField from '../components/InputField'



class serviceReview extends Component {

    state= {
        comment: '',
        rating: 0,
        submitted: false
    }

    closeModal= () => {

        this.props.navigator.dismissModal({
            animationType: 'slide-down'
        });
    }

    submit = () => {

        let {rating, comment, submitted}= this.state;
        
        if(rating === 0)
            return Alert.alert('','Rating is required!');

        if(submitted)
            return;

        this.submitToServer();
    }

    submitToServer= () => {

        this.setState({submitted: true});

        let {comment, rating}= this.state;

        let data= {postId: this.props.id, comment, rating}

        axios.post(`${AppConfig.baseAPIUrl}Business/users/createReview`, data)
        .then(response => {

            console.log('adding review', response);

            if(response.status === 200){
                this.props.actions.getServices('business', false);
                this.closeModal();
                Alert.alert('', 'Review added successfully!');
            }
            else
                Alert.alert('', 'Something went wrong, please retry!');
        })
        .catch(error => Alert.alert('', 'Something went wrong, please retry!') );

    }


    render() {

        let {comment, rating, submitted}= this.state;
        let {id, image, price}= this.props;

        return (

            <BackgroundImage blur>

                <ScrollView style={AppStyles.flex1} >

                    <KeyboardAvoidingView style={AppStyles.flex1} behavior="padding">

                        <View style={[styles.navbarCon]}>

                            <Text style={[AppStyles.h3, styles.title]}>Review</Text>

                        </View>

                        <View style={[styles.closeCon]}>
                                <Icon
                                    name='arrow-downward'
                                    type='material'
                                    size={30}
                                    color='white'
                                    underlayColor='transparent'
                                    onPress={this.closeModal}
                               />
                        </View> 

                        
                        <View style={styles.mainCon} behavior="padding">

                            <Image style={[styles.userImage ]} source={require('./../../images/default-avatar.png')} />

                            <View>
                                <Text style={[AppStyles.h4, styles.receipt]}>Your Receipt</Text>
                                <Text style={[AppStyles.h1, styles.dollar]}>${price.toFixed(2)}</Text>
                            </View>

                            <View>
                                <Text style={[AppStyles.p2, styles.p]}>How was your overall experience with Influencer?</Text>
                                <View style={{paddingTop: 20, paddingHorizontal: 40}}>    
                                    <StarRating
                                        disabled={false}
                                        maxStars={5}
                                        starSize={25}
                                        starColor="#ffc629"
                                        rating={rating}
                                        selectedStar={(rating) => this.setState({rating})}
                                        emptyStarColor='rgba(255,255,255,0.2)'
                                      />
                                </View>
                            </View>
                            
                            
                            <View style={{alignSelf: 'stretch', paddingHorizontal: 15}}>
                                <InputField 
                                    label="Write a review"
                                    value={comment}
                                    onChangeText={comment => this.setState({comment})}
                                />
                                <View style={{marginVertical: 20}}>
                                    <Button
                                        title='submit'
                                        type="secondary"
                                        loading={submitted}
                                        onPress={this.submit}
                                    />
                                </View>
                            </View>
                            
                        </View>

                    </KeyboardAvoidingView>
                </ScrollView>
            </BackgroundImage>
        );
    }
}

const styles= StyleSheet.create({
    navbarCon: {
        position: 'absolute',
        top: 5,
        left: 40,
        width: AppConfig.windowWidth - 80,
        paddingTop: Platform.OS == 'ios' ? 20 : 0
    },
    title: {
        fontWeight: Platform.OS == 'ios' ? '500' : '300',
        fontSize: Platform.OS == 'ios' ? 18 : 21,
        alignSelf: 'center',
    },
    closeCon: {
        position: 'absolute',
        top: Platform.OS == 'ios' ? 25 : 5,
        left: 10
    },
    mainCon: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Platform.OS == 'ios' ? 120 : 50,
        margin: 10,
        backgroundColor: AppConfig.prominentColorLight,
        borderRadius: 5,
        overflow: 'visible',
        height: AppConfig.windowHeight - (Platform.OS == 'ios' ? 160 : 90)
    },
    userImage: {
        height: 70,
        width: 70,
        borderWidth: 4,
        borderColor: 'rgba(67,70,90,0.2)',
        borderRadius: 35,
        top: Platform.OS == 'ios' ? -35 : 5,

    },
    dollar: {
        textAlign: 'center',
        fontSize: 40,
        lineHeight: 50
    },
    p: {
        textAlign: 'center',
        paddingHorizontal: 25,
        fontSize: 16,
        color: '#939ac1'
    },
    receipt: {
        fontSize: 14,
        color: '#939ac1',
        textAlign: 'center'
    }
});




function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(myServicesActions, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(serviceReview);

