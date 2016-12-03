import * as event from './constants'
import * as $ from "jquery";

let setInputValue = (nameField, value) => {
    return {
        type: event.SET_INPUT_VALUE,
        payload: {
            inputId: nameField,
            value: value
        }
    }
};

let setWaybillVisibility = visibility => {
    return {
        type: event.SET_WAYBILL_VISIBILITY,
        payload: visibility
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
        $.ajax({
            type: 'GET',
            url: `/checkgoods/waybills/${id}`,
            success: response => {
                let message = `Накладная №${id} успешно найдена`;
                if(response.status === status) {
                    dispatch(findWaybillSuccess(response));
                    dispatch(setWaybillVisibility(true));
                } else {
                    message += `, но ee статус "${response.status}" не соответствует запрашиваемому статусу "${status}"`;
                    dispatch(setWaybillVisibility(false));
                }
                dispatch(showDialog(message, '', []));
            },
            error: error => {
                dispatch(showDialog(`Накладная №${id}  не найдена. ${error.statusText}`, 'danger', []));
                dispatch(setWaybillVisibility(false));
            }
        });
    }
};

export default {
    setInputValue,
    showDialog,
    closeDialog,
    findWaybillById,
    setWaybillVisibility
}
