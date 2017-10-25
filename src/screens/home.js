import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  View,
  AsyncStorage,
  StyleSheet,
  Alert,
  Platform
} from 'react-native';
import RNRestart from 'react-native-restart';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import * as userActions from '../actions/userActions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


// App Globals
import AppConfig, {navigatorStyle} from './../config'
import AppStyles from './../styles'
import Button from './../components/Button'
import BackgroundImage from './../components/BackgroundImage'
import NewServices from './../components/NewServices'
import OngoingServices from './../components/OngoingServices'
import PastServices from './../components/PastServices'
import throttle from './../utils/throttle'


class home extends Component {

    state = {
        navbarStatus: [true, true, true],
        tab: 0
    }


    componentWillMount(){
        this.props.actions.getUserFromStorage();
    }

    navbarToggle= (to) => {
        
        let {tab, navbarStatus}= this.state;

        navbarStatus[tab]=

        this.props.navigator.toggleNavBar({ to });

        if(to == 'hidden')
            navbarStatus[tab]= false;
        else
            navbarStatus[tab]= true;

        this.setState({navbarStatus});
    }

    showReviewScreen= (id, image, price) => {
        this.props.navigator.showModal({
            screen: 'service-review',
            navigatorStyle: {...navigatorStyle, navBarHidden: true, statusBarHidden: true},
            passProps: {id, image, price}
        });
    }

    showDetailsScreen= (serviceId, postId, name) => {
        this.props.navigator.showModal({
            screen: 'service-details',
            navigatorStyle: {...navigatorStyle, navBarHidden: true, statusBarHidden: true},
            passProps: {serviceId, postId, name, userType: this.props.user.userType}
        });
    }

    render() {

        let {navbarStatus, tab}= this.state;

        let showTab= navbarStatus[tab];

        return (

            <View style={AppStyles.flex1}>
                <BackgroundImage blur>

                    <ScrollableTabView 
                        onChangeTab={({i}) => {this.setState({tab : i}); this.navbarToggle('shown')}  }
                        tabBarUnderlineStyle={{backgroundColor: 'white'}}
                        tabBarTextStyle={styles.tabBarTextStyle}
                        tabBarBackgroundColor={AppConfig.primaryColor}
                        style={[styles.tabView, !showTab && styles.borderTop ]}
                        prerenderingSiblingsNumber={Infinity} >
                        
                        <NewServices showDetailsScreen={this.showDetailsScreen} tabLabel="New" navbarToggle={this.navbarToggle} />
                        <OngoingServices showDetailsScreen={this.showDetailsScreen} showReviewScreen={this.showReviewScreen} tabLabel="Ongoing" navbarToggle={this.navbarToggle} />
                        <PastServices showDetailsScreen={this.showDetailsScreen} tabLabel="Past" navbarToggle={this.navbarToggle} />
           
                    </ScrollableTabView>

                </BackgroundImage>
            </View>
        );
    }
}

const styles= StyleSheet.create({
    tabView:{
        borderWidth: 0,
        backgroundColor: 'transparent',
        borderTopColor: AppConfig.primaryColor,
        borderTopWidth: 0
    },
    borderTop:{
        borderTopWidth: Platform.OS == 'ios' ? 20 : 0
    },
    tabBarTextStyle:
    {   
        fontSize: 13,
        fontFamily: 'Open Sans',
        backgroundColor:'transparent',
        top: 2,
        color: 'white',
        borderColor: 'transparent',
        borderWidth: 0,
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

export default connect(mapStateToProps, mapDispatchToProps)(home);
