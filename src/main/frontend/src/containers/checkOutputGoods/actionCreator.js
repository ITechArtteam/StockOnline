import * as event from './constants'
import * as axios from "axios";

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
        axios.get(`/waybills/${id}`)
            .then(response => {
                let message = `Накладная ${id} успешно найдена`;
                if(response.data.status !== status) {
                    message += `, но статус не соответствует запрашиваемому статусу ${status}`;
                }
                dispatch(showDialog(message, '', []));
                dispatch(findWaybillSuccess(response.data));
            })
            .catch(error => dispatch(showDialog(`Накладная не найдена. ${error}`, 'danger', [])));
    }
};

let acceptWaybillRequest= () => {
    return {
        type: event.ACCEPT_WAYBILL_REQUEST
    }
};

let acceptWaybill = id => {
    return dispatch => {
        dispatch(acceptWaybillRequest());
        axios.put(`/waybills/${id}`)
            .then(response => dispatch(showDialog(`Накладная ${id} успешно одобрена`)))
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
    acceptWaybill
}
