import * as event from "./constants";
import * as axios from "axios";

function getStockDataRequest() {
    return {
        type: event.GET_STOCK_REQUEST
    }
}

function getStockDataSuccess(json) {
    return {
        type: event.GET_STOCK_SUCCESS,
        data: json
    }
}

function getStockDataFail(dataError) {
    return {
        type: event.GET_STOCK_FAIL,
        data: dataError.data
    }
}

function getStock(stockName) {
    return function (dispatch) {
        dispatch(getStockDataRequest());
        return axios
            .get(`/stock/${stockName}`)
            .then(json =>
                dispatch(getStockDataSuccess(json.data))
            ).catch(error => {
                dispatch(getStockDataFail(error.response))
            });
    }
}

function addStockRequest() {
    return {
        type: event.ADD_STOCK_REQUEST
    }
}

function addStockSuccess(data) {
    return {
        type: event.ADD_STOCK_SUCCESS,
        data: data
    }
}

function addStockFail(error) {
    if (error.status == 400) {
        return {
            type: event.ADD_STOCK_FAIL,
            data: {
                name: !!error.data.name ? error.data.name : "",
                nameCompany: !!error.data.nameCompany ? error.data.nameCompany : "",
                country: !!error.data.country ? error.data.country : "",
                city: !!error.data.city ? error.data.city : "",
                street: !!error.data.street ? error.data.street : "",
                home: !!error.data.home ? error.data.home : "",
                room: !!error.data.room ? error.data.room : ""
            }
        }
    } else {
        return {
            type: event.ADD_STOCK_FAIL,
            data: ""
        }
    }
}

function addStock(stock) {
    return function (dispatch) {
        dispatch(addStockRequest());

        return axios
            .post(`/stock/`, stock)
            .then(json =>
                dispatch(addStockSuccess(json.data))
            ).catch(error => {
                dispatch(addStockFail(error.response))
            });
    }
}

function setInputErrorMessage(nameField, message) {
    return {
        type: event.SET_INPUT_ERROR_MESSAGE,
        data: {
            nameField,
            message
        }
    }
}

function setFieldData(nameField, value) {
    return {
        type: event.SET_FIELD,
        data: {
            nameField,
            value
        }
    }
}

function showAlertPopup(type, message) {
    return {
        type: event.SHOW_ALERT_POPUP,
        data: {
            type,
            message
        }
    }
}

function closeAlertPopup() {
    return {
        type: event.CLOSE_ALERT_POPUP
    }
}

function setDefaultValue() {
    return {
        type: event.SET_DEFAULT_VALUE
    }
}

export default {
    getStock,
    setFieldData,
    addStock,
    setInputErrorMessage,
    showAlertPopup,
    closeAlertPopup,
    setDefaultValue
};
