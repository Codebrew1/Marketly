import { AsyncStorage, Alert, Platform  } from 'react-native'
import * as type from '../constants/ActionTypes'
import axios from 'axios'

// App Globals
import AppConfig from './../config'

export const getServices = (userType, showLoading= true) => {
  return (dispatch, getState) => {

    if(showLoading)
        dispatch(servicesRequest())

    let type= userType == 'influencer' ? 'Influencer' : 'Business';

    return axios.get(`${AppConfig.baseAPIUrl}${type}/users/myserviceListing`)
    .then(response => {

        if(response.status === 200)
            return dispatch(servicesSuccess(response.data.data.New, response.data.data.ONGOING, response.data.data.PAST));

        return dispatch(servicesError('Something went wrong.'))
    })
    .catch(error => { console.log(error); dispatch(servicesError(error.response.data.message)) } );
 
  }
}

export const acceptOrRejectServiceRequest = (status, requestId, index) => {

    return (dispatch) => {

        dispatch(acceptOrRejectService(index));

        return axios.put(`${AppConfig.baseAPIUrl}Influencer/users/acceptRejectInvite`, {requestId, action: status})
        .then(response => {

            dispatch(getServices('influencer', false));
        })
        .catch(error => dispatch(getServices('influencer', false)) );
     
    }
}

export const acceptOrRejectService = (index) => {
    return {
        type: type.ACCEPT_OR_REJECT_SERVICE,
        index
    }
}

export const servicesRequest = () => {
    return {
        type: type.MY_SERVICES_REQUEST
    }
}

export const servicesSuccess = (newServices, ongoing, past) => {

    return {
        type: type.MY_SERVICES_SUCCESS,
        newServices,
        ongoing,
        past
    }

}


export const servicesError = (error) => {
    return {
        type: type.MY_SERVICES_ERROR,
        payload: error
    }
}