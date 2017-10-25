import * as type from '../constants/ActionTypes'

const initialCartState = {
    image: null,
    uploadingImage: false,
    service: null,
	navigator: null,
    hasMore: true,
    nextPage: 1,
    isFetching: false,
    isRefreshing: false,
    influencers: [],
    cartData: [],
    sendingRequest: false
  
}

const cart = (state = initialCartState, action) => {
  switch (action.type) {

    case type.GET_INFLUENCERS_REQUEST:
        return {
            ...state,
            isFetching: true

        }
    case type.REFRESH_INFLUENCERS_REQUEST:
        return {
            ...state,
            isFetching: true,
            isRefreshing: true
        }
    case type.INFLUENCERS_REQUEST_FAILED:
        return {
            ...state,
            isFetching: false,
            isRefreshing: false
        }
    case type.GOT_INFLUENCERS:
        return {
            ...state,
            influencers: [...state.influencers, ...action.influencers],
            nextPage: action.nextPage,
            hasMore: action.hasMore,
            isFetching: false,
            isRefreshing: false
        }
    case type.SENDING_SERVICE_REQUEST:
        return {
            ...state,
            sendingRequest: true
        }
    case type.SERVICE_REQUEST_SUCCESS:
        return {
            ...state,
            sendingRequest: false
        }
    case type.SERVICE_REQUEST_SUCCESS:
        return {
            ...state,
            sendingRequest: false
        }
    case type.SERVICE_REQUEST_FAILED:
        return {
            ...state,
            sendingRequest: false
        }
    case type.SERVICE_IMAGE_REQUEST:
        return {
            ...state,
            uploadingImage: true
        }
    case type.SERVICE_IMAGE_FAILED:
        return {
            ...state,
            uploadingImage: false
        }
    case type.SERVICE_IMAGE_SUCCESS:
        return {
            ...state,
            uploadingImage: false,
            image: action.image
        }
    case type.CREATE_SERVICE_REQUEST:
        return {
            ...state,
            service: action.service
        }        
    case type.ADD_INFLUENCER_TO_CART:
      	return {
        	...state,
        	cartData: [...state.cartData, action.influencer]
      	}
    case type.REMOVE_INFLUENCER_FROM_CART:
      	return {
        	...state,
        	cartData: [...state.cartData.slice(0,action.i), ...state.cartData.slice(action.i + 1)]
      	}
    case type.ADD_NAVIGATOR:
      	return {
        	...state,
        	navigator: action.navigator
      	}
    case type.RESET_EVERYTHING:
        return {
            ...state,
            image: null,
            uploadingImage: false,
            service: null,
            hasMore: true,
            nextPage: 1,
            isFetching: false,
            isRefreshing: false,
            cartData: [],
            sendingRequest: false
        }     	
    default:
        return state
  }
}

export default cart
