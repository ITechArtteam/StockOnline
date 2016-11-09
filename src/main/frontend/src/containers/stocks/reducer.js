import * as event from './constants'

    var initClientListState = {
        stockList: [{name: '1'}, {name: '2'}, {name: '3'}, {name: '4'}, {name: '5'}, {name: '6'}],
        frontend: {
            pageNumber: 1,
                recordsCount: 5
        }
};

    export default (state = initClientListState, action) => {
        switch (action.type) {
                case event.GET_STOCK_LIST_REQUEST:
                        return state;
                    case event.GET_STOCK_LIST_FAIL:
                        return state;
                    case event.GET_STOCK_LIST_SUCCESS:
                        return {...state, stockList: action.payload};
            default:
                return state;
        }
    }
