import * as type from '../constants/ActionTypes'


const initialServicesState = {
  new: [],
  ongoing: [],
  past: [],
  isFetching: false,
  error: false
}

const myServices = (state = initialServicesState, action) => {
  switch (action.type) {
    case type.MY_SERVICES_REQUEST:
        return {
            ...state,
            isFetching: true,
            error: false
        }
    case type.MY_SERVICES_SUCCESS:
        return {
            ...state,
            isFetching: false,
            error: false,
            new: action.newServices,
            ongoing: action.ongoing,
            past: action.past
        }
    case type.MY_SERVICES_FAILED:
        return {
            ...state,
            isFetching: false,
            error: true
        }
    case type.ACCEPT_OR_REJECT_SERVICE:
        return {
            ...state,
            new: [...state.new.slice(0,action.index), ...state.new.slice(action.index + 1)]
        }
    default:
        return state
  }
}

export default myServices
