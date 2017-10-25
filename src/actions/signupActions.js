import { AsyncStorage, Alert, Platform  } from 'react-native'
import * as type from '../constants/ActionTypes'
import axios from 'axios'

// App Globals
import AppConfig from './../config'


export const signupUser = (data, userType, signup) => {
    return (dispatch, getState) => {
        dispatch(signupRequest())

        console.log(data, signup, 'signup');

        let deviceType= Platform.OS == 'ios' ? 'IOS' : 'ANDROID';
        let type= userType == 'influencer' ? 'Influencer' : 'Business';

        data= {...data, deviceType };

        return axios.post(`${AppConfig.baseAPIUrl}${type}/users/signUp`, data)
        .then(response => {

            console.log(response, 'signup response', type);

            if(response.status === 200){
                let user= {...response.data.data, userType};
                return dispatch(signupSuccess(JSON.stringify(user), signup ))
            }

            return dispatch(signupFailed('Something went wrong.'))
        })
        .catch(error => { console.log(error); dispatch(signupFailed(error.response.data.message)) } );
     
    }
}

export const signupRequest = () => {
    return {
        type: type.SIGNUP_REQUEST
    }
}

export const signupSuccess = (data, signup) => {

    try{
        AsyncStorage.setItem('user', data)
        .then( (result) => {
            signup();
        });
    } catch (error) {dispatch(signupFailed('Something went wrong.')) }

    return {
        type: type.SIGNUP_SUCCESS
    }

}

export const signupFailed = (message= 'Something went wrong.') => {

  console.log(message, 'signup failed event');

    Alert.alert(
          '',
          message,
    );
    return {
        type: type.SIGNUP_FAILED
    }
}

export const signupError = (error) => {
    return {
        type: 'SIGNUP_REJECTED',
        payload: error
    }
}