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
                dispatch(getStockDataFail("error"))
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

function selectRoomUnit(unit) {
    return {
        type: event.EDIT_STOCK_FORM_ADD_ROOM_MODAL_FORM_SELECT_UNIT,
        unit
    }
}

function createAddRoomModalForm() {
    return {
        type: event.EDIT_STOCK_FORM_STOCK_ROOMS_CREATE_ADD_ROOM_MODAL_FORM
    }
}

function addShelf(shelf) {
    return {
        type: event.EDIT_STOCK_FORM_ADD_SHELF,
        shelf
    }
}

function hideAddShelfModalForm() {
    return {
        type: event.EDIT_STOCK_FORM_ADD_SHELF_MODAL_FORM_HIDE
    }
}

function clearAddShelfModalFormFields() {
    return {
        type: event.EDIT_STOCK_FORM_ADD_SHELF_MODAL_FORM_CLEAR_FIELDS
    }
}

function changeShelfNumber(number) {
    return {
        type: event.EDIT_STOCK_FORM_ADD_SHELF_MODAL_FORM_CHANGE_NUMBER,
        number
    }
}

function changeShelfCapacity(capacity) {
    return {
        type: event.EDIT_STOCK_FORM_ADD_SHELF_MODAL_FORM_CHANGE_CAPACITY,
        capacity
    }
}

function selectShelfUnit(unit) {
    return {
        type: event.EDIT_STOCK_FORM_ADD_SHELF_MODAL_FORM_SELECT_UNIT,
        unit
    }
}

function selectShelf(number) {
    return {
        type: event.EDIT_STOCK_FORM_SELECT_SHELF,
        number
    }
}

function deleteShelf(number) {
    return {
        type: event.EDIT_STOCK_FORM_DELETE_SHELF,
        number
    }
}

function showAddShelfModalForm() {
    return {
        type: event.EDIT_STOCK_FORM_ADD_SHELF_MODAL_FORM_SHOW
    }
}

function setRoomsError(error) {
    return {
        type: event.EDIT_STOCK_FORM_SET_ROOMS_ERROR,
        error
    }
}


function setRoomCostError(error) {
    return {
        type: event.EDIT_STOCK_FORM_ADD_ROOM_MODAL_FORM_SET_COST_ERROR,
        error
    }
}

function setRoomNumberError(error) {
    return {
        type: event.EDIT_STOCK_FORM_ADD_ROOM_MODAL_FORM_SET_NUMBER_ERROR,
        error
    }
}

function setRoomStorageError(error) {
    return {
        type: event.EDIT_STOCK_FORM_ADD_ROOM_MODAL_FORM_SET_STORAGE_ERROR,
        error
    }
}

function setShelfsError(error) {
    return {
        type: event.EDIT_STOCK_FORM_SET_SHELFS_ERROR,
        error
    }
}


function setShelfCapacityError(error) {
    return {
        type: event.EDIT_STOCK_FORM_ADD_SHELF_MODAL_FORM_SET_CAPACITY_ERROR,
        error
    }
}

function setShelfNumberError(error) {
    return {
        type: event.EDIT_STOCK_FORM_ADD_SHELF_MODAL_FORM_SET_NUMBER_ERROR,
        error
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
    setDefaultValue,
    selectRoomUnit,
    createAddRoomModalForm,
    addShelf,
    hideAddShelfModalForm,
    clearAddShelfModalFormFields,
    changeShelfNumber,
    changeShelfCapacity,
    selectShelfUnit,
    selectShelf,
    deleteShelf,
    showAddShelfModalForm,
    setRoomsError,
    setRoomCostError,
    setRoomNumberError,
    setRoomStorageError,
    setShelfsError,
    setShelfCapacityError,
    setShelfNumberError
};
