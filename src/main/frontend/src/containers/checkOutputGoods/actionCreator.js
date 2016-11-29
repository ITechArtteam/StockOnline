import * as event from './constants'
import * as axios from "axios";

var findWaybillRequest = () => {
    return {
        type: event.FIND_WAYBILL_BY_ID_REQUEST
    }
};

var findWaybillSuccess = json => {
    return {
        type: event.FIND_WAYBILL_BY_ID_SUCCESS,
        payload: json
    }
};

var findWaybillById = id => {
    return dispatch => {
        dispatch(findWaybillRequest());
        axios.get(`/waybills/${id}`)
            .then(response => dispatch(findWaybillSuccess(response.data)))
            .catch(error => dispatch(showDialog(`Накладная не найдена. ${error}`, 'danger', [])));
    }
};

var acceptWaybillRequest= () => {
    return {
        type: event.ACCEPT_WAYBILL_REQUEST
    }
};

var acceptWaybill = id => {
    return dispatch => {
        dispatch(acceptWaybillRequest());
        axios.put(`waybills/${id}`)
            .then(response => dispatch(showDialog(`Накладная ${id} успешно одобрена`)))
            .catch(error => dispatch(showDialog(`Прозошла ошибка при одобрении накладной. ${error}`, 'danger', [])));
    }
};


var showDialog = (text, type, buttons) => {
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

var closeDialog = () => {
    return {
        type: event.CLOSE_DIALOG
    }
};

var setInputValue = (inputId, value) => {
    return {
        type: event.SET_INPUT_VALUE,
        payload: {
            inputId: inputId,
            value: value
        }
    }

};

export default {
    findWaybillById,
    showDialog,
    closeDialog,
    setInputValue,
    acceptWaybill
}
