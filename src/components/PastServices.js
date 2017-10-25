import React, {Component} from 'react';

import {
  Text,
  ScrollView,
  ListView,
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  RefreshControl
} from 'react-native';
import StarRating from 'react-native-star-rating';

import * as myServicesActions from '../actions/myServicesActions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {handleScroll} from './../utils/general'

// App Globals
import AppConfig from './../config'
import AppStyles from './../styles'

// Todo: proptypes

class PastServices extends Component {

    defaultImage= null;
    componentWillMount(){
        this.defaultImage= <Image style={[styles.serviceImage]} source={require('./../../images/default-avatar.png')} />;
    }

    fetchData=() => {
        if(!this.props.myServices.isFetching)
            this.props.actions.getServices(this.props.user.userType);
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
            return <Image style={[styles.serviceImage]} source={{uri: url}} />;
        else
            return this.defaultImage;
    }

    influencerRow= (data) => {
        let {_id, serviceName, platformType, serviceImage, description}= data.serviceId;
        let {action}= data;

        return (
            <TouchableOpacity onPress={ () => this.props.showDetailsScreen(_id, data.postId._id, serviceName)} style={[AppStyles.flex1, styles.listRow]} activeOpacity={0.7}>

                {this.renderImage(serviceImage.thumbnail)}
                
                <View style={styles.serviceCon}>
                    <Text style={[AppStyles.p2, styles.serviceText2]}>{serviceName}</Text>

                    <View style={styles.descContainer}>
                        <Text numberOfLines={1} style={[AppStyles.p2, styles.descText]} >{description}</Text>
                    </View>
                </View>

                <TouchableOpacity style={(action!='COMPLETE') ? styles.serviceBtn : styles.serviceBtnDanger} activeOpacity={0.7}>
                    <Text style={styles.serviceBtnTxt}>{action=='COMPLETE' ? 'Completed' : 'Rejected'}</Text>
                </TouchableOpacity>  
            </TouchableOpacity>
        );
    }

    businessRow= (data) => {

        let {_id, serviceName} = data.serviceId;
        let {rating}= data.influencerId;
        let {firstName, lastName}= data.postId;

        let status= true;

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

                <TouchableOpacity style={!status ? styles.serviceBtn : styles.serviceBtnDanger} disabled>
                    <Text style={styles.serviceBtnTxt}>{status ? 'Completed' : 'Rejected'}</Text>
                </TouchableOpacity>  
        
            </TouchableOpacity>
        );

    }

    offset= 0;
    _onScroll= (event) => {

        let {offset, direction}= handleScroll(event, this.offset);
        this.offset = offset;
  
        // rr
        this.props.navbarToggle('shown');
    }

    footer=() => {

        let {myServices}= this.props;

        let footer= <View style={styles.footerCon}></View>

        if(myServices.past.length == 0)
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
                    onScroll={this._onScroll}
                    contentContainerStyle={styles.listView}
                    renderFooter={this.footer}

                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.myServices.isFetching}
                            onRefresh={this.fetchData}
                        />
                    }
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
        left: 0,
        right: 0,
        backgroundColor: AppConfig.prominentColorLight,
        marginTop: 10,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5
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
        backgroundColor: AppConfig.primaryColor,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5
    },
    serviceBtnDanger: {
        position: 'absolute',
        right: 15,
        backgroundColor: AppConfig.secondaryColor,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5
    },
    serviceBtnTxt: {
        fontFamily: AppConfig.baseFont,
        color: 'white',
        fontSize: 10,
        fontWeight: '300'
    },
    descContainer: {
        flexDirection: 'row',
        width: 170
    },
    descText: {
        fontSize: 11,
        color: '#939ac1',
        lineHeight: 18
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
        dataSource: dataSource.cloneWithRows(state.myServices.past),
        myServices: state.myServices,
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(myServicesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PastServices);

