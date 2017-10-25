import { AsyncStorage, Alert, Platform  } from 'react-native'
import * as type from '../constants/ActionTypes'
import axios from 'axios'

// App Globals
import AppConfig from './../config'


export const loginUser = (email, password, userType, login) => {
    return (dispatch, getState) => {
        dispatch(loginRequest())

        let deviceType= Platform.OS == 'ios' ? 'IOS' : 'ANDROID';
        let type= userType == 'influencer' ? 'Influencer' : 'Business';


        return axios.post(`${AppConfig.baseAPIUrl}${type}/users/userLogin`, {
            email, password, deviceType
        })
        .then(response => {
          
            if(response.status === 200){
                let user= {...response.data.data, userType};
                return dispatch(loginSuccess(JSON.stringify(user), login ))
            }
           
            return dispatch(loginFailed('Something went wrong.'))
        })
        .catch(error => dispatch(loginFailed(error.response.data.message)) );
     
    }
}

export const loginRequest = () => {
    return {
        type: type.LOGIN_REQUEST
    }
}

export const loginSuccess = (data, login) => {

    try{
        AsyncStorage.setItem('user', data)
        .then( (result) => {
            login();
        });
    } catch (error) {dispatch(loginFailed('Something went wrong.')) }

    return {
        type: type.LOGIN_SUCCESS
    }

}

export const loginFailed = (message= 'Something went wrong.') => {

    Alert.alert(
          '',
          message,
    );
    return {
        type: type.LOGIN_FAILED
    }
}

export const loginError = (error) => {
    return {
        type: 'LOGIN_REJECTED',
        payload: error
    }
}