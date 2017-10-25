import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  View,
  AsyncStorage,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements'
import {default as FIcon} from 'react-native-vector-icons/FontAwesome';

// App Globals
import AppConfig, {navigatorStyle} from './../config'
import AppStyles from './../styles'

import * as userActions from '../actions/userActions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BackgroundImage from './../components/BackgroundImage'


class userProfile extends Component {

    renderSocialIcons= () => {

        let {user}= this.props;

        if(user.userType== 'influencer')
            return (
                <View style={styles.detailCon}>
                    <Text style={AppStyles.h3}>Platforms</Text>
                    <View style={styles.socialIconsCon}>
                        <FIcon name="twitter" size={15}  color="white" style={[styles.socialIcon, styles.twitterIcon]} />
                        <FIcon name="instagram" size={15}  color="white" style={[styles.socialIcon, styles.instagramIcon]} />
                        
                    </View>
                </View>
            )

        return null;
    }


    render() {

        let {user}= this.props;

        return (
            <BackgroundImage blur>

                <ScrollView>

                    <Image resizeMode="cover" style={[styles.userImage ]} source={require('./../../images/default-avatar.png')} defaultSource={require('./../../images/default-avatar.png')} />
                    
                    <LinearGradient colors={['transparent', 'rgba(0,0,0,0.5)']} style={styles.usernameCon}>
                        <Text style={[AppStyles.h2, styles.usernameText]}>{user.firstName} {user.lastName}</Text>
                    </LinearGradient>

                    <View style={styles.editIcon}>
                        <Icon
                            raised
                            name='edit'
                            type='entypo'
                            color='white'
                            containerStyle={{backgroundColor: AppConfig.primaryColor}}
                       />
                    </View>

                    <View style={[AppStyles.flex1, styles.detailsCon]}>

                        <View style={styles.detailCon}>
                            <Text style={AppStyles.h3}>Mobile</Text>
                            <Text style={[AppStyles.p2, styles.detailText]}>N/A</Text>
                        </View>
                        <View style={styles.detailCon}>
                            <Text style={AppStyles.h3}>Email</Text>
                            <Text style={[AppStyles.p2, styles.detailText]}>{user.email}</Text>
                        </View>

                        {this.renderSocialIcons()}
                    </View>
                </ScrollView>
            </BackgroundImage>
        );
    }
}

const styles= StyleSheet.create({
    userImage: {
        flex: 1,
        height: (AppConfig.windowHeight/2.5),
    },
    usernameCon:{
        position: 'absolute',
        top: (AppConfig.windowHeight/2.5) - 50,
        height: 50,
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
    editIcon: {
        position: 'absolute',
        top: (AppConfig.windowHeight/2.5) - 35,
        right: 15,
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
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10

    },
    socialIcon: {
        backgroundColor: 'red',
        marginRight: 8,
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
    }

});

function mapStateToProps(state, ownProps) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(userProfile);