import * as event from './constants'

    var initStockListState = {
        page: {
            activePage: 1,
            totalItemsCount: 0,
            itemsCountPerPage: 5,
            stockList: [],
        }
};

    export default (state = initStockListState, action) => {
        switch (action.type) {
                case event.GET_STOCK_LIST_REQUEST:
                        return state;
                case event.GET_STOCK_LIST_FAIL:
                        return state;
                case event.GET_STOCK_LIST_SUCCESS:
                        return {...state, page: action.payload};
            default:
                return state;
        }
    }
