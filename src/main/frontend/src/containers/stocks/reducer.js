import * as event from './constants'

    var initStockListState = {
        page: {
            activePage: 1,
            totalItemsCount: 0,
            itemsCountPerPage: 5,
            stockList: [],
        },
        alert: {
            isVisible: false,
            text: '',
            buttons: [],
            type: ''
        },
        frontend: {
            filterStockNameValue: '',
            filterAddressValue: '',
            isFilterMessageVisible: false
        }
};

    export default (state = initStockListState, action) => {
        switch (action.type) {
                case event.GET_STOCK_LIST_REQUEST:
                        return {
                            ...state
                        };
                case event.DELETE_STOCK_LIST_SUCCESS:
                        return {
                            ...state, alert: action.payload
                        };
                case event.GET_STOCK_LIST_SUCCESS:
                        return {...state, page: action.payload};

                case event.SHOW_DIALOG:
                        return {... state, alert: action.payload};

                case event.CLOSE_DIALOG:
                        return {... state, alert: {...state.alert, isVisible: false}};
                case event.SET_FILTER_INPUT_VALUE:
                        return {...state, frontend: {...state.frontend, [action.payload.inputId]: action.payload.value}};
                case event.SET_FILTER_MESSAGE_VISIBILITY:
                        return {...state, frontend: {...state.frontend, isFilterMessageVisible: action.payload}};

                default:
                    return state;
        }
    }
