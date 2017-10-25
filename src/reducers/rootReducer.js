import { combineReducers } from 'redux';
import auth from './auth'
import signup from './signup'
import user from './user'
import cart from './cart'
import notifications from './notifications'
import myServices from './myServices'

const rootReducer = combineReducers({
	auth,
	signup,
	myServices,
	user,
	cart,
	notifications
});

export default rootReducer;
