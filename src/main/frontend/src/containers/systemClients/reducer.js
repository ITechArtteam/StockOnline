import * as event from './constants'

var initClientListState = {
    page: {
        activePage: 1,
        totalItemsCount: 0,
        itemsCountPerPage: 5,
        clientList: [],
    }
};

export default (state = initClientListState, action) => {
    switch (action.type) {
        case event.GET_CLIENT_LIST_REQUEST:
            return state;
        case event.GET_CLIENT_LIST_FAIL:
            return state;
        case event.GET_CLIENT_LIST_SUCCESS:
            return {...state, page: action.payload};
        default:
            return state;
    }
}


