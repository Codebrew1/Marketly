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
  TouchableOpacity,
  ActivityIndicator,
  InteractionManager
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Icon as ElementsIcon } from 'react-native-elements'
import StarRating from 'react-native-star-rating';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios'


// App Globals
import AppConfig, {navigatorStyle} from './../config'
import AppStyles from './../styles'

import BackgroundImage from './../components/BackgroundImage'
import Button from '../components/Button'
import InputField from '../components/InputField'



class serviceDetails extends Component {

    state= {
        comment: '',
        rating: 0,
        loading: false,
        service: null
    }

    defaultImage= null;

    componentWillMount(){
        this.defaultImage= <Image style={[styles.influImage]} source={require('./../../images/default-avatar.png')} />;

        InteractionManager.runAfterInteractions(() => {
            this.getData()
        });
    }

    closeModal= () => {
        this.props.navigator.dismissModal({
            animationType: 'slide-down'
        });
    }


    getData= () => {

        let {serviceId, postId, userType}= this.props;

        let type= userType == 'influencer' ? 'Influencer' : 'Business';

        return axios.post(`${AppConfig.baseAPIUrl}${type}/users/serviceDetails`, {serviceId, postId})
        .then(response => {

            if(response.status === 200){
                this.setState({loading: false, service: response.data.data[0]});
            }
            else
                this.setState({loading: false});
        })
        .catch(error => this.setState({loading: false}) );
    }

    renderPlatform= (platform) => {

        platform= platform.toLowerCase();

        return <Icon key={platform} name={platform} size={15}  color="white" style={[styles.socialIcon, styles[`${platform}Icon`] ]} />

    }

    renderImage= (url) => {

        if(url)
            return <Image style={[styles.influImage]} source={{uri: url}} defaultSource={require('./../../images/default-avatar.png')} />;
        else
            return this.defaultImage;
    }

    renderServiceImage= () => {

        let {loading, service}= this.state;

        if(!loading && service && service.serviceId.serviceImage.original)
            return <Image resizeMode="cover" style={[styles.serviceImage ]} source={{uri: service.serviceId.serviceImage.original}} defaultSource={require('./../../images/default-avatar.png')} />
        else
            return <Image resizeMode="cover" style={[styles.serviceImage ]} source={require('./../../images/default-avatar.png')} defaultSource={require('./../../images/default-avatar.png')} />;
    }

    renderLoading= () => {

        let {id, name}= this.props;

        return (
            <View style={[AppStyles.flex1, styles.detailsConLite]}>

               <View style={[AppStyles.flex1, {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}]}>

                    <View style={{alignItems: 'flex-start', justifyContent: 'center'}}>
                        <Text style={[AppStyles.h3, styles.bigTitle]}>{name}</Text>
                        <Text style={[AppStyles.p2, styles.smallTitle]}></Text>
                    </View>
                    <View style={{alignItems: 'flex-end', justifyContent: 'center'}}></View>

                </View>

                <View style={styles.loadingCon}>
                    <ActivityIndicator size='large' />
                    <Text style={[AppStyles.p2, {textAlign: 'center'}]}>Loading...</Text>
                </View>
            </View>
        )
    }

    renderData= () => {

        let {service}= this.state;
        let {name, userType}= this.props;

        let {rating, review}= (userType== 'influencer') ? service.businessUserId : service.influencerId;

        let {firstName, lastName} = (userType== 'influencer') ? service.businessUserId : service.postId;

        let profileImage = (userType== 'influencer') ? service.businessUserId.profilePicURL : service.postId.profileImage;

        console.log(service, 'service');

        return (
            <View>
                <View style={[AppStyles.flex1, styles.detailsCon]}>

                   <View style={[AppStyles.flex1, {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}]}>

                        <View style={{alignItems: 'flex-start', justifyContent: 'center'}}>
                            <Text style={[AppStyles.h3, styles.bigTitle]}>{name}</Text>
                            <Text style={[AppStyles.p2, styles.smallTitle]}>May 24</Text>
                        </View>
                        <View style={{alignItems: 'flex-end', justifyContent: 'center'}}>
                            <Text style={[AppStyles.p2, styles.smallTitle]}>Price</Text>
                            <Text style={[AppStyles.h3, styles.bigTitle]}>${service.postId.price.toFixed(2)}</Text>
                        </View>
                    </View>

                    <Text style={[AppStyles.p2, styles.desc]}>{service.serviceId.description}</Text>

                    <View style={styles.socialIconsCon}>
                        {service.serviceId.platformType.map(platform => this.renderPlatform(platform))}
                    </View>
    
                </View>

                <View style={[AppStyles.flex1, styles.influencerCon]}>
                    <View style={{ flex: 3,alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                        <Text style={[AppStyles.p2, styles.influTitle]}> { (userType == 'influencer') ? 'BUSINESS' : 'INFLUENCER'}</Text>
                        <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
                            {this.renderImage(profileImage.thumbnail)}
                            <View style={{paddingLeft: 10, paddingRight: 50}}>
                                <Text numberOfLines={1}  style={[AppStyles.p2, styles.influName]}>{firstName} {lastName}</Text>
                                {/*<Text style={[AppStyles.p2, styles.influeSec]}>Dior Watch</Text>*/}
                            </View>
                        </View>
                    </View>

                    <View style={{flex: 2, alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                        <Text style={[AppStyles.p2, styles.influTitle]}>RATING</Text>
                        <View style={styles.ratingStyle}>
                            <StarRating
                                disabled={true}
                                maxStars={5}
                                rating={rating}
                                starSize={15}
                                starColor="#ffc629"
                                emptyStarColor='rgba(255,255,255,0.2)'
                              />
                        </View>
                        <Text style={[AppStyles.h3, styles.influeSec]}>{review} Reviews ({rating})</Text>
                    </View>
                </View>

                <View style={[AppStyles.flex1, styles.paymentCon]}>
                    <Text style={[AppStyles.p2, styles.influTitle]}>PAYMENT</Text>
                    <TouchableOpacity style={[styles.paymentBtn, !service.postId.paymentStatus && styles.paymentBtnPending]} disabled><Text style={styles.paymentBtnTxt}>{service.postId.paymentStatus ? 'Success' : 'Pending'}</Text></TouchableOpacity>
                </View>

            </View>
        )
    }



    render() {

        let {loading, service}= this.state;

        let mainCon= null;

        if(!loading && service)
            mainCon= this.renderData();
        else
            mainCon= this.renderLoading();

        return (

            <BackgroundImage blur>
                <ScrollView>

                {this.renderServiceImage()}
                
                <LinearGradient colors={['rgba(0,0,0,0.5)', 'transparent']} style={styles.navCon}>
                    <View style={styles.navBtn}>
                        <ElementsIcon
                            name='arrow-downward'
                            type='material'
                            size={30}
                            color='white'
                            underlayColor='transparent'
                            onPress={this.closeModal}
                        />
                    </View>
                </LinearGradient>


                {mainCon}
                    

                </ScrollView>
                
            </BackgroundImage>

            
        );
    }
}

const styles= StyleSheet.create({
    serviceImage: {
        flex: 1,
        height: (AppConfig.windowHeight/3.5),
    },
    navCon:{
        position: 'absolute',
        height: Platform.OS == 'ios' ? 60 : 50,
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: AppConfig.windowWidth
    },
    navBtn: {
        paddingLeft: 15,
        top: Platform.OS == 'ios' ? 20 : 7,
    },
    detailsConLite: {
        paddingVertical: 15,
        marginHorizontal: 15,
        paddingTop: 20,
    },
    detailsCon: {
        paddingVertical: 15,
        marginHorizontal: 15,
        paddingTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)'
    },
    bigTitle:{
        margin: 0,
        fontSize: 19,
        lineHeight: 21
    },
    smallTitle:{
        fontSize: 12,
        lineHeight: 12,
        color: '#cbd3ff'
    },
    desc: {
        color: '#cbd3ff',
        fontSize: 12,
        lineHeight: 17,
        paddingTop: 30,
        paddingBottom: 10

    },
    socialIconsCon: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',

  },
    socialIcon: {
    backgroundColor: 'red',
    marginLeft: 8,
    paddingVertical: 5,
    paddingHorizontal: 6,
    borderRadius: 13,
    overflow: 'hidden'
  },
  twitterIcon: {
    backgroundColor: '#44b6f4'
  },
  instagramIcon:{
    backgroundColor: '#ae31db',
    paddingVertical: 6,
    paddingHorizontal: 7
  },
  youtubeIcon:{
    backgroundColor: 'rgba(255,0,0,0.6)'
  },
  influencerCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 15,
    marginHorizontal: 15

  },
  influTitle: {
    fontSize: 12,
    fontWeight: '500'
  },
  influImage: {
        height: 40,
        width: 40,
        borderRadius: 20
  },
  influName: {
    fontSize: 14
  },
  influeSec: {
    fontSize: 12,
    lineHeight: 12,
    paddingTop: 7,
    color: '#939ac1'
  },
  ratingStyle: {
        width: 100,
        marginTop: 12,
        backgroundColor: 'transparent'
  },
  paymentBtn: {
        backgroundColor: '#1a9c69',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 4,
  },
  paymentBtnPending: {
        backgroundColor: '#474e73'
  },
  paymentBtnTxt: {
    fontFamily: AppConfig.baseFont,
    color: 'white',
    fontSize: 11,
    fontWeight: '500'
  },
  paymentCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    marginHorizontal: 15,
    marginBottom: 50

  },
  loadingCon: {
    paddingVertical: 50
  }
});




export default serviceDetails;