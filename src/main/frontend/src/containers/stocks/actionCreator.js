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
        payload: {
            isVisible: true,
            text: `Произошла ошибка при получении списка складов.${error}`,
            buttons: [],
            type: 'danger'
        }
    }
};

var getStockList = (pageNumber, itemsCountPerPage) => {
    return (dispatch, getState) => {
        dispatch(getStockListRequest());
        var name = getState().stockListReducer.frontend.filterStockNameValue;
        var address = getState().stockListReducer.frontend.filterAddressValue;
        return axios
            .get(`/stockList/page/${pageNumber}/limit/${itemsCountPerPage}`,
                {
                    params: {
                        name: name,
                        address: address
                    }
                }
            )
            .then(response => dispatch(getStockListSuccess(response.data)))
            .catch(error => dispatch(getStockListFail(error)))
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
            buttons: [],
            type: 'danger'
        }
    }
};

var deleteStocks = stockNamesList => {
    return (dispatch, getState) => {
        dispatch(deleteStocksRequest());
        axios.delete(`/stockList/?namesToDelete=${stockNamesList}`)
        .then(response =>{
            dispatch(deleteStocksSuccess());
            dispatch(
                getStockList(1, getState().stockListReducer.page.itemsCountPerPage));
        })
        .catch(error => dispatch(deleteStockFail()))
}
};


var setFilterInputValue = (inputId, value) => {
    return {
        type: event.SET_FILTER_INPUT_VALUE,
        payload: {
            inputId: inputId,
            value: value
        }
    }

};

export default {
    getStockList,
    deleteStocks,
    showDialog,
    closeDialog,
    setFilterInputValue
}