import * as event from './constants'

// TODO 07.11.2016 get pageCount from server
var initClientListState = {
    clientList: [],
    frontend: {
        currentPage: 1,
        pageCount: 10,
        limit: 10
    }
};

export default (state = initClientListState, action) => {
    switch (action.type) {
        case event.GET_CLIENT_LIST_REQUEST:
            return {...state, frontend: {...state.frontend, currentPage: action.payload}};
        case event.GET_CLIENT_LIST_FAIL:
            return state;
        case event.GET_CLIENT_LIST_SUCCESS:
            return {...state, clientList: action.payload};
        case event.SET_PAGE_LIMIT_ACTION:
            return {...state, frontend: {...state.frontend, limit: action.payload}};
        default:
            return state;
    }
}


