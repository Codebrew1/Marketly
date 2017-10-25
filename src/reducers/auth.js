import * as type from '../constants/ActionTypes'

const initialUserState = {
  isFetching: false,
  error: false
}

const auth = (state = initialUserState, action) => {
  switch (action.type) {
    case type.LOGIN_REQUEST:
        return {
            ...state,
            error: false,
            isFetching: true
        }
    case type.LOGIN_SUCCESS:
        return {
            ...state,
            isFetching: false,
            error: false,
        }
    case type.LOGIN_FAILED:
        return {
            ...state,
            error: true,
            isFetching: false
        }
    case 'LOGOUT_USER':
        return initialUserState
    default:
        return state
  }
}

export default auth
