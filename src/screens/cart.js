import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  View,
  AsyncStorage,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  ListView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';

// App Globals
import AppConfig, {navigatorStyle} from './../config'
import AppStyles from './../styles'

import * as cartActions from '../actions/cartActions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BackgroundImage from './../components/BackgroundImage'
import Button from './../components/Button'


class cart extends Component {

    getTotal = () => {
        let {cartData}= this.props.cart;

        let total= 0;

        cartData.forEach(function(data, index) {
            total+=data.price;
        });

        return total.toFixed(2);
    }

    getInfluencerPostIds= () => {
        let {cartData}= this.props.cart;

        let influencers= [];

        cartData.forEach(function(data, index) {
            influencers.push(data.postId);
        });

        return influencers.join(',');
    }

    _submit= () => {

        if(this.props.cart.sendingRequest)
            return;

        if(this.props.cart.cartData.length == 0)
            return Alert.alert("Cart can't be empty!");

        let {cartData, service, image}= this.props.cart;

        if(image)
            service= {...service, servicePicURLOriginal: image.original, servicePicURLThumbnail: image.thumbnail};

        service = {...service, postId: this.getInfluencerPostIds()};

        this.props.actions.sendServiceRequest(service, this.popToRoot)
    }

    popToRoot= () => {
        this.props.navigator.popToRoot({
            animated: true,
            animationType: 'fade',
        });
    }

    renderPlatform= (platform) => {

        platform= platform.toLowerCase();

        return <Icon key={platform} name={platform} size={15}  color="white" style={[styles.socialIcon, styles[`${platform}Icon`] ]} />
    }

    renderCartData= (data) => {

        let {postId, firstName, lastName, price, influencerData, platformType}= data;

        return (
            <View style={[AppStyles.flex1,styles.listRow]}>
                <Image style={[styles.userImage ]} source={require('./../../images/default-avatar.png')} />
                
                <View style={styles.serviceCon}>
                    <Text style={[AppStyles.p2, styles.userText]}>{firstName} {lastName}</Text>

                    <View style={styles.ratingStyle}>
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={influencerData.rating}
                            starSize={13}
                            starColor="#ffc629"
                            emptyStarColor='rgba(255,255,255,0.2)'
                          />
                    </View>
                </View>

                <View style={{flex: 1, alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <View style={styles.socialIconsCon}>
                        {platformType.map(platform => this.renderPlatform(platform))}
                    </View>
                    <Text style={[AppStyles.h4, styles.price]}>${price.toFixed(2)}</Text>
                </View>

            </View>
        )

    }

    renderImage= () => {

        let {cart}= this.props;

        if(cart.image)
            return <Image resizeMode="cover" style={[styles.cartImage ]} source={{uri : cart.image.original}} defaultSource={require('./../../images/default-avatar.png')} />
        else
            return <Image resizeMode="cover" style={[styles.cartImage ]} source={require('./../../images/default-avatar.png')} defaultSource={require('./../../images/default-avatar.png')} />
    }


    render() {

        let {cart}= this.props;

        return (
            
            <BackgroundImage blur>

                <ScrollView>

                    {this.renderImage()}
                    
                    <LinearGradient  colors={['transparent', 'rgba(0,0,0,0.4)']} style={styles.usernameCon}>

                        <Text style={[AppStyles.h2, styles.usernameText]}>{cart.service.serviceName}</Text>
                        <Text numberOfLines={2} style={[AppStyles.p2, styles.description]}>{cart.service.description}</Text>
                    </LinearGradient>

                    <View style={styles.container}>

                        <ListView
                            enableEmptySections={true}
                            dataSource={this.props.cartSource}
                            renderRow={this.renderCartData}
                        />

                        <View style={[AppStyles.flex1, {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15}]}>
                            
                            <Text style={[AppStyles.h4]}>Total</Text>
                            
                            <View style={{alignItems: 'flex-end'}}>
                                <Text style={[AppStyles.h3, {fontWeight: '600'}]}>${this.getTotal()}</Text>
                            </View>
                        </View>

                        <View style={[AppStyles.flex1, {marginBottom: 20}]}>
                            
                            <View style={[AppStyles.flex1]}>
                                <Button
                                    title='Service Request'
                                    type="secondary"
                                    loading={cart.sendingRequest}
                                    onPress={this._submit}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </BackgroundImage>
         
        );
    }
}

const styles= StyleSheet.create({
    container: {
        backgroundColor: AppConfig.prominentColorLight,
        margin: 8,
        paddingHorizontal: 15,
        borderRadius: 5
    },
    listRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)'
        
    },
    userImage: {
        height: 40,
        width: 40,
        borderRadius: 20
    },
    userText: {
        fontSize: 13,
        lineHeight: 15,
        paddingLeft: 15,
        paddingBottom: 3
    },
    cartImage: {
        flex: 1,
        height: (AppConfig.windowHeight/3),
    },
    ratingStyle: {
        width: 80,
        paddingLeft: 15,
        paddingTop: 2
    },
    usernameCon:{
        position: 'absolute',
        top: (AppConfig.windowHeight/3) - 90,
        height: 90,
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        width: AppConfig.windowWidth
    },
    usernameText: {
        paddingLeft: 15,
        backgroundColor: 'transparent',
        fontWeight: '600',

    },
    description: {
        paddingHorizontal: 15,
        paddingBottom: 10,
        fontSize: 12
    },
    detailsCon: {
        paddingVertical: 40,
        paddingHorizontal: 20
    },
    detailCon:{
        paddingBottom: 28
    },
    detailText:{
        fontSize: 13,
        color: '#939ac1',
        paddingTop: 4
    },
    socialIconsCon: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingRight: 15,
        paddingBottom: 2
    },
    socialIcon: {
        backgroundColor: 'red',
        marginLeft: 8,
        paddingVertical: 5,
        paddingHorizontal: 6,
        borderRadius: 14,
        overflow: 'hidden'
    },
    twitterIcon: {
        backgroundColor: '#44b6f4'
    },
    instagramIcon:{
        backgroundColor: '#ae31db'
    },
    youtubeIcon:{
        backgroundColor: 'rgba(255,0,0,0.6)'
    },
    price: {
        fontSize: 14
    },
    acceptBtn: {
        backgroundColor: AppConfig.secondaryColor,
        borderRadius: 4,
        height: 38,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        fontFamily: AppConfig.baseFont,
        color: 'white',
        fontSize: 13,
        fontWeight: '600'
    }

});

const dataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
});

function mapStateToProps(state, ownProps) {
    return {
        cart: state.cart,
        cartSource: dataSource.cloneWithRows(state.cart.cartData),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(cartActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(cart);