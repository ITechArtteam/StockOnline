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
    },
    frontend: {
        statusRadioValue: '2',
        filterCompanyNameValue: '',
        filterAddressValue: '',
        isFilterMessageVisible: false
    }
};

export default (state = initClientListState, action) => {
    switch (action.type) {
        case event.GET_CLIENT_LIST_REQUEST:
            return {
                ...state
            };
        case event.DELETE_CLIENT_LIST_SUCCESS:
            return {
                ...state, alert: action.payload
            };
        case event.GET_CLIENT_LIST_SUCCESS:
            return {...state, page: action.payload};

        case event.SHOW_DIALOG:
            return {... state, alert: action.payload};

        case event.CLOSE_DIALOG:
            return {... state, alert: {...state.alert, isVisible: false}};
        case event.FORM_CLIENTS_SET_STATUS_RADIO:
            return {...state, frontend: {...state.frontend, statusRadioValue: action.payload}};
        case event.SET_FILTER_INPUT_VALUE:
            return {...state, frontend: {...state.frontend, [action.payload.inputId]: action.payload.value}};

        case event.SET_FILTER_MESSAGE_VISIBILITY:
            return {...state, frontend: {...state.frontend, isFilterMessageVisible: action.payload}};


        default:
            return state;
    }
}


