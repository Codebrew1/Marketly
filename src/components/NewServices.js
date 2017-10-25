import React, {Component} from 'react';

import {
  Text,
  ScrollView,
  ListView,
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  RefreshControl,
  Alert
} from 'react-native';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as myServicesActions from '../actions/myServicesActions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {handleScroll} from './../utils/general'

// App Globals
import AppConfig from './../config'
import AppStyles from './../styles'

// Todo: proptypes

class NewServices extends Component {

    defaultImage= null;
    componentWillMount(){
        this.defaultImage= <Image style={[styles.serviceImage]} source={require('./../../images/default-avatar.png')} />;
    }

    fetchData=() => {
        if(!this.props.myServices.isFetching)
            this.props.actions.getServices(this.props.user.userType);
    }

    getServiceIndex= (requestId) => {
        let data= this.props.myServices.new;

        return data.findIndex((item) => item._id === requestId);
    }


     /**
    * Each Row Item
    */
    _renderRow = (data) => {

        if(this.props.user.userType== 'business')
            return this.businessRow(data);
        else if(this.props.user.userType== 'influencer')
            return this.influencerRow(data);

        return null;        
    }

    renderImage= (url) => {

        if(url)
            return <Image style={[styles.serviceImage]} source={{uri: url}} defaultSource={require('./../../images/default-avatar.png')} />;
        else
            return this.defaultImage;
    }

    renderPlatform= (platform) => {

        platform= platform.toLowerCase();

        return <Icon key={platform} name={platform} size={15}  color="white" style={[styles.socialIcon, styles[`${platform}Icon`] ]} />
    }

    acceptOrRejectService = (status, requestId) => {

        let statusText= status== 'REJECT' ? 'Reject' : 'Accept';
        let {actions}= this.props;

        Alert.alert(
          'Are you sure?',
          `${statusText} this service request.`,
          [
            {text: 'Yes', onPress: () => actions.acceptOrRejectServiceRequest(status, requestId, this.getServiceIndex(requestId)) },
            {text: 'No', style: 'cancel'}
            
          ],
          { cancelable: false }
        );
    }



    influencerRow= (data) => {
        let {_id, serviceName, platformType, serviceImage, description}= data.serviceId;

        let {firstName, lastName, profilePicURL}= data.businessUserId;

        return (
            <TouchableOpacity onPress={ () => this.props.showDetailsScreen(_id, data.postId._id, serviceName)} style={[AppStyles.flex1, styles.listColumn]} activeOpacity={0.7}>

                <View style={[AppStyles.flex1,styles.rowCon]}>

                    {this.renderImage(profilePicURL.thumbnail)}

                    <View style={styles.serviceCon}>
                        <Text style={[AppStyles.p2, styles.serviceText2]}>{firstName} {lastName}</Text>

                        <View style={styles.descContainer}>
                            <Text style={[AppStyles.p2, styles.descText]} >May 24</Text>
                        </View>
                    </View>

                </View>

                <View style={[styles.lowerCon, AppStyles.flex1]}>
                    <Text style={[AppStyles.h4, styles.itemTitle]}>{serviceName}</Text>
                    <Text numberOfLines={2} style={[AppStyles.p2, styles.itemDesc]}>{description}</Text>

                    <View style={[AppStyles.flex1, styles.rowCon, {marginTop: 15}]}>
                        
                        <View style={[AppStyles.flex1, {paddingRight: 10}]}>
                            <TouchableOpacity onPress={() => this.acceptOrRejectService('ACCEPT', data._id)} style={styles.acceptBtn} activeOpacity={0.7}>
                                <Text style={styles.btnText}>Accept</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[AppStyles.flex1, {paddingLeft: 10}]}>
                            <TouchableOpacity onPress={() => this.acceptOrRejectService('REJECT', data._id)} style={[styles.acceptBtn, styles.declineBtn]} activeOpacity={0.7}>
                                <Text style={styles.btnText}>Decline</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.socialIconsCon}>
                    {platformType.map(platform => this.renderPlatform(platform))}
                </View>    
            </TouchableOpacity>
        )
    }

    businessRow= (data) => {

        let {_id, serviceName} = data.serviceId;
        let {rating}= data.influencerId;
        let {firstName, lastName}= data.postId;


        return (
            <TouchableOpacity onPress={ () => this.props.showDetailsScreen(_id, data.postId._id, serviceName)} style={[AppStyles.flex1, styles.listRow]} activeOpacity={0.7}>

                {this.renderImage(null)}

                <View style={styles.serviceCon}>
                    <Text style={[AppStyles.p2, styles.serviceText]}>{firstName} {lastName}</Text>

                    <View style={styles.ratingStyle}>
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={rating}
                            starSize={13}
                            starColor="#ffc629"
                            emptyStarColor='rgba(255,255,255,0.2)'
                          />
                    </View>
                </View>

                <TouchableOpacity style={styles.serviceBtn} disabled>
                    <Text style={styles.serviceBtnTxt}>Pending</Text>
                </TouchableOpacity>  
            </TouchableOpacity>
        )

    }

    offset= 0;
    _onScroll= (event) => {

        let {offset, direction}= handleScroll(event, this.offset);
        this.offset = offset;
  
        // if(direction == 'down')
        //     this.props.navbarToggle('hidden');
        // else
            this.props.navbarToggle('shown');
    }

    footer=() => {

        let {myServices}= this.props;

        let footer= <View style={styles.footerCon}></View>

        if(myServices.new.length == 0)
            footer= <View style={styles.footerCon}><Text style={[AppStyles.p2, {textAlign: 'center', paddingTop: 60}]}>Nothing to show!</Text></View>

        return footer;
    }

	render() {

		return (
			
			<View style={AppStyles.flex1}>

                <ListView
                    enableEmptySections={true}
                    dataSource={this.props.dataSource}
                    renderRow={this._renderRow}
                    renderFooter={this.footer}
                    
                    refreshControl={
                      <RefreshControl
                        refreshing={this.props.myServices.isFetching}
                        onRefresh={this.fetchData}
                      />
                    }
                    onScroll={this._onScroll}
                    contentContainerStyle={styles.listView}
                />
            </View>
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
    ratingStyle: {
        width: 80
    },
    serviceText: {
        fontSize: 13,
        bottom: 2
    },
    serviceText2: {
        fontSize: 13
    },
    serviceBtn: {
        position: 'absolute',
        right: 15,
        backgroundColor: '#757a9d',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5
    },
    serviceBtnTxt: {
        fontFamily: AppConfig.baseFont,
        color: AppConfig.prominentColor,
        fontSize: 10,
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
    footerCon: {
        paddingVertical: 10
    }
});

const dataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
});

function mapStateToProps(state, ownProps) {
    return {
        dataSource: dataSource.cloneWithRows(state.myServices.new),
        myServices: state.myServices,
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(myServicesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewServices);

