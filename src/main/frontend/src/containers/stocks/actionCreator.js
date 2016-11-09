import * as event from './constants'
import * as axios from "axios";

var getStockListRequest = () => {
    return {
        type: event.GET_STOCK_LIST_REQUEST
    }
};

var getStockListSuccess = json => {
    return {
        type: event.GET_STOCK_LIST_SUCCESS,
        payload: json
    }
};

var getStockListFail = error => {
    return {
        type: event.GET_STOCK_LIST_ERROR,
        payload: error
    }
};

var getStockList = (pageNumber, recordsCount) => {
    return dispatch => {
        dispatch(getStockListRequest());
        return axios
                .get('/stockList/' + pageNumber + '/' + recordsCount)
                .then(response => dispatch(getStockListSuccess(response.data)))
    .catch(error => dispatch(getStockListFail(error.response)))
    }
};

export default {
    getStockList
}