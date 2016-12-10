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
                country: !!error.data.country ? error.data.country : "",
                city: !!error.data.city ? error.data.city : "",
                street: !!error.data.street ? error.data.street : "",
                home: !!error.data.home ? error.data.home : ""

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

function changeRoomNumber(number) {
    return {
        type: event.EDIT_STOCK_FORM_ADD_ROOM_MODAL_FORM_CHANGE_NUMBER,
        number
    }
}

function changeRoomCost(cost) {
    return {
        type: event.EDIT_STOCK_FORM_ADD_ROOM_MODAL_FORM_CHANGE_COST,
        cost
    }
}

function changeRoomStorage(storage) {
    return {
        type: event.EDIT_STOCK_FORM_ADD_ROOM_MODAL_FORM_CHANGE_STORAGE,
        storage
    }
}

function selectRoom(number) {
    return {
        type: event.EDIT_STOCK_FORM_SELECT_ROOM,
        number
    }
}

function deleteRoom(number) {
    return {
        type: event.EDIT_STOCK_FORM_DELETE_ROOM,
        number
    }
}

function addRoom(room) {
    return {
        type: event.EDIT_STOCK_FORM_ADD_ROOM,
        room
    }
}

function hideAddRoomModalForm() {
    return {
        type: event.EDIT_STOCK_FORM_ADD_ROOM_MODAL_FORM_HIDE
    }
}

function clearAddRoomModalFormFields() {
    return {
        type: event.EDIT_STOCK_FORM_ADD_ROOM_MODAL_FORM_CLEAR_FIELDS
    }
}

function showAddRoomModalForm() {
    return {
        type: event.EDIT_STOCK_FORM_ADD_ROOM_MODAL_FORM_SHOW
    }
}

export default {
    showAddRoomModalForm,
    clearAddRoomModalFormFields,
    hideAddRoomModalForm,
    changeRoomNumber,
    changeRoomCost,
    changeRoomStorage,
    selectRoom,
    deleteRoom,
    addRoom,
    getStock,
    setFieldData,
    addStock,
    setInputErrorMessage,
    showAlertPopup,
    closeAlertPopup,
    setDefaultValue
};
