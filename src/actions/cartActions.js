import { AsyncStorage, Alert, Platform  } from 'react-native'
import * as type from '../constants/ActionTypes'
import {getServices}  from './myServicesActions'
import axios from 'axios'
import RNRestart from 'react-native-restart';

const dataLimit= 10;

// App Globals
import AppConfig from './../config'


export const sendServiceRequest= (data, popToRoot) => (dispatch, getState) => {

    dispatch(sendingServiceRequest());

    axios.post(`${AppConfig.baseAPIUrl}Business/users/createServicesAndSendInvite`, data)
    .then(response => {

        if(response.status === 200)
            return dispatch(serviceRequestSuccess(response.data, popToRoot));

        return dispatch(serviceRequestFailed('Something went wrong.'))
    })
    .catch(error => { console.log(error); dispatch(serviceRequestFailed(error.response.data.message)) } );
}

export const sendingServiceRequest = (service) => {
    return {
        type: type.SENDING_SERVICE_REQUEST,
        service
    }
}

export const serviceRequestSuccess = (response, popToRoot) => (dispatch) => {

    popToRoot();

    dispatch(getServices('business'), false);

    Alert.alert('', 'Service request added successfully.',
        [{text: 'OK', onPress: () => {

            dispatch(resetEverything());

        } }], { cancelable: false });

    return {
        type: type.SERVICE_REQUEST_SUCCESS,
        response
    }
}

export const serviceRequestFailed = (message= 'Something went wrong!') => {

    Alert.alert(
          '',
          message,
    );
    return {
        type: type.SERVICE_REQUEST_FAILED,
        message
    }
}

export const addServiceImage= (image) => (dispatch) => {

    dispatch(serviceImageRequest());

    let form = new FormData();
    form.append('imageUrl', {uri: image.path, name: 'photo.jpg' ,type: image.mime});
    let instance = axios.create();

    instance.defaults.timeout = 50000000;

    instance.post(`${AppConfig.baseAPIUrl}Business/users/uploadMedia`, form)
    .then(getImage => {

        if(getImage.status === 200 && getImage.data.data.profilePicURL){
            console.log('uploaded image', getImage);
            dispatch(serviceImageSuccess(getImage.data.data.profilePicURL));
        }

    })
    .catch(error => {

        if(error.response.data.error == 'Unauthorized')
            dispatch(logoutUser())
        else 
            dispatch(serviceImageFailed()) 
    } );

}

export const getInfluencers= (pageNumber, refresh= false) => (dispatch, getState) => {

    if(refresh)
        dispatch(refreshInfluencersRequest());
    else
        dispatch(getInfluencersRequest());

    axios.post(`${AppConfig.baseAPIUrl}Business/users/InfluencerListing`, {pageNumber, limit: dataLimit})
    .then(response => {
        console.log(response, response.data.data, 'get influencer');

        if(response.status === 200){

            let hasMore= (response.data.data.length == dataLimit) ? true : false;
            return dispatch(gotInfluencers(response.data.data, pageNumber+1, hasMore));
        }

        return dispatch(influencersRequestFailed('Something went wrong.'))
    })
    .catch(error => { console.log(error); dispatch(influencersRequestFailed(error.response.data.message)) } );

}


export const getInfluencersRequest = () => {
    return {
        type: type.GET_INFLUENCERS_REQUEST
    }
}

export const refreshInfluencersRequest = () => {
    return {
        type: type.REFRESH_INFLUENCERS_REQUEST
    }
}

export const gotInfluencers = (influencers, nextPage, hasMore) => {
    return {
        type: type.GOT_INFLUENCERS,
        influencers,
        nextPage,
        hasMore
    }
}

export const influencersRequestFailed = (message) => {
    return {
        type: type.INFLUENCERS_REQUEST_FAILED,
        message
    }
}


export const createServiceRequest = (service) => {
    return {
        type: type.CREATE_SERVICE_REQUEST,
        service
    }
}


export const logoutUser = () => {
    Alert.alert('Your session has expired, please relogin!');

    try{
        AsyncStorage.removeItem('user', () => {
            RNRestart.Restart();
        });
    }
    catch(error){}

}



export const serviceImageRequest = () => {
    return {
        type: type.SERVICE_IMAGE_REQUEST
    }
}



export const serviceImageSuccess = (image) => {
    return {
        type: type.SERVICE_IMAGE_SUCCESS,
        image
    }
}

export const serviceImageFailed = (message= 'Could not upload image, please retry.') => {

    Alert.alert(
          '',
          message,
    );
    return {
        type: type.SERVICE_IMAGE_FAILED
    }
}



export const addInfluencerToCart = (influencer) => {
    return {
        type: type.ADD_INFLUENCER_TO_CART,
        influencer
    }
}

export const removeInfluencerFromCart = (i) => {
    return {
        type: type.REMOVE_INFLUENCER_FROM_CART,
        i
    }
}


export const addServiceToCart = (service) => {

    return {
        type: type.ADD_SERVICE_TO_CART,
        service
    }

}

export const addNavigator = (navigator) => {
    return {
        type: type.ADD_NAVIGATOR,
        navigator
    }
}

export const emptyCart = () => {

    return {
        type: type.EMPTY_CART,
    }

}

export const resetEverything = () => {

    return {
        type: type.RESET_EVERYTHING,
    }

}

