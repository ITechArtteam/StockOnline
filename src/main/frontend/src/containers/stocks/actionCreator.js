import * as event from './constants'
import * as axios from "axios";

let setFilterMessageVisibility = visibility => {
    return {
        type: event.SET_FILTER_MESSAGE_VISIBILITY,
        payload: visibility
    }
};

let getStockListRequest = () => {
    return {
        type: event.GET_STOCK_LIST_REQUEST
    }
};

let getStockListSuccess = json => {
    return {
        type: event.GET_STOCK_LIST_SUCCESS,
        payload: json
    }
};

let getStockList = (pageNumber, itemsCountPerPage) => {
    return (dispatch, getState) => {
        dispatch(getStockListRequest());
        let name = getState().stockListReducer.frontend.filterStockNameValue;
        let address = getState().stockListReducer.frontend.filterAddressValue;

        let visibility = (name !== '' || address !== '');
        dispatch(setFilterMessageVisibility(visibility));
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
            .catch(error => dispatch(showDialog(`Произошла ошибка при получении списка складов.${error}`, 'danger', [])))
    }
};

let showDialog = (text, type, buttons) =>  {
    return {
        type: event.SHOW_DIALOG,
        payload: {
            isVisible: true,
            text: text,
            buttons: buttons,
            type: type
        }
    }
};
let closeDialog = () => {
  return {
      type: event.CLOSE_DIALOG
  }
};

let deleteStocksRequest = () => {
    return {
       type: event.DELETE_STOCK_LIST_REQUEST
    }
};

let deleteStocks = stockNamesList => {
    return (dispatch, getState) => {
        dispatch(deleteStocksRequest());
        axios.delete('/stockList/',
            {
                params: {
                    namesToDelete: stockNamesList.join()
                }
            })
            .then(response => {
            dispatch(showDialog(response.data, '', []));
        dispatch(
            getStockList(1, getState().stockListReducer.page.itemsCountPerPage));
    })
    .catch(error => dispatch(showDialog(`Произошла ошибка при удалении. ${error}`, 'danger', [])))
    }
};


let setFilterInputValue = (inputId, value) => {
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