import * as event from "./constants";
import * as axios from "axios";
import {
    clearActReducer
} from "../../actions/act-actions";


let setWaybillVisibility = visibility => {
    return {
        type: event.SET_WAYBILL_VISIBILITY,
        payload: visibility
    }
};

let findWaybillRequest = () => {
    return {
        type: event.FIND_WAYBILL_BY_NUMBER_REQUEST
    }
};

let findWaybillSuccess = json => {
    return {
        type: event.FIND_WAYBILL_BY_NUMBER_SUCCESS,
        payload: json
    }
};

let findWaybillByNumber = (number, status) => {
    return dispatch => {
        dispatch(findWaybillRequest());
        axios.get(`/checkgoods/waybills/${number}`)
            .then(response => {
                console.log(response)
                let message = `Накладная №${number} успешно найдена`;
                if (response.data.status === status) {
                    dispatch(findWaybillSuccess(response.data));
                    dispatch(setWaybillVisibility(true));
                } else {
                    message += `, но ee статус "${response.data.status}" не соответствует запрашиваемому статусу "${status}"`;
                    dispatch(setWaybillVisibility(false));
                }
                dispatch(showDialog(message, '', []));
            })
            .catch(error => {
                dispatch(showDialog(`Накладная №${number}  не найдена.`, 'danger', []));
                dispatch(setWaybillVisibility(false));
            });
    }
};

let acceptWaybillRequest = () => {
    return {
        type: event.ACCEPT_WAYBILL_REQUEST
    }
};

let acceptWaybill = (number, waybillStatus, productStatus, senderRole, act) => {
    return dispatch => {
        dispatch(acceptWaybillRequest());
        axios.put(`/checkgoods/${senderRole}/waybills/${number}`, {
            acceptWaybillDto: {
                waybillStatus: waybillStatus,
                productStatus: productStatus
            },
            act: act
        })
            .then(response => {
                dispatch(showDialog(`Для накладной №${number} успешно установлен статус "${waybillStatus}"`));
                dispatch(setWaybillVisibility(false));
                dispatch(clearActReducer());
            })
            .catch(error => dispatch(showDialog(`Прозошла ошибка при установке статуса накладной.`, 'danger', [])));
    }
};


let showDialog = (text, type, buttons) => {
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

let setInputValue = (inputId, value) => {
    return {
        type: event.SET_INPUT_VALUE,
        payload: {
            inputId: inputId,
            value: value
        }
    }
};

export default {
    findWaybillByNumber,
    showDialog,
    closeDialog,
    setInputValue,
    acceptWaybill,
    setWaybillVisibility
}
