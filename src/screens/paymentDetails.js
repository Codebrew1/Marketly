import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  View,
  AsyncStorage,
  StyleSheet,
  Alert,
  TouchableOpacity
} from 'react-native';
import RNRestart from 'react-native-restart';


// App Globals
import AppConfig, {navigatorStyle} from './../config'
import AppStyles from './../styles'

import BackgroundImage from './../components/BackgroundImage'
import Button from '../components/Button'
import { CreditCardInput } from "react-native-credit-card-input";


class paymentDetails extends Component {

    _onChange= (form) => {
        console.log(form, 'onChange');
    }

    showAddCard= () => {
        this.props.navigator.push({
            screen: 'add-card',
            title: 'Add Card',
            navigatorStyle,
            animated: true,
            animationType: 'slide-horizontal'
        });
    }


    render() {

        return (
            <BackgroundImage blur>

                <View style={[AppStyles.flex1, {padding: 20}]}>

                    <View style={AppStyles.flex1}>
                        <TouchableOpacity style={styles.card}>
                            <Text style={[AppStyles.h2, styles.brand]}>Master Card</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                <Text style={[AppStyles.p2, styles.number]}>****</Text>
                                <Text style={[AppStyles.p2, styles.number]}>****</Text>
                                <Text style={[AppStyles.p2, styles.number]}>****</Text>
                                <Text style={[AppStyles.p2, styles.number]}>2546</Text>
                            </View>

                            <View>
                                <Text style={[AppStyles.p2, styles.detail]}>JOHN SNOW</Text>
                                <Text style={[AppStyles.p2, styles.detail]}>EXPIRES 08/23</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{flex: 1, justifyContent: 'flex-end', alignSelf: 'stretch'}}>
                        <Button
                            title='Add New Card'
                            type="primary"
                            onPress={this.showAddCard}
                        />
                    </View>

                </View>

            </BackgroundImage>
        );
    }
}

const styles= StyleSheet.create({
    card: {
        backgroundColor: AppConfig.secondaryColor,
        borderRadius: 5,
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    brand: {
        textAlign: 'center'
    },
    number: {
        textAlign: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10
    },
    detail: {
        textAlign: 'center',
        paddingVertical: 5,
        fontSize: 11,
        lineHeight: 14
    },
});




export default paymentDetails;