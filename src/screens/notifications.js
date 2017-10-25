import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ListView
} from 'react-native';

// App Globals
import AppConfig, {navigatorStyle} from './../config'
import AppStyles from './../styles'

import * as cartActions from '../actions/cartActions' // dummy
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from './../components/Button'
import Logo from './../components/Logo'
import BackgroundImage from './../components/BackgroundImage'


class notifications extends Component {

    renderNotification= (data) => {
        let {desc, time} = data;

        let title= (Math.floor((Math.random() * 10) + 1) < 5) ? 'Seconds Watch' : 'Men\'s Baketball Shoes';

        return (
            <TouchableOpacity style={[AppStyles.flex1, styles.listRow]} activeOpacity={0.7}>

                <View style={[styles.rowCon, {flex: 3}]}>
                    <Image style={[styles.userImage ]} source={require('./../../images/default-avatar.png')} />
                    <Text numberOfLines={2} style={[AppStyles.p2, styles.userText]}>{desc}</Text>
                </View>

                <View style={[styles.rowCon, {flex: 1, justifyContent: 'flex-end'}]}>
                    <Text style={[AppStyles.p2, styles.userText, styles.timeText]}>{time}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    renderEmpty= () => {

        return <BackgroundImage blur><Text style={[AppStyles.p2,{textAlign: 'center'}]}>No notifications to show!</Text></BackgroundImage>
    }


    render() {

        return this.renderEmpty();

        return (
            <BackgroundImage blur>

                <ListView
                    enableEmptySections={true}
                    dataSource={this.props.notificationSource}
                    renderRow={this.renderNotification}
                    contentContainerStyle={styles.listView}
                />

                <View style={AppStyles.spacer_15} />
            </BackgroundImage>
        );
    }
}

const styles= StyleSheet.create({
     userImage: {
        height: 40,
        width: 40,
        borderRadius: 20
    },
    userText: {
        fontSize: 12,
        lineHeight: 15,
        paddingLeft: 15,
        paddingBottom: 3,
    },
    timeText: {
        color: '#939ac1'
    },
    listView: {
        paddingHorizontal: 15,
    },
    listRow: {
        backgroundColor: AppConfig.prominentColorLight,
        marginTop: 10,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
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
        flex: 1,
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
    paypalText:{
        fontStyle: 'italic'
    },
    priceText: {
        fontSize: 11,
        lineHeight: 11,
        color: '#939ac1'
    }
});

const dataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
});


function mapStateToProps(state, ownProps) {
    return {
        notificationSource: dataSource.cloneWithRows(state.notifications.data)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(cartActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(notifications);