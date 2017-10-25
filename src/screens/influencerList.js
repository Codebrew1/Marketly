import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  View,
  AsyncStorage,
  ListView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  RefreshControl
} from 'react-native';

import * as cartActions from '../actions/cartActions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import StarRating from 'react-native-star-rating'
import Icon from 'react-native-vector-icons/FontAwesome';


// App Globals
import AppConfig, {navigatorStyle} from './../config'
import AppStyles from './../styles'

import BackgroundImage from './../components/BackgroundImage'


class influencerList extends Component {

    defaultImage= null;
    componentWillMount(){
        this.defaultImage= <Image style={[styles.serviceImage]} source={require('./../../images/default-avatar.png')} />;
    }

    componentDidMount(){

        this.props.actions.addNavigator(this.props.navigator);

        // let {influencers, hasMore}= this.props.cart;

        // if(influencers.length == 0 && hasMore)
        // {
        //     this.props.actions.getInfluencers(1);
        // }
        
    }

    getCartIndex= (postId) => {
        let {cartData}= this.props.cart;

        return cartData.findIndex((item) => item.postId === postId);
    }

    toggleFromCart= (id, user) => {

        let {actions}= this.props;

        if(id != -1)
            actions.removeInfluencerFromCart(id);
        else
            actions.addInfluencerToCart(user);
    }

    renderPlatform= (platform) => {

        platform= platform.toLowerCase();

        return <Icon key={platform} name={platform} size={15}  color="white" style={[styles.socialIcon, styles[`${platform}Icon`] ]} />
    }

    renderService= (service) => {

        return <TouchableOpacity key={service} style={styles.serviceBtn} disabled><Text style={styles.serviceBtnTxt}>{service}</Text></TouchableOpacity>
    }


    renderRow= (data) => {

        let {actions}= this.props;

        let {firstName, lastName, price, postId, platformType, preferredService, totalReview, influencerData} = data;

        let getCartIndex= this.getCartIndex(postId);

        return (
            <TouchableOpacity style={[AppStyles.flex1, styles.listColumn]} activeOpacity={0.7}>

                <View style={[AppStyles.flex1,styles.rowCon]}>

                    {this.defaultImage}

                    <View style={styles.serviceCon}>
                        <Text style={[AppStyles.p2, styles.serviceText2]}>{firstName} {lastName}</Text>

                        <View style={[AppStyles.flex1, styles.ratingCon]}>
                            <View style={styles.ratingStyle}>
                                <StarRating
                                    disabled={true}
                                    maxStars={5}
                                    rating={influencerData.rating}
                                    starSize={11}
                                    starColor="#ffc629"
                                    emptyStarColor='rgba(255,255,255,0.2)'
                                  />
                            </View>
                            <Text style={[AppStyles.p2, styles.ratingText]}>{totalReview} Reviews ({influencerData.rating})</Text>
                        </View>
                    </View>

                </View>

                <View style={[styles.lowerCon, AppStyles.flex1]}>

                    <Text style={[AppStyles.h4, styles.itemTitle]}>Preferred Services</Text>
                    <View style={styles.servicesCon}>
                        {preferredService.map(service => this.renderService(service))}
                    </View>

                    <Text style={[AppStyles.h4, styles.paymentTitle]}>Payment Method</Text>

                    <View style={[AppStyles.flex1, {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}]}>
                        <Text style={[AppStyles.h3, styles.paypalText]}>Paypal</Text>
                        <View style={{alignItems: 'flex-end'}}>
                            <Text style={[AppStyles.p2, styles.priceText]}>Price</Text>
                            <Text style={AppStyles.h4}>${price.toFixed(2)}</Text>
                        </View>
                    </View>
                    

                    <View style={[AppStyles.flex1, styles.rowCon, {marginTop: 7}]}>
                        
                        <View style={[AppStyles.flex1]}>
                            <TouchableOpacity onPress={ () => this.toggleFromCart(getCartIndex, data) } style={[styles.acceptBtn, (getCartIndex != -1) && styles.declineBtn ] } activeOpacity={0.7}>
                                <Text style={styles.btnText}> {(getCartIndex != -1) ? 'Remove from Cart' : 'Add to Cart'} </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.socialIconsCon}>

                    {platformType.map(platform => this.renderPlatform(platform))}
                    
                </View>
            </TouchableOpacity>
        );
    }

    _fetchData= () => {

        let {isFetching, hasMore}= this.props.cart;

        if(!isFetching && hasMore)
            this.props.actions.getInfluencers(this.props.cart.nextPage);
    }

    footer=() => {

        let noneFound= null;
        let loading= null;

        let {influencers, hasMore, isFetching, isRefreshing}= this.props.cart;

        if(influencers.length == 0 && !hasMore)
            noneFound= <Text style={styles.noResults}>No influencers found, pull down to retry!</Text>;

        if(isFetching && !isRefreshing)
            loading= <View style={styles.loader}><ActivityIndicator /></View>;

        return (
            <View style={styles.loaderCon}>{loading}{noneFound}</View>
        )
    }

    _onRefresh= () => {

        let {isFetching, isRefreshing}= this.props.cart;

        if(!isRefreshing && !isFetching)
            this.props.actions.getInfluencers(1, true);
    }


    render() {

        return (

            <BackgroundImage blur>

                <ListView
                    enableEmptySections={true}
                    dataSource={this.props.influencerSource}
                    renderRow={this.renderRow}
                    contentContainerStyle={styles.listView}
                    onEndReached={this._fetchData}
                    renderFooter={this.footer}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.cart.isRefreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                />
        
            </BackgroundImage>
        );
    }
}

const styles= StyleSheet.create({
    listView: {
        paddingHorizontal: 15,
    },
    listRow: {

        backgroundColor: AppConfig.prominentColorLight,
        marginTop: 10,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5
    },
    listColumn: {
        backgroundColor: AppConfig.prominentColorLight,
        marginTop: 10,
        padding: 15,
        flexDirection: 'column',
        borderRadius: 5
    },
    rowCon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    columnCon: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    serviceImage: {
        height: 40,
        width: 40,
        borderRadius: 20
    },
    serviceCon:{
        paddingLeft: 15
    },
    ratingCon: {
        paddingTop: 3,
        flexDirection: 'row'
    },
    ratingStyle: {
        width: 70,
    },
    ratingText: {
        fontSize: 10,
        paddingLeft: 4,
        lineHeight: 10,
        color: '#939ac1'
    },
    serviceText: {
        fontSize: 13,
        bottom: 2
    },
    serviceText2: {
        fontSize: 13
    },
    servicesCon: {
        flexDirection:'row',
        flexWrap:'wrap',
        marginTop: 5
    },
    serviceBtn: {
        backgroundColor: '#757a9d',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 4,
        marginRight: 12
    },
    serviceBtnTxt: {
        fontFamily: AppConfig.baseFont,
        color: AppConfig.prominentColor,
        fontSize: 11,
        fontWeight: '300'
    },
    descContainer: {
        flexDirection: 'row',
        width: 170
    },
    descText: {
        fontSize: 12,
        color: '#939ac1',
        lineHeight: 17
    }, 
    lowerCon: {
        marginTop: 8
    },
    itemTitle: {
        fontWeight: '400',
        fontSize: 14
    },
    paymentTitle: {
        fontWeight: '400',
        fontSize: 14,
        marginTop: 15,
        marginBottom: 0
    },
    itemDesc: {
        fontSize: 11,
        color: '#939ac1',
        lineHeight: 20
    },
    acceptBtn: {
        backgroundColor: AppConfig.secondaryColor,
        borderRadius: 4,
        height: 38,
        alignItems: 'center',
        justifyContent: 'center'
    },
    declineBtn:{
        backgroundColor: '#474e73',
    },
    btnText: {
        fontFamily: AppConfig.baseFont,
        color: 'white',
        fontSize: 13,
        fontWeight: '300'
    },
    socialIconsCon: {
        position: 'absolute',
        right: 15,
        top: 15,
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
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
    paypalText:{
        fontStyle: 'italic'
    },
    priceText: {
        fontSize: 11,
        lineHeight: 11,
        color: '#939ac1'
    },
    noResults: {
        textAlign: 'center',
        fontSize: 15,
        paddingHorizontal: 10,
        backgroundColor: 'transparent',
        color: 'white',
        paddingVertical: 50
    },
    loaderCon: {
        paddingVertical: 10
    },
    loader: {
        paddingVertical: 10
    },
});

const dataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
});


function mapStateToProps(state, ownProps) {
    return {
        cart: state.cart,
        influencerSource: dataSource.cloneWithRows(state.cart.influencers),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(cartActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(influencerList);