import * as type from '../constants/ActionTypes'


const user = (state = {}, action) => {
  	switch (action.type) {
    	case type.GOT_USER_FROM_STORAGE:
      		return {
        		...action.user
      		}
    	default:
      	return state
  	}
}

export default user
