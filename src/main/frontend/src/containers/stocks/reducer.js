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
            buttons: []
        }
};

    export default (state = initStockListState, action) => {
        switch (action.type) {
                case event.GET_STOCK_LIST_REQUEST:
                        return {
                            ...state
                        };

                case event.GET_STOCK_LIST_FAIL:
                        return {
                            ...state
                        };
                case event.DELETE_STOCK_LIST_SUCCESS:
                        return {
                            ...state, alert: action.payload
                        };

                case event.DELETE_STOCK_LIST_FAIL:
                        return {
                            ...state, alert: action.payload
                        };

                case event.GET_STOCK_LIST_SUCCESS:
                        return {...state, page: action.payload};

                case event.SHOW_DIALOG:
                        return {... state, alert: action.payload};

                case event.CLOSE_DIALOG:
                        return {... state, alert: {...state.alert, isVisible: false}};
            default:
                return state;
        }
    }
