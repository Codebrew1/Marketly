import * as type from '../constants/ActionTypes'

const initialUserState = {
  isFetching: false,
  error: false
}

const signup = (state = initialUserState, action) => {
  switch (action.type) {
    case type.SIGNUP_REQUEST:
        return {
            ...state,
            error: false,
            isFetching: true
        }
    case type.SIGNUP_SUCCESS:
        return {
            ...state,
            isFetching: false,
            error: false,
        }
    case type.SIGNUP_FAILED:
        return {
            ...state,
            error: true,
            isFetching: false
        }
    default:
        return state
  }
}

export default signup
