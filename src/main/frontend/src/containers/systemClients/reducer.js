import * as event from './constants'

var initClientListState = {
    page: {
        activePage: 1,
        totalItemsCount: 0,
        itemsCountPerPage: 5,
        clientList: [],
    },
    alert: {
        isVisible: false,
        text: '',
        buttons: [],
        type: ''
    }
};

export default (state = initClientListState, action) => {
    switch (action.type) {
        case event.GET_CLIENT_LIST_REQUEST:
            return {
                ...state
            };
        case event.GET_CLIENT_LIST_FAIL:
            return {
                ...state
            };
        case event.DELETE_CLIENT_LIST_SUCCESS:
            return {
                ...state, alert: action.payload
            };
        case event.DELETE_CLIENT_LIST_FAIL:
            return {
                ...state, alert: action.payload
            };
        case event.GET_CLIENT_LIST_SUCCESS:
            return {...state, page: action.payload};

        case event.SHOW_DIALOG:
            return {... state, alert: action.payload};

        case event.CLOSE_DIALOG:
            return {... state, alert: {...state.alert, isVisible: false}};


        default:
            return state;
    }
}


