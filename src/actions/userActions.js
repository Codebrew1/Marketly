import { AsyncStorage, Alert, Platform  } from 'react-native'
import * as type from '../constants/ActionTypes'
import {getServices}  from './myServicesActions'
import axios from 'axios'

// App Globals
import AppConfig from './../config'


export const getUserFromStorage = () => {
  return (dispatch, getState) => {

    dispatch(gettingUserFromStorage())

    try{
        AsyncStorage.getItem('user')
        .then( (user) => {

            if (user != null){
                user= JSON.parse(user);

                console.log(user, 'got user from storage');
                dispatch(gotUserFromStorage(user));
                dispatch(getServices(user.userType));
            }
            
        });
    }
    catch(error){}
  }
}


export const gettingUserFromStorage = () => {

    return {
        type: type.GETTING_USER_FROM_STORAGE
    }

}

export const gotUserFromStorage = (user) => {

    return {
        type: type.GOT_USER_FROM_STORAGE,
        user
    }

}

