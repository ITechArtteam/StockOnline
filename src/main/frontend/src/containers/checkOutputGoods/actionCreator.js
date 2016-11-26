import * as event from './constants'
import * as axios from "axios";


let setWaybillVisibility = visibility => {
    return {
        type: event.SET_WAYBILL_VISIBILITY,
        payload: visibility
    }
};

let findWaybillRequest = () => {
    return {
        type: event.FIND_WAYBILL_BY_ID_REQUEST
    }
};

let findWaybillSuccess = json => {
    return {
        type: event.FIND_WAYBILL_BY_ID_SUCCESS,
        payload: json
    }
};

let findWaybillById = (id, status) => {
    return dispatch => {
        dispatch(findWaybillRequest());
        axios.get(`/controller/waybills/${id}`)
            .then(response => {
                let message = `Накладная №${id} успешно найдена`;
                if(response.data.status === status) {
                    dispatch(findWaybillSuccess(response.data));
                    dispatch(setWaybillVisibility(true));
                } else {
                    message += `, но ee статус "${response.data.status}" не соответствует запрашиваемому статусу "${status}"`;
                    dispatch(setWaybillVisibility(false));
                }
                dispatch(showDialog(message, '', []));
            })
            .catch(error => {
                dispatch(showDialog(`Накладная №${id}  не найдена. ${error}`, 'danger', []));
                dispatch(setWaybillVisibility(false));
            });
    }
};

let acceptWaybillRequest= () => {
    return {
        type: event.ACCEPT_WAYBILL_REQUEST
    }
};

let acceptWaybill = (id, waybillStatus, productStatus) => {
    return dispatch => {
        dispatch(acceptWaybillRequest());
        axios.put(`/controller/waybills/${id}`, {
                waybillStatus: waybillStatus,
                productStatus: productStatus
        })
            .then(response => {
                dispatch(showDialog(`Накладная №${id} успешно одобрена`));
                dispatch(setWaybillVisibility(false));
            })
            .catch(error => dispatch(showDialog(`Прозошла ошибка при одобрении накладной. ${error}`, 'danger', [])));
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
    findWaybillById,
    showDialog,
    closeDialog,
    setInputValue,
    acceptWaybill,
    setWaybillVisibility
}
