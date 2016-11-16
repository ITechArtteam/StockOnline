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
        type: event.GET_STOCK_LIST_FAIL,
        payload: error
    }
};

var getStockList = (pageNumber, itemsCountPerPage) => {
    return dispatch => {
        dispatch(getStockListRequest());
        return axios
            .get('/stockList/page/' + pageNumber + '/limit/' + itemsCountPerPage)
            .then(response => dispatch(getStockListSuccess(response.data)))
            .catch(error => dispatch(getStockListFail(error.response)))
    }
};

var showDialog = (text, buttons) =>  {
    return {
        type: event.SHOW_DIALOG,
        payload: {
            isVisible: true,
            text: text,
            buttons: buttons
        }
    }
};
var closeDialog = () => {
  return {
      type: event.CLOSE_DIALOG
  }
};

var deleteStocksRequest = () => {
    return {
       type: event.DELETE_STOCK_LIST_REQUEST
    }
};

var deleteStocksSuccess = () => {
    return {
        type: event.DELETE_STOCK_LIST_SUCCESS,
        payload: {
            isVisible: true,
            text: "Удаление успешно.",
            buttons: []
        }
    }
};

var deleteStockFail = () => {
    return {
        type: event.DELETE_STOCK_LIST_FAIL,
        payload: {
            isVisible: true,
            text: "Произошла ошибка при удалении.",
            buttons: []
        }
    }
};

var deleteStocks = stockNamesList => {
    return dispatch => {
        dispatch(deleteStocksRequest());
        axios.delete("/stockList/?namesToDelete=" + stockNamesList)
        .then(response =>  dispatch(deleteStocksSuccess()))
        .catch(error => dispatch(deleteStockFail()))
    }
};

export default {
    getStockList,
    deleteStocks,
    showDialog,
    closeDialog
}