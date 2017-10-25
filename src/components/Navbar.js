import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Platform
} from 'react-native';
import { Icon } from 'react-native-elements'

// App Globals
import AppConfig, {navigatorStyle} from './../config'
import AppStyles from './../styles'

import * as cartActions from '../actions/cartActions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Todo: proptypes

class Navbar extends Component {

    gotoCart= () => {

        this.props.cart.navigator.push({
            screen: 'create-service',
            title: 'Create Service',
            navigatorStyle,
            animated: true,
            animationType: 'slide-horizontal'
        });
    }

	render() {

        let counter= null;

        let itemsCount= this.props.cart.cartData.length;

        if(itemsCount)
            counter=<TouchableOpacity style={[styles.cartCounter]} activeOpacity={1}>
                    <Text style={[AppStyles.p2, styles.cartText]} >{itemsCount}</Text>
                </TouchableOpacity>;

		return (
            <View style={[AppStyles.flex1, styles.navbarCon]}>
                <Text style={[AppStyles.h3, styles.title]}>Influencer List</Text>
    			<View style={[AppStyles.flex1, styles.cartCon]}>
                    <Icon
                            name='shopping-cart'
                            type='entypo'
                            size={20}
                            color='white'
                            underlayColor='transparent'
                            onPress={this.gotoCart}
                            style={{padding: 10}}
                       />

                    {counter}
                    
                </View>
            </View>
		);
	}
}

const styles= StyleSheet.create({
    navbarCon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: Platform.OS == 'ios' ? 'center' : 'flex-start',
        backgroundColor: 'transparent'
    },
    title: {
        fontWeight: Platform.OS == 'ios' ? '500' : '300',
        fontSize: Platform.OS == 'ios' ? 18 : 21
    },
    cartCon: {
        // backgroundColor: 'red',
        marginRight: 15,
        alignItems: 'flex-end',
        position: 'absolute',
        top: 10,
        right: 0
        
    },
    cartCounter: {
        position: 'absolute',
        right: 1,
        top: 1,
        backgroundColor: AppConfig.primaryColor,
        height: 14,
        width: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
    },
    cartText:{
        fontSize: 8,
        fontWeight: '700',
        lineHeight: 10

    }

});



function mapStateToProps(state, ownProps) {
    return {
        cart: state.cart,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(cartActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
