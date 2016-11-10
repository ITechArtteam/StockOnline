import * as event from './constants'

var initClientListState = {
    page: {
        activePage: 1,
        totalItemsCount: 0,
        itemsCountPerPage: 5,
        clientList: [],
    },
    frontend: {
        isDialogDeleteConfirmVisible: false,
        isDialogNothingToDeleteVisible: false
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
        case event.GET_CLIENT_LIST_SUCCESS:
            return {...state, page: action.payload};

        case event.SET_CONFIRM_DELETE_DIALOG_VISIBILITY:
            return {... state, frontend: {...state.frontend, isDialogDeleteConfirmVisible: action.payload}};

        case event.SET_NOTHING_TO_DELETE_DIALOG_VISIBILITY:
            return {... state, frontend: {...state.frontend, isDialogNothingToDeleteVisible: action.payload}};


        default:
            return state;
    }
}


