import * as type from '../constants/ActionTypes'

const initialState = {
  data: [
    {
        'desc' : 'Mike Hussey gave you 5 star rating.',
        'time' : '3 min'
    },
    {
        'desc' : 'John Snow deposited $170 in your account.',
        'time' : '10 min'
    },
    {
        'desc' : 'Lucy Martin added a new service.',
        'time' : '3 hrs'
    },
    {
        'desc' : 'David Hussey deposited $170 in your account.',
        'time' : '7 hrs'
    }
  ]
}

const notifications = (state = initialState, action) => {

    switch (action.type) {
        case type.GOT_NEW_NOTIFICATION:
            return {
                state
            }
        default:
            return state
    }
}

export default notifications
