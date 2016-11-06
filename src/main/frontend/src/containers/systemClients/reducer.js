import * as event from './constants'

var initClientListState = {
    clientList: [{name: 'Горгаз'}, {name: 'Газпром'}, {name: 'Макдональдс'}],
    frontend: {
        pageNumber: 1,
        recordsCount: 10
    }
};

export default (state = initClientListState, action) => {
    switch (action.type) {
        case event.GET_CLIENT_LIST_REQUEST:
            return state;
        case event.GET_CLIENT_LIST_FAIL:
            return state;
        case event.GET_CLIENT_LIST_SUCCESS:
            return {...state, clientList: action.payload};
        default:
            return state;
    }
}


